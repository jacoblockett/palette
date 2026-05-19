# <p align="center">Palette</p>

_<p align="center">A five-role, seedable color palette generator for light and dark UI themes.</p>_

## Installation

```bash
pnpm i palette
```

## Basic Usage

```js
import palette from "palette"
// const palette = require("palette")

const theme = palette()
```

Generates both a light and dark palette of colors:

```js
{
	light: {
		text: "#1f1020",
		background: "#fbf3fa",
		primary: "#7b2f61",
		secondary: "#9b5a43",
		accent: "#9c661d"
	},
	dark: {
		text: "#f5e2f0",
		background: "#10070f",
		primary: "#d993c4",
		secondary: "#c18471",
		accent: "#dfae63"
	}
}
```

## Seeds

You can provide any number of seed colors. Provided seeds are treated like locked source colors, and Palette fills in the rest. When providing seeds, you must also provide a color mode.

```js
const theme = palette({
	mode: "light", // or "dark"
	seeds: {
		primary: "#3b82f6",
		accent: "f59e0b" // Seed values can be written with or without `#`.
	}
})
```

## WCAG

You can reject generated palettes that fail minimum contrast/accessibilty checks.

```js
const theme = palette({ wcag: true })
```

## Shades

Generate shade scales for each role.

```js
const theme = palette({ shades: true })

console.log(theme.light.shades.primary)
/*
{
	10: "#...",
	...
	100: "#...",
	...
	200: "#..."
}
*/
```

Shades are generated with the source color set to `100` and scales from `10` to `200` on every tenth percent.

## Schemes

Use `scheme` to influence the relationship between `primary`, `secondary`, and `accent`.

```js
const theme = palette({ scheme: "triadic" })
```

Supported schemes (more may be added by request):

```js
"random"
"monochromatic"
"analogous"
"complementary"
"split-complementary"
"triadic"
"compound"
"double-split-complementary"
"neutral-complementary"
"accented-neutral"
"achromatic"
"warm"
"cool"
"muted"
"earth"
"pastel"
"neon"
"jewel"
"brand-status"
"enterprise"
"luxury"
```

## License

This project uses the MIT license. Have fun.
