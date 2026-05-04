# FLéX GitHub Pages Hosted Build

Upload the **contents** of this folder to the root of your GitHub repository.

Required structure:

```text
index.html
manifest.json
service-worker.js
assets/
  icons/
    flex_icon_192.png
    flex_icon_512.png
  maps/
    kanto_map.jpg
    sevii_123_map.jpg
    sevii_45_map.jpg
    sevii_67_map.jpg
```

What changed from the local single-file build:

- Town map images are external files instead of base64 inside `index.html`.
- Home-screen icon is external PNG instead of base64 inside `index.html`.
- Manifest is now `manifest.json`.
- A lightweight service worker caches the core app shell and image assets after first load.

After upload:

1. Commit all files.
2. Go to **Settings → Pages**.
3. Use **Deploy from branch → main → / root**.
4. Open `https://arrayofsunshine.github.io/YOUR_REPO_NAME/`.
5. On Android Chrome, remove any old home-screen shortcut, then add the site again.

Note: the first load can still take a while while FLéX builds its browser cache and IndexedDB data. Later loads should be faster.


## Static data export for faster GitHub Pages loading

After uploading this build, open the hosted app, go to **Settings → Hosted static data export**, and click **Build/download hosted static data JSON**. Upload the generated `data/` JSON files into this repo's `/data` folder. This lets the hosted app load static repo JSON instead of rebuilding from PokéAPI.
