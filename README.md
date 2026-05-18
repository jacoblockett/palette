# palette

`palette` is a contrast-aware semantic UI palette generator. It takes five required seed colors, generates both light and dark mode palettes, and returns plain JavaScript objects containing solid hex colors for semantic UI token consumption.

## Usage

```js
import { createPalette } from "palette"

const palette = createPalette({
	mode: "light",
	seeds: {
		primary: "#4f46e5",
		secondary: "#0f766e",
		accent: "#d97706",
		neutral: "#475569",
		base: "#94a3b8"
	}
})
```

## Required Input

`createPalette` accepts one input object with `mode` and `seeds`.

```js
const palette = createPalette({
	mode: "dark",
	seeds: {
		primary: "#4f46e5",
		secondary: "#0f766e",
		accent: "#d97706",
		neutral: "#475569",
		base: "#94a3b8"
	}
})
```

- Every seed is required: `primary`, `secondary`, `accent`, `neutral`, and `base`.
- Missing input, missing `seeds`, or missing seed keys throw `TypeError`.
- Accepted seed formats are `#rgb` and `#rrggbb`.
- Output colors are normalized to lowercase `#rrggbb`.
- `mode` may be `"light"` or `"dark"`.
- If `mode` is omitted, it defaults to `"light"`.

## Seed Responsibilities

- `primary`: main brand or action color.
- `secondary`: supporting brand or action color.
- `accent`: highlight and focus-adjacent color.
- `neutral`: structural color source for text, borders, and neutral UI.
- `base`: environmental app and surface bias.
- Public seeds are authoring inputs. The generator derives separate light and dark ramps internally from the same five required seeds.

`success`, `warning`, `danger`, and `info` are generated from the five required seed ramps. They are not accepted as public input seeds.

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

- `source` contains the normalized required seeds.
- `current` points to the requested mode output.
- `inverse` points to the opposite mode output.
- Each mode contains `app`, `surfaces`, `roles`, and `ramps`.

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

- App foreground tokens are chosen from generated neutral ramp candidates.
- `focusRing` and `selectionBg` derive from the accent ramp.

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

Every surface is a nested interactive recipe. Surfaces derive from the base and neutral ramps and are intended for cards, panels, overlays, and nested UI containers.

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

- `primary`, `secondary`, `accent`, and `neutral` derive from mode-specific ramps created from the required public seeds.
- `success`, `warning`, `danger`, and `info` are generated from transformed versions of required seed ramps.
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

- Foreground candidates are selected against their generated background.
- Hover and active states select their own foregrounds.
- Borders and state backgrounds are selected from finite tonal candidates.
- The generator uses bounded candidate selection instead of unbounded adjustment loops.
- Generated colors may differ from exact seed colors because seeds provide direction and ramps, not fixed final token values.

## Example

```js
import { createPalette } from "palette"

const palette = createPalette({
	seeds: {
		primary: "#4f46e5",
		secondary: "#0f766e",
		accent: "#d97706",
		neutral: "#475569",
		base: "#94a3b8"
	}
})

palette.current.app.bg
palette.current.surfaces.base.bg
palette.current.roles.primary.solid.bg
palette.current.roles.primary.solid.hover.bg
palette.current.roles.primary.solid.child.hover.bg
```
