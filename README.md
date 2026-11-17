# Solstormen

An interactive Norwegian thriller that runs in the browser. A category X99 solar storm is 24 hours from impact. Every choice changes your stats, your inventory and which way the story branches. There are five endings, and one of them is secret.

## Play it

Open `index.html` in a browser. Nothing needs to be installed or built. To share it, upload the whole folder to any static host (GitHub Pages, Netlify and so on).

Progress, settings and the endings you've found are saved in the player's own browser.

## Files

| File | What it holds |
|---|---|
| `index.html` | The page layout: start screen, intro, game screen |
| `css/style.css` | All styling. The **LOOK & FEEL v2** section at the end holds the current design |
| `js/settings.js` | Sound and calm-effects settings, saving to the browser |
| `js/audio.js` | All sound. Generated live in code, so there are no audio files |
| `js/visuals.js` | Background animations (solar corona, particles, static) and the custom cursor |
| `js/game.js` | Game state, countdown, stats, items, route tracker |
| `js/effects.js` | Screen effects (flashes, glitches, shakes), typewriter text, the scene photo block |
| `js/photos.js` | Every scene photo: file, description and credit |
| `js/story.js` | **The story.** Every scene with its text, stats, items and choices |
| `js/engine.js` | Showing scenes, handling choices, saving and loading |
| `js/intro.js` | Start screen, cinematic intro, boot sequence, photo credits list |
| `img/scenes/` | The scene photos |

The script files must load in the order listed in `index.html`.

## Writing a new scene

Add an entry to `STORY` in `js/story.js`:

```js
min_scene:{
  shortName:'KORT NAVN',          // shown in the route tracker
  img:'min_scene',                // a key in js/photos.js
  time:'12:00:00',rad:3,          // time left on the countdown, radiation gained
  title:'OVERSKRIFT',
  text:`<p>Historien…</p><em>Sitat eller melding.</em>`,
  stats:{mot:{d:+10,label:'MOT'}},
  items:['radiokode'],
  choices:[
    {text:'Et valg.',target:'en_annen_scene'},
    {text:'Krever et item.',target:'noe',requires:{item:'minnepenn'}},
    {text:'Krever stats.',target:'noe',requires:{statMin:{kunnskap:40}}},
  ]
},
```

Then make at least one other scene's choice point to it. A scene with `ending:'good'` and no choices is an ending.

## Photos

The scene photos come from Wikimedia Commons and Flickr under Creative Commons or public-domain licenses. They're credited on each scene and in the **FOTOKREDITTER** list on the start screen. If you swap a photo, update its credit in `js/photos.js`.
