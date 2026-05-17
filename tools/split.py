from pathlib import Path
import re,base64,json
# no-op update to trigger split-assets workflow
root=Path(__file__).resolve().parents[1]
idx=root/'index.html'; html=idx.read_text(encoding='utf-8')
if './assets/js/' in html:
 print('already split'); raise SystemExit
cssd=root/'assets/css'; jsd=root/'assets/js'; imgd=root/'assets/images/milestones'
cssd.mkdir(parents=True,exist_ok=True); jsd.mkdir(parents=True,exist_ok=True); imgd.mkdir(parents=True,exist_ok=True)
css_names=['main.css','overrides.css','layout.css','locations.css','pwa.css','town-map.css']
js_names=['01-boot.js','02-prebuilt-data.js','03-card-data.js','04-app-main.js','05-team-save-stability.js','06-team-save-legacy.js','07-team-save-legacy-2.js','08-storage-quota.js','09-storage-mirror.js','10-sav-core.js','11-sav-worker.js','12-my-mons-sync.js','13-gen3-move-names.js','14-move-index-progress.js','15-move-cache-v2.js','16-move-cache-v3.js','17-move-cache-v4.js','18-move-list-adapter.js','19-move-bridge.js','20-move-cache-consumer.js','21-move-learners-filter.js','22-region-move-acquisition.js','23-move-list-renderer.js','24-dex-count-summary.js','25-move-filter-top-button.js','26-pokedex-animation.js','27-animation-addendums.js','28-sav-folder-sync.js','29-mymons-indexeddb.js','30-folder-permission-gate.js','31-townmap-verified.js','32-townmap-alignment.js','33-sw-registration.js','34-hosted-json-repair.js','35-townmap-panel.js','36-reset-import-export.js','37-townmap-inline.js']
ext={'image/png':'png','image/jpeg':'jpg','image/jpg':'jpg','image/webp':'webp','image/gif':'gif','image/svg+xml':'svg'}
assets=[]; repl=[]; nimg=0
def write(p,s): p.parent.mkdir(parents=True,exist_ok=True); p.write_text(s.rstrip()+'\n',encoding='utf-8')
def imgname(css,pos,mime,n):
 pre=css[max(0,pos-700):pos]; m=re.search(r'\.([\w-]*progressBg[\w-]*)',pre) or re.search(r'\.([\w-]+)\s*\{[^{}]*$',pre)
 name=(m.group(1) if m else 'milestone'); name=re.sub(r'([a-z0-9])([A-Z])',r'\1-\2',name).lower(); name=re.sub(r'[^a-z0-9-]+','-',name).strip('-') or 'milestone'
 return f'{n:02d}-{name}.{ext.get(mime,"bin")}'
def external_images(css):
 global nimg
 def r(m):
  global nimg
  nimg+=1; name=imgname(css,m.start(),m.group(1),nimg); (imgd/name).write_bytes(base64.b64decode(m.group(2))); return f'url("../images/milestones/{name}")'
 return re.sub(r'url\(["\']?data:(image/[^;]+);base64,([^"\')]+)["\']?\)',r,css)
styles=list(re.finditer(r'<style\b[^>]*>(.*?)</style>',html,re.I|re.S))
scripts=list(re.finditer(r'<script\b([^>]*)>(.*?)</script>',html,re.I|re.S))
for i,m in enumerate(styles):
 name=css_names[i] if i<len(css_names) else f'style-{i+1:02d}.css'; write(cssd/name,external_images(m.group(1))); assets.append(f'assets/css/{name}'); repl.append((m.start(),m.end(),f'<link rel="stylesheet" href="./assets/css/{name}">'))
for i,m in enumerate(scripts):
 name=js_names[i] if i<len(js_names) else f'{i+1:02d}-script.js'; write(jsd/name,m.group(2)); assets.append(f'assets/js/{name}'); attrs=(' '+m.group(1).strip()) if m.group(1).strip() else ''; repl.append((m.start(),m.end(),f'<script{attrs} src="./assets/js/{name}"></script>'))
for a,b,s in sorted(repl,reverse=True): html=html[:a]+s+html[b:]
write(idx,html)
for p in sorted(imgd.glob('*')): assets.append(str(p.relative_to(root)).replace('\\','/'))
core=['./','./index.html','./manifest.json']+['./'+x for x in assets]
for p in ['assets/icons/flex_icon_192.png','assets/icons/flex_icon_512.png','assets/maps/kanto_map.jpg','assets/maps/sevii_123_map.jpg','assets/maps/sevii_45_map.jpg','assets/maps/sevii_67_map.jpg']:
 if (root/p).exists(): core.append('./'+p)
write(root/'service-worker.js',"const FLEX_CACHE='flex-split-assets-v2';\nconst CORE_ASSETS="+json.dumps(list(dict.fromkeys(core)))+";\nself.addEventListener('install',e=>e.waitUntil(caches.open(FLEX_CACHE).then(c=>c.addAll(CORE_ASSETS)).then(()=>self.skipWaiting())));\nself.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==FLEX_CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));\nself.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;if(u.pathname.includes('/data/')){e.respondWith(fetch(r,{cache:'no-cache'}).then(s=>{const c=s.clone();caches.open(FLEX_CACHE).then(x=>x.put(r,c));return s}).catch(()=>caches.match(r)));return}if(r.mode==='navigate'){e.respondWith(fetch(r).then(s=>{const c=s.clone();caches.open(FLEX_CACHE).then(x=>x.put('./index.html',c));return s}).catch(()=>caches.match('./index.html')));return}e.respondWith(caches.match(r).then(c=>c||fetch(r).then(s=>{const x=s.clone();caches.open(FLEX_CACHE).then(y=>y.put(r,x));return s}))) });\n")
write(root/'README_RESTRUCTURE.md',"# FLeX split-assets restructure\n\nGenerated from the monolithic index.html. CSS is in assets/css, JavaScript is in assets/js, milestone background images are real files in assets/images/milestones, and JSON remains in data. This first pass preserves script order and keeps legacy repair layers intact for behaviour parity.")
print(f'split {len(styles)} style blocks, {len(scripts)} script blocks, {nimg} embedded images')
