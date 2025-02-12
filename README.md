# reference architecture - cloudflare workers, htmx, hono, picocss

Goblinfactory reference architecture using [Cloudflare workers](https://developers.cloudflare.com/workers/), [Hono](https://hono.dev/), [Htmx](https://htmx.org/) and [PicoCSS](https://picocss.com/).

- Live demo : https://htmx-ra.alanhemmings.com/
- github repo:  https://github.com/goblinfactory-pvt/ra-htmx-hono-picocss-2024

## How to use this project

```bash
Git clone `https://github.com/goblinfactory/ra-htmx-hono-picocss-2024.git`
npm install
npm run dev
```

After running the above, you should see Cloudflare wrangler message below;
```
╭──────────────────────────────────────────────────────────────────────────────────────────────────╮
│  [b] open a browser, [d] open devtools, [l] turn off local mode, [c] clear console, [x] to exit  │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
```

Press `b`, to open browser and test the app. Make code changes, and just hit refresh in the browser. 

## Random notes

To get htmx intellisense working in vscode, incude the following `global.d.ts` file in root. Same folder as `tsconfig.json`

```js
import 'typed-htmx'

declare module '@hono/jsx' {
    namespace JSX {
        interface HTMLAttributes extends HtmxAttributes { }
    }
}
```

## Htmx best practices when working entirely server side

1. Avoid `prop drilling` antipattern and embrace `hono middleware` to add shared context, e.g. routing information.

**example**

```ts
import { Hono } from 'hono';

const app = new Hono();

app.use('*', (c, next) => {
  c.set('currentRoute', c.req.url); // Attach current route to context
  return next();
});

app.get('/example', (c) => {
  const currentRoute = c.get('currentRoute');
  return c.text(`Current Route: ${currentRoute}`);
});
```

## to get better path params use

```ts
htmx.defineExtension('path-params', {
  onEvent: function(name, evt) {
    if (name === 'htmx:configRequest') {
      evt.detail.path = evt.detail.path.replace(/{([^}]+)}/g, function(_, param) {
        var val = evt.detail.parameters[param]
        delete evt.detail.parameters[param]
        return val === undefined ? '{' + param + '}' : encodeURIComponent(val)
      })
    }
  }
})
```

## other changes needed

1. Added path aliasing to avoid error and to support zod and hono and getcookie and setCookie.
```log
Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './pages/Comments.js'?ts(2835)
```

## useful references

Learn api JWT authentication:  https://www.youtube.com/watch?v=doZ6Y0oub_8