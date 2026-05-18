import { contrastRatio } from "../color/contrast.js"
import { perceptualDifference } from "../color/difference.js"
import { hexToOklch, normalizeHue, oklchToHex } from "../color/oklch.js"
import { createPalette } from "../createPalette.js"

const HARMONY_PATTERNS = ["analogous", "split-complementary", "triadic", "restrained-complementary"]
const RANDOM_GENERATION_ATTEMPTS = 48
const MINIMUM_RANDOM_SCORE = 60
const ROLE_SEPARATION_MINIMUM = 0.12
const ACCENT_SEPARATION_MINIMUM = 0.14
const SURFACE_SEPARATION_MINIMUM = 0.08

export function createRandomPaletteSeeds(options = {}) {
	if (options === null || Array.isArray(options) || typeof options !== "object") {
		throw new TypeError("Expected options to be an object")
	}

	const { mode = "dark" } = options

	if (mode !== "light" && mode !== "dark") {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	let bestSeeds
	let bestScore = -Infinity
	let seeds

	for (let attempt = 0; attempt < RANDOM_GENERATION_ATTEMPTS; attempt += 1) {
		seeds = createCandidateSeeds(mode)
		const candidateScore = scorePalette(seeds)

		if (candidateScore > bestScore) {
			bestSeeds = seeds
			bestScore = candidateScore
		}

		if (candidateScore >= MINIMUM_RANDOM_SCORE) {
			return seeds
		}
	}

	return bestSeeds ?? seeds
}

function createCandidateSeeds(mode) {
	const anchorHue = randomInRange(0, 360)
	const pattern = pickRandomItem(HARMONY_PATTERNS)
	const huePlan = createHuePlan(anchorHue, pattern)
	const neutralHue = normalizeHue(huePlan.primaryHue + randomInRange(-8, 8))
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
				h: huePlan.primaryHue
			}),
			secondary: createOklchHex({
				l: randomInRange(0.38, 0.52),
				c: randomInRange(0.07, 0.16),
				h: huePlan.secondaryHue
			}),
			accent: createOklchHex({
				l: randomInRange(0.44, 0.58),
				c: randomInRange(0.11, 0.22),
				h: huePlan.accentHue
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
			h: huePlan.primaryHue
		}),
		secondary: createOklchHex({
			l: randomInRange(0.54, 0.68),
			c: randomInRange(0.08, 0.18),
			h: huePlan.secondaryHue
		}),
		accent: createOklchHex({
			l: randomInRange(0.6, 0.74),
			c: randomInRange(0.12, 0.24),
			h: huePlan.accentHue
		})
	}
}

function scorePalette(seeds) {
	const lightPalette = createPalette({ mode: "light", seeds })
	const darkPalette = createPalette({ mode: "dark", seeds })

	return scoreModePalette(lightPalette.current) + scoreModePalette(darkPalette.current)
}

function scoreModePalette(mode) {
	let score = 0

	score += scoreContrastTarget(mode.app.fg, mode.app.bg, 7, 12)
	score += scoreContrastTarget(mode.app.mutedFg, mode.app.bg, 4.5, 8)
	score += scoreContrastTarget(mode.roles.primary.solid.fg, mode.roles.primary.solid.bg, 4.5, 8)
	score += scoreContrastTarget(mode.roles.secondary.solid.fg, mode.roles.secondary.solid.bg, 4.5, 6)
	score += scoreContrastTarget(mode.roles.accent.solid.fg, mode.roles.accent.solid.bg, 4.5, 7)
	score += scoreMinimumDifference(
		mode.roles.primary.solid.bg,
		mode.roles.secondary.solid.bg,
		ROLE_SEPARATION_MINIMUM,
		8
	)
	score += scoreMinimumDifference(mode.roles.primary.solid.bg, mode.roles.accent.solid.bg, ACCENT_SEPARATION_MINIMUM, 8)
	score += scoreMinimumDifference(mode.roles.secondary.solid.bg, mode.roles.accent.solid.bg, ROLE_SEPARATION_MINIMUM, 6)
	score += scoreMinimumDifference(mode.roles.primary.solid.bg, mode.app.bg, SURFACE_SEPARATION_MINIMUM, 5)
	score += scoreMinimumDifference(mode.roles.secondary.solid.bg, mode.app.bg, SURFACE_SEPARATION_MINIMUM, 4)
	score += scoreMinimumDifference(mode.roles.accent.solid.bg, mode.app.bg, SURFACE_SEPARATION_MINIMUM, 5)
	score += scoreMinimumDifference(mode.roles.primary.soft.bg, mode.surfaces.base.bg, SURFACE_SEPARATION_MINIMUM, 3)
	score += scoreMinimumDifference(mode.roles.accent.soft.bg, mode.surfaces.base.bg, SURFACE_SEPARATION_MINIMUM, 3)
	score += scoreRoleProminence(mode)

	return score
}

function scoreContrastTarget(foreground, background, minimum, weight) {
	const contrast = contrastRatio(foreground, background)

	if (contrast >= minimum) {
		return weight
	}

	return weight * (contrast / minimum) * 0.5
}

function scoreMinimumDifference(first, second, minimum, weight) {
	const difference = perceptualDifference(first, second)

	if (difference >= minimum) {
		return weight
	}

	return weight * (difference / minimum) * 0.5
}

function scoreRoleProminence(mode) {
	let score = 0
	const primaryChroma = hexToOklch(mode.roles.primary.solid.bg).c
	const secondaryChroma = hexToOklch(mode.roles.secondary.solid.bg).c
	const accentChroma = hexToOklch(mode.roles.accent.solid.bg).c

	if (primaryChroma >= secondaryChroma) {
		score += 4
	}

	if (accentChroma >= secondaryChroma) {
		score += 2
	}

	if (perceptualDifference(mode.roles.primary.solid.bg, mode.roles.accent.solid.bg) >= ACCENT_SEPARATION_MINIMUM) {
		score += 2
	}

	return score
}

function pickRandomItem(items) {
	return items[Math.floor(Math.random() * items.length)]
}

function createHuePlan(anchorHue, pattern) {
	const direction = randomSign()

	if (pattern === "analogous") {
		return {
			primaryHue: normalizeHue(anchorHue),
			secondaryHue: normalizeHue(anchorHue + randomInRange(18, 46) * direction),
			accentHue: normalizeHue(anchorHue + randomInRange(72, 118) * direction),
			pattern
		}
	}

	if (pattern === "split-complementary") {
		return {
			primaryHue: normalizeHue(anchorHue),
			secondaryHue: normalizeHue(anchorHue + randomInRange(32, 58) * direction),
			accentHue: normalizeHue(anchorHue + randomInRange(150, 210) * -direction),
			pattern
		}
	}

	if (pattern === "triadic") {
		return {
			primaryHue: normalizeHue(anchorHue),
			secondaryHue: normalizeHue(anchorHue + randomInRange(110, 130)),
			accentHue: normalizeHue(anchorHue + randomInRange(230, 250)),
			pattern
		}
	}

	return {
		primaryHue: normalizeHue(anchorHue),
		secondaryHue: normalizeHue(anchorHue + randomInRange(22, 42) * direction),
		accentHue: normalizeHue(anchorHue + randomInRange(165, 195) * randomSign()),
		pattern
	}
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
