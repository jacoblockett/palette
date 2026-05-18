# palette

`palette` is a semantic UI palette generator. It accepts five public semantic seeds: `text`, `background`, `primary`, `secondary`, and `accent`, generates light and dark mode outputs from one normalized palette identity, and returns plain JavaScript objects containing solid hex colors for semantic UI token consumption.

## Usage

```js
import { createPalette } from "palette"

const palette = createPalette({
	mode: "light",
	seeds: {
		text: "#1f2937",
		background: "#f8fafc",
		primary: "#4f46e5",
		secondary: "#0f766e",
		accent: "#d97706"
	}
})
```

## Required Input

`createPalette` accepts one input object with `mode` and `seeds`.

```js
const palette = createPalette({
	mode: "dark",
	seeds: {
		text: "#e5e7eb",
		background: "#111827",
		primary: "#818cf8",
		secondary: "#2dd4bf",
		accent: "#f59e0b"
	}
})
```

- Every seed is required: `text`, `background`, `primary`, `secondary`, and `accent`.
- Missing input, missing `seeds`, or missing seed keys throw `TypeError`.
- `mode` may be `"light"` or `"dark"`.
- If `mode` is omitted, it defaults to `"light"`.
- Accepted seed formats are `#rgb` and `#rrggbb`.
- Output colors are normalized lowercase `#rrggbb`.

## Seed Responsibilities

- `text`: semantic text source used to derive the neutral identity rail.
- `background`: semantic environment source used to derive the base surface identity rail.
- `primary`: main brand or action identity color.
- `secondary`: supporting brand or action identity color.
- `accent`: highlight, selection, and focus-adjacent identity color.
- Public seeds define palette identity, not guaranteed final token values.
- Generated token colors may differ from seed colors because the engine maps identity into mode-specific tones, sRGB gamut, and contrast-safe foreground/background pairs.

`success`, `warning`, `danger`, and `info` are generated role families. They are not accepted as public input seeds.

## Palette Identity and Modes

`createPalette` normalizes the five public seeds into one internal identity. Light and dark modes are then generated as two tonal renderings of that identity.

- Mode switching does not reinterpret current-mode output colors as new source seeds.
- `text` and `background` become the internal neutral and base rails.
- `primary`, `secondary`, and `accent` become chromatic role families.
- `current` points to the requested mode.
- `inverse` points to the opposite mode.

## Color Generation

- Tone scales are generated in OKLCH.
- OKLCH output is mapped into sRGB by preserving lightness and hue while reducing chroma.
- Output is returned as solid hex colors.

## Return Shape

`createPalette` returns this top-level shape:

```js
{
	mode,
	inverseMode,
	source,
	current,
	inverse,
	modes: {
		light: {
			app,
			surfaces,
			roles,
			ramps
		},
		dark: {
			app,
			surfaces,
			roles,
			ramps
		}
	}
}
```

- `source` contains the normalized public semantic seeds.
- `current` points to the requested mode output.
- `inverse` points to the opposite mode output.
- `modes.light` and `modes.dark` each contain `app`, `surfaces`, `roles`, and `ramps`.

## `mode.app`

`mode.app` contains global app-level colors:

```js
{
	bg,
	fg,
	mutedFg,
	subtleFg,
	border,
	strongBorder,
	focusRing,
	selectionBg,
	selectionFg
}
```

## `mode.surfaces`

`mode.surfaces` contains:

```js
{
	base,
	raised,
	sunken,
	overlay
}
```

Every surface is a nested interactive recipe intended for cards, panels, overlays, and nested UI containers.

## `mode.roles`

`mode.roles` contains:

```js
{
	primary,
	secondary,
	accent,
	neutral,
	success,
	warning,
	danger,
	info
}
```

Every role contains these treatments:

```js
{
	solid,
	soft,
	outline,
	ghost
}
```

- `primary`, `secondary`, `accent`, and `neutral` are derived from the semantic identity rails.
- `success`, `warning`, `danger`, and `info` are generated role families.
- No additional role seed input is accepted by the public API.

## Recipe Shapes

Interactive recipe shape:

```js
{
	bg,
	fg,
	border,
	hover: {
		bg,
		fg,
		border
	},
	active: {
		bg,
		fg,
		border
	}
}
```

Nested interactive recipe shape:

```js
{
	bg,
	fg,
	border,
	hover: {
		bg,
		fg,
		border
	},
	active: {
		bg,
		fg,
		border
	},
	child: {
		bg,
		fg,
		border,
		hover: {
			bg,
			fg,
			border
		},
		active: {
			bg,
			fg,
			border
		}
	}
}
```

- `solid` and `soft` role treatments use the nested interactive recipe shape.
- `outline` and `ghost` role treatments use the interactive recipe shape.
- `child` is one layer deep.
- Recursive nested state trees are not generated.

## Contrast-Aware Generation

- Foregrounds are solved against their assigned backgrounds.
- App foreground targets `7:1` contrast.
- Body, role, muted, selection, hover, active, and child foregrounds target their configured contrast thresholds.
- Black or white readable foreground fallbacks are used when palette candidate foregrounds do not meet the required contrast.
- Borders and state backgrounds are selected from generated tone candidates.
- Generated colors may differ from exact seed colors because seeds provide identity direction, not fixed final token values.

## Random Semantic Seeds

`palette` also exports `createRandomPaletteSeeds` for library-owned semantic seed generation.

```js
import { createPalette, createRandomPaletteSeeds } from "palette"

const seeds = createRandomPaletteSeeds({ mode: "dark" })

const palette = createPalette({
	mode: "dark",
	seeds
})
```

- `createRandomPaletteSeeds` returns `text`, `background`, `primary`, `secondary`, and `accent`.
- Random generation uses OKLCH.
- Generated seed sets are screened through the palette engine for core light and dark contrast pairs before being returned.

## Example

```js
import { createPalette } from "palette"

const palette = createPalette({
	seeds: {
		text: "#1f2937",
		background: "#f8fafc",
		primary: "#4f46e5",
		secondary: "#0f766e",
		accent: "#d97706"
	}
})

palette.current.app.bg
palette.current.app.fg
palette.current.surfaces.base.bg
palette.current.roles.primary.solid.bg
palette.inverse.app.bg
```
