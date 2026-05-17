
(function(){
  "use strict";
  if(window.__FLEX_PREBUILT_POKEAPI_PATCH__) return;
  window.__FLEX_PREBUILT_POKEAPI_PATCH__ = true;

  var previousFetch = window.fetch ? window.fetch.bind(window) : null;
  var DATA_BASE = "./data/";
  var DATA_BUNDLE = DATA_BASE + "flex-prebuilt-data-gen3.json";
  var DATA_SPLIT = {
    pokemon: DATA_BASE + "flex-pokemon-gen3.json",
    species: DATA_BASE + "flex-species-gen3.json",
    moves: DATA_BASE + "flex-moves-gen3.json",
    abilities: DATA_BASE + "flex-abilities-gen3.json",
    encounters: DATA_BASE + "flex-encounters-gen3.json"
  };

  var prebuiltPromise = null;
  var prebuiltUnavailable = false;

  function status(msg){
    try{
      var el = document.getElementById("pokedexBootStatus");
      if(el && msg) el.textContent = msg;
    }catch(e){}
  }

  function jsonResponse(obj){
    return new Response(JSON.stringify(obj), {
      status: 200,
      headers: {"Content-Type": "application/json", "X-FLEX-Prebuilt": "1"}
    });
  }

  function idFromUrl(url){
    var m = String(url || "").match(/\/(\d+)\/?$/);
    return m ? parseInt(m[1], 10) : null;
  }

  function apiUrl(kind, idOrName){
    return "https://pokeapi.co/api/v2/" + kind + "/" + idOrName + "/";
  }

  function cleanKey(v){
    return String(v == null ? "" : v).toLowerCase().trim();
  }

  function makeIndexes(data){
    if(data.__indexed) return data;
    function byIdAndName(arr){
      var byId = {}, byName = {};
      (arr || []).forEach(function(x){
        if(!x) return;
        if(x.id != null) byId[String(x.id)] = x;
        if(x.name) byName[cleanKey(x.name)] = x;
        if(x.display) byName[cleanKey(x.display)] = x;
      });
      return {byId: byId, byName: byName};
    }
    data.__pokemonIndex = byIdAndName(data.pokemon || []);
    data.__speciesIndex = byIdAndName(data.species || []);
    data.__moveIndex = byIdAndName(data.moves || []);
    data.__abilityIndex = byIdAndName(data.abilities || []);
    data.__encounterById = {};
    (data.encounters || []).forEach(function(e){ if(e && e.id != null) data.__encounterById[String(e.id)] = e; });
    data.__indexed = true;
    return data;
  }

  async function fetchJsonLocal(url){
    if(!previousFetch) throw new Error("fetch unavailable");
    var res = await previousFetch(url, {cache:"force-cache", headers:{"accept":"application/json"}});
    if(!res.ok) throw new Error("Missing " + url + " HTTP " + res.status);
    return res.json();
  }

  async function loadPrebuiltData(){
    if(prebuiltUnavailable) return null;
    if(prebuiltPromise) return prebuiltPromise;
    prebuiltPromise = (async function(){
      try{
        status("Loading prebuilt FLéX data…");
        var bundle = await fetchJsonLocal(DATA_BUNDLE);
        if(bundle && bundle.pokemon && bundle.moves){
          window.FLEX_PREBUILT_DATA = makeIndexes(bundle);
          status("Using prebuilt FLéX data…");
          return window.FLEX_PREBUILT_DATA;
        }
        throw new Error("Bundle had unexpected shape");
      }catch(bundleErr){
        try{
          status("Loading split FLéX data…");
          var parts = await Promise.all([
            fetchJsonLocal(DATA_SPLIT.pokemon),
            fetchJsonLocal(DATA_SPLIT.species),
            fetchJsonLocal(DATA_SPLIT.moves),
            fetchJsonLocal(DATA_SPLIT.abilities),
            fetchJsonLocal(DATA_SPLIT.encounters)
          ]);
          var data = {
            meta: (parts[0] && parts[0].meta) || {},
            pokemon: (parts[0] && parts[0].pokemon) || [],
            species: (parts[1] && parts[1].species) || [],
            moves: (parts[2] && parts[2].moves) || [],
            abilities: (parts[3] && parts[3].abilities) || [],
            encounters: (parts[4] && parts[4].encounters) || []
          };
          window.FLEX_PREBUILT_DATA = makeIndexes(data);
          status("Using prebuilt FLéX data…");
          return window.FLEX_PREBUILT_DATA;
        }catch(splitErr){
          console.warn("FLéX prebuilt data unavailable; falling back to PokéAPI.", bundleErr, splitErr);
          prebuiltUnavailable = true;
          status("Prebuilt data missing; falling back to PokéAPI…");
          return null;
        }
      }
    })();
    return prebuiltPromise;
  }

  function refObj(kind, x){
    if(!x) return null;
    if(typeof x === "string") return {name:x, url:apiUrl(kind, x)};
    var name = x.name || "";
    var id = x.id || idFromUrl(x.url);
    return {name:name, url:x.url || apiUrl(kind, id || name)};
  }

  function rawPokemon(p){
    return {
      id: p.id,
      name: p.name,
      height: p.height,
      weight: p.weight,
      base_experience: p.base_experience,
      species: refObj("pokemon-species", p.species || {name:p.name, id:p.id}),
      sprites: {
        front_default: p.sprites && p.sprites.front_default || "",
        front_shiny: p.sprites && p.sprites.front_shiny || "",
        other: {"official-artwork": {front_default: p.sprites && p.sprites.official_artwork || ""}}
      },
      types: (p.types || []).map(function(t){return {slot:t.slot, type:{name:t.name, url:apiUrl("type", t.name)}};}),
      abilities: (p.abilities || []).map(function(a){return {slot:a.slot, is_hidden:!!a.is_hidden, ability:{name:a.name, url:a.url || apiUrl("ability", a.id || a.name)}};}),
      stats: Object.keys(p.stats || {}).map(function(k){return {base_stat:p.stats[k], effort:0, stat:{name:k, url:apiUrl("stat", k)}};}),
      moves: (p.moves || []).map(function(m){return {
        move:{name:m.name, url:apiUrl("move", m.id || m.name)},
        version_group_details:(m.version_group_details || []).map(function(v){return {
          level_learned_at:v.level_learned_at || 0,
          move_learn_method:{name:v.move_learn_method || "", url:apiUrl("move-learn-method", v.move_learn_method || "")},
          version_group:{name:v.version_group || "", url:apiUrl("version-group", v.version_group || "")}
        };})
      };})
    };
  }

  function rawSpecies(s){
    return {
      id:s.id,
      name:s.name,
      order:s.order,
      gender_rate:s.gender_rate,
      capture_rate:s.capture_rate,
      base_happiness:s.base_happiness,
      is_baby:!!s.is_baby,
      is_legendary:!!s.is_legendary,
      is_mythical:!!s.is_mythical,
      hatch_counter:s.hatch_counter,
      color:s.color ? {name:s.color, url:apiUrl("pokemon-color", s.color)} : null,
      shape:s.shape ? {name:s.shape, url:apiUrl("pokemon-shape", s.shape)} : null,
      habitat:s.habitat ? {name:s.habitat, url:apiUrl("pokemon-habitat", s.habitat)} : null,
      generation:s.generation ? {name:s.generation, url:apiUrl("generation", s.generation)} : null,
      growth_rate:s.growth_rate ? {name:s.growth_rate, url:apiUrl("growth-rate", s.growth_rate)} : null,
      egg_groups:(s.egg_groups || []).map(function(e){return {name:e, url:apiUrl("egg-group", e)};}),
      evolves_from_species:s.evolves_from_species ? refObj("pokemon-species", s.evolves_from_species) : null,
      evolution_chain:s.evolution_chain ? {url:s.evolution_chain.url || apiUrl("evolution-chain", s.evolution_chain.id)} : null,
      varieties:(s.varieties || []).map(function(v){return {is_default:!!v.is_default, pokemon:refObj("pokemon", v.pokemon)};}),
      names:[{name:s.display || s.name, language:{name:"en", url:apiUrl("language", "en")}}],
      genera:[{genus:s.genus || "", language:{name:"en", url:apiUrl("language", "en")}}],
      flavor_text_entries:[{flavor_text:s.flavor_text || "", language:{name:"en", url:apiUrl("language", "en")}, version:{name:"firered", url:apiUrl("version", "firered")}}]
    };
  }

  function rawMove(m){
    return {
      id:m.id,
      name:m.name,
      accuracy:m.accuracy,
      effect_chance:m.effect_chance,
      pp:m.pp,
      priority:m.priority,
      power:m.power,
      damage_class:m.damage_class ? {name:m.damage_class, url:apiUrl("move-damage-class", m.damage_class)} : null,
      type:m.type ? {name:m.type, url:apiUrl("type", m.type)} : null,
      generation:m.generation ? {name:m.generation, url:apiUrl("generation", m.generation)} : null,
      target:m.target ? {name:m.target, url:apiUrl("move-target", m.target)} : null,
      meta:{
        ailment:m.ailment ? {name:m.ailment, url:apiUrl("move-ailment", m.ailment)} : {name:"none", url:""},
        category:m.category ? {name:m.category, url:apiUrl("move-category", m.category)} : {name:"damage", url:""},
        min_hits:m.min_hits, max_hits:m.max_hits, min_turns:m.min_turns, max_turns:m.max_turns,
        drain:m.drain, healing:m.healing, crit_rate:m.crit_rate,
        ailment_chance:m.ailment_chance, flinch_chance:m.flinch_chance, stat_chance:m.stat_chance
      },
      effect_entries:[{effect:m.effect || "", short_effect:m.effect || "", language:{name:"en", url:apiUrl("language", "en")}}],
      flavor_text_entries:[{flavor_text:m.flavor_text || "", language:{name:"en", url:apiUrl("language", "en")}, version_group:{name:"firered-leafgreen", url:apiUrl("version-group", "firered-leafgreen")}}],
      names:[{name:m.display || m.name, language:{name:"en", url:apiUrl("language", "en")}}],
      machines:(m.machines || []).map(function(x){return {machine:x.machine || null, version_group:{name:x.version_group || "", url:apiUrl("version-group", x.version_group || "")}};})
    };
  }

  function rawAbility(a){
    return {
      id:a.id,
      name:a.name,
      generation:a.generation ? {name:a.generation, url:apiUrl("generation", a.generation)} : null,
      names:[{name:a.display || a.name, language:{name:"en", url:apiUrl("language", "en")}}],
      effect_entries:[{effect:a.effect || "", short_effect:a.effect || "", language:{name:"en", url:apiUrl("language", "en")}}],
      flavor_text_entries:[{flavor_text:a.flavor_text || "", language:{name:"en", url:apiUrl("language", "en")}, version_group:{name:"firered-leafgreen", url:apiUrl("version-group", "firered-leafgreen")}}],
      pokemon:(a.pokemon || []).map(function(p){return {is_hidden:!!p.is_hidden, slot:p.slot, pokemon:{name:p.name, url:apiUrl("pokemon", p.id || p.name)}};})
    };
  }

  function findResource(data, kind, key){
    var idx = data["__" + kind + "Index"];
    if(!idx) return null;
    key = String(key || "").replace(/^\//, "").replace(/\/$/, "");
    if(/^\d+$/.test(key)) return idx.byId[key] || null;
    return idx.byName[cleanKey(key)] || null;
  }

  function parsePokeApiUrl(input){
    var raw = (typeof input === "string") ? input : (input && input.url) || "";
    var url;
    try{ url = new URL(raw, location.href); }catch(e){ return null; }
    if(url.hostname !== "pokeapi.co") return null;
    var path = url.pathname.replace(/^\/api\/v2\//, "").replace(/^\//, "");
    if(path === "move" || path === "move/") return {kind:"move-list", key:""};
    var parts = path.split("/").filter(Boolean);
    if(parts[0] === "pokemon" && parts[2] === "encounters") return {kind:"encounters", key:parts[1]};
    if(["pokemon", "pokemon-species", "move", "ability"].indexOf(parts[0]) !== -1 && parts[1]) return {kind:parts[0], key:decodeURIComponent(parts[1])};
    return null;
  }

  async function prebuiltFetch(input, init){
    var parsed = parsePokeApiUrl(input);
    if(!parsed || !previousFetch) return previousFetch(input, init);
    var data = await loadPrebuiltData();
    if(!data) return previousFetch(input, init);
    try{
      if(parsed.kind === "move-list"){
        return jsonResponse({count:(data.moves || []).length, next:null, previous:null, results:(data.moves || []).map(function(m){return {name:m.name, url:apiUrl("move", m.id || m.name)};})});
      }
      if(parsed.kind === "pokemon"){
        var p = findResource(data, "pokemon", parsed.key);
        if(p) return jsonResponse(rawPokemon(p));
      }
      if(parsed.kind === "pokemon-species"){
        var s = findResource(data, "species", parsed.key);
        if(s) return jsonResponse(rawSpecies(s));
      }
      if(parsed.kind === "move"){
        var m = findResource(data, "move", parsed.key);
        if(m) return jsonResponse(rawMove(m));
      }
      if(parsed.kind === "ability"){
        var a = findResource(data, "ability", parsed.key);
        if(a) return jsonResponse(rawAbility(a));
      }
      if(parsed.kind === "encounters"){
        var p2 = findResource(data, "pokemon", parsed.key);
        var id = p2 ? p2.id : parsed.key;
        var e = data.__encounterById[String(id)];
        return jsonResponse(e ? (e.encounters || []) : []);
      }
    }catch(err){
      console.warn("FLéX prebuilt response failed; falling back to live request.", parsed, err);
    }
    return previousFetch(input, init);
  }

  prebuiltFetch.__flexPrebuiltPatch = true;
  window.fetch = prebuiltFetch;
  window.loadFlexPrebuiltData = loadPrebuiltData;
})();
