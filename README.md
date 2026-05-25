# <p align="center">Palette</p>

_<p align="center">A five-role, seedable color palette generator for light and dark UI themes.</p>_

## Playground

Visit the interactive demo site [here](https://jacoblockett.github.io/palette/).

## Installation

```bash
pnpm i palette
```

## Basic Usage

```js
import palette from "@jacoblockett/palette"
// const palette = require("@jacoblockett/palette")

const theme = palette()
```

Palette will generate a random color palette and an associated inverse color mode, along with a selection of their shades. Shades are generated with the source color set to `100` and scales from `10` to `200` on every tenth percent.

```js
{
	light: {
		text: "#1f1020",
		background: "#fbf3fa",
		primary: "#7b2f61",
		secondary: "#9b5a43",
		accent: "#9c661d",
		shades: {
			text: { 10: "#...", 100: "#1f1020", 200: "#..." },
			background: { 10: "#...", 100: "#fbf3fa", 200: "#..." },
			primary: { 10: "#...", 100: "#7b2f61", 200: "#..." },
			secondary: { 10: "#...", 100: "#9b5a43", 200: "#..." },
			accent: { 10: "#...", 100: "#9c661d", 200: "#..." }
		}
	},
	dark: {
		text: "#f5e2f0",
		background: "#10070f",
		primary: "#d993c4",
		secondary: "#c18471",
		accent: "#dfae63",
		shades: {
			text: { 10: "#...", 100: "#f5e2f0", 200: "#..." },
			background: { 10: "#...", 100: "#10070f", 200: "#..." },
			primary: { 10: "#...", 100: "#d993c4", 200: "#..." },
			secondary: { 10: "#...", 100: "#c18471", 200: "#..." },
			accent: { 10: "#...", 100: "#dfae63", 200: "#..." }
		}
	}
}
```

## Seeds

You can provide any number of source colors, and Palette fills in the rest.

```js
const theme = palette({
	primary: "#3b82f6",
	accent: "f59e0b" // Seed values can be written with or without `#`.
})
```

## WCAG

You can reject generated palettes that fail minimum contrast/accessibility checks.

> Note: If you provide source colors that don't meet WCAG standards, palette will throw.

```js
const theme = palette({ wcag: true })
```

## Schemes

Influence the relationship between `primary`, `secondary`, and `accent`.

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
