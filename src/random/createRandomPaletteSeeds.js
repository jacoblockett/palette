import { contrastRatio } from "../color/contrast.js"
import { normalizeHue, oklchToHex } from "../color/oklch.js"
import { createPalette } from "../createPalette.js"

export function createRandomPaletteSeeds(options = {}) {
	if (options === null || Array.isArray(options) || typeof options !== "object") {
		throw new TypeError("Expected options to be an object")
	}

	const { mode = "dark" } = options

	if (mode !== "light" && mode !== "dark") {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	let seeds

	for (let attempt = 0; attempt < 24; attempt += 1) {
		seeds = createCandidateSeeds(mode)

		if (palettePassesScreening(seeds)) {
			return seeds
		}
	}

	return seeds
}

function createCandidateSeeds(mode) {
	const anchorHue = randomInRange(0, 360)
	const secondaryHue = normalizeHue(anchorHue + randomInRange(18, 46) * randomSign())
	const accentHue = normalizeHue(anchorHue + randomInRange(145, 215) * randomSign())
	const neutralHue = normalizeHue(anchorHue + randomInRange(-8, 8))
	const baseHue = normalizeHue(neutralHue + randomInRange(-6, 6))

	if (mode === "light") {
		return {
			text: createOklchHex({
				l: randomInRange(0.12, 0.22),
				c: randomInRange(0.006, 0.028),
				h: neutralHue
			}),
			background: createOklchHex({
				l: randomInRange(0.94, 0.985),
				c: randomInRange(0.004, 0.022),
				h: baseHue
			}),
			primary: createOklchHex({
				l: randomInRange(0.42, 0.56),
				c: randomInRange(0.1, 0.21),
				h: anchorHue
			}),
			secondary: createOklchHex({
				l: randomInRange(0.38, 0.52),
				c: randomInRange(0.07, 0.16),
				h: secondaryHue
			}),
			accent: createOklchHex({
				l: randomInRange(0.44, 0.58),
				c: randomInRange(0.11, 0.22),
				h: accentHue
			})
		}
	}

	return {
		text: createOklchHex({
			l: randomInRange(0.88, 0.96),
			c: randomInRange(0.006, 0.026),
			h: neutralHue
		}),
		background: createOklchHex({
			l: randomInRange(0.055, 0.13),
			c: randomInRange(0.006, 0.028),
			h: baseHue
		}),
		primary: createOklchHex({
			l: randomInRange(0.58, 0.72),
			c: randomInRange(0.11, 0.22),
			h: anchorHue
		}),
		secondary: createOklchHex({
			l: randomInRange(0.54, 0.68),
			c: randomInRange(0.08, 0.18),
			h: secondaryHue
		}),
		accent: createOklchHex({
			l: randomInRange(0.6, 0.74),
			c: randomInRange(0.12, 0.24),
			h: accentHue
		})
	}
}

function palettePassesScreening(seeds) {
	const lightPalette = createPalette({ mode: "light", seeds })
	const darkPalette = createPalette({ mode: "dark", seeds })

	return passesModeScreening(lightPalette) && passesModeScreening(darkPalette)
}

function passesModeScreening(palette) {
	return (
		contrastRatio(palette.current.app.fg, palette.current.app.bg) >= 7 &&
		contrastRatio(palette.current.app.mutedFg, palette.current.app.bg) >= 4.5 &&
		contrastRatio(palette.current.roles.primary.solid.fg, palette.current.roles.primary.solid.bg) >= 4.5 &&
		contrastRatio(palette.current.roles.secondary.solid.fg, palette.current.roles.secondary.solid.bg) >= 4.5 &&
		contrastRatio(palette.current.roles.accent.solid.fg, palette.current.roles.accent.solid.bg) >= 4.5
	)
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min)
}

function randomSign() {
	return Math.random() < 0.5 ? -1 : 1
}

function createOklchHex({ l, c, h }) {
	return oklchToHex({
		l,
		c,
		h: normalizeHue(h)
	})
}
