# palette

`palette` is a semantic UI palette generator built around a five-seed API. It accepts five public semantic seeds: `text`, `background`, `primary`, `secondary`, and `accent`; uses `text` and `background` to define the internal tonal axis for each mode; solves chromatic roles against that tonal axis instead of assigning them from fixed light and dark tone buckets; composes `primary`, `secondary`, and `accent` together as a semantic role hierarchy; and returns plain JavaScript objects containing solid hex colors for semantic UI token consumption.

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
- `primary`: dominant action role identity color.
- `secondary`: subordinate supporting role identity color.
- `accent`: sparse high-salience highlight role identity color.
- Near-neutral `text` and `background` seeds are collapsed into stable low-chroma neutral rails.
- Near-neutral role seeds receive deterministic hue and chroma recovery so role families do not collapse into unstable gray-source hues.
- Role seed colors define identity direction and hierarchy input, not final token values.
- Generated token colors may differ from seed colors because the engine maps identity into mode-specific tones, sRGB gamut, and contrast-safe foreground/background pairs.

`success`, `warning`, `danger`, and `info` are generated role families. They are not accepted as public input seeds.

## Palette Identity and Modes

`createPalette` normalizes the five public seeds into one internal identity. `text` and `background` form the neutral tonal axis for light and dark modes, and light and dark output are produced from that identity by role-preserving tonal-axis remapping.

- Mode switching does not reinterpret current-mode output colors as new source seeds.
- The tonal axis defines background tone, text tone, contrast span, polarity, and role anchor tones.
- `text` and `background` become the internal neutral and base rails.
- `primary`, `secondary`, and `accent` become chromatic role families.
- `current` points to the requested mode.
- `inverse` points to the opposite mode.

## Role Composition

Primary, secondary, and accent are solved together before final role tokens are emitted.

- The solver ranks candidate combinations for contrast, surface separation, sibling role separation, tonal-axis presence, chroma hierarchy, and role prominence.
- Primary is weighted as the strongest action role.
- Secondary is intentionally quieter than primary.
- Accent remains distinct and sparse rather than replacing primary or secondary.
- Solid, soft, outline, ghost, hover, active, and child states are generated from the solved role composition.
- Generated roles are assigned after the core roles and are separated against existing role colors.

## Color Generation

- Tone scales are generated in OKLCH.
- OKLCH output is mapped into sRGB by preserving lightness and hue while reducing chroma.
- Role candidates are generated from broad OKLCH tone and chroma candidate spaces.
- Fixed tone lists are not the final role assignment policy.
- Palette-derived foreground candidates are expanded tone-first before final black or white safety fallbacks are used.
- The engine prefers palette-derived foregrounds before final safety fallback colors.
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
- `primary`, `secondary`, and `accent` are composed together as the core semantic role set.
- `success`, `warning`, `danger`, and `info` are generated role families.
- Generated roles are assigned after the core roles and are separated against existing role colors.
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

- App text targets `7:1` contrast.
- Body, role, muted, selection, hover, active, and child foregrounds use their configured contrast targets.
- Non-text UI boundaries and visible state changes target `3:1`.
- Foreground and background pairs are selected during role assignment, not after roles are already final.
- Borders, focus rings, state backgrounds, and child backgrounds use contrast-aware visible candidate selection.
- Role treatments use generated token pairs, including `fg`, `bg`, `border`, `hover`, `active`, and nested child values.
- Black or white readable fallbacks are used only as final safety fallbacks after palette-derived tone candidates fail.
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
- Random generation uses OKLCH latent parameters rather than HSL or random RGB channels.
- Random generation samples semantic composition presets.
- Random generation samples coordinated role compositions instead of isolated primary, secondary, and accent hues.
- Presets define hue relationships, role chroma hierarchy, and role tone bias.
- Generated candidates are scored across both light and dark palette outputs.
- Scoring considers required contrast, semantic role hierarchy, role separation, surface separation, and role prominence.

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
palette.current.roles.primary.solid.fg
palette.current.roles.accent.soft.bg
palette.inverse.app.bg
```
