# FLéX GitHub Pages hosted build

Upload the contents of this folder to the root of your GitHub repository.

This build includes the v3 hosted static data exporter. The exporter is designed to avoid writing the large generated encounter and ability caches to localStorage while building the downloadable JSON pack, preventing Chrome quota errors.

## Upload layout

Repo root should contain:

- index.html
- manifest.json
- service-worker.js
- assets/
- data/

## Static data export workflow

1. Upload this build.
2. Open the GitHub Pages site.
3. Go to Settings.
4. Use **Build/download hosted static data JSON**.
5. Wait for the generated ZIP download.
6. Extract that ZIP.
7. Upload the contents of its `data/` folder into your repo's `/data` folder, replacing the placeholder files.
8. Reload the site.

After that, the hosted app should load static JSON from the repo instead of rebuilding via many PokéAPI calls.
