import { contrastRatio } from "../color/contrast.js"
import { perceptualDifference } from "../color/difference.js"
import { hexToOklch, normalizeHue, oklchToHex } from "../color/oklch.js"
import { createPalette } from "../createPalette.js"

const SEMANTIC_COMPOSITION_PRESETS = [
	{
		name: "restrained-analogous",
		secondaryOffset: [18, 42],
		accentOffset: [72, 112],
		primaryChroma: [0.78, 1],
		secondaryChroma: [0.52, 0.72],
		accentChroma: [0.84, 1.04],
		primaryToneBias: 0,
		secondaryToneBias: -0.02,
		accentToneBias: 0.03
	},
	{
		name: "cool-primary",
		secondaryOffset: [28, 58],
		accentOffset: [145, 205],
		primaryChroma: [0.88, 1.08],
		secondaryChroma: [0.48, 0.68],
		accentChroma: [0.78, 0.98],
		primaryToneBias: 0,
		secondaryToneBias: -0.03,
		accentToneBias: 0.02
	},
	{
		name: "warm-accent",
		secondaryOffset: [22, 48],
		accentOffset: [130, 190],
		primaryChroma: [0.82, 1.02],
		secondaryChroma: [0.45, 0.64],
		accentChroma: [0.96, 1.18],
		primaryToneBias: 0,
		secondaryToneBias: -0.04,
		accentToneBias: 0.05
	},
	{
		name: "split-accent",
		secondaryOffset: [34, 64],
		accentOffset: [155, 215],
		primaryChroma: [0.86, 1.08],
		secondaryChroma: [0.5, 0.7],
		accentChroma: [0.86, 1.1],
		primaryToneBias: 0,
		secondaryToneBias: -0.03,
		accentToneBias: 0.04
	},
	{
		name: "muted-brand",
		secondaryOffset: [18, 38],
		accentOffset: [95, 155],
		primaryChroma: [0.62, 0.82],
		secondaryChroma: [0.38, 0.56],
		accentChroma: [0.58, 0.8],
		primaryToneBias: 0.01,
		secondaryToneBias: -0.03,
		accentToneBias: 0.04
	},
	{
		name: "high-energy",
		secondaryOffset: [44, 78],
		accentOffset: [165, 225],
		primaryChroma: [0.92, 1.14],
		secondaryChroma: [0.48, 0.68],
		accentChroma: [1.02, 1.22],
		primaryToneBias: 0,
		secondaryToneBias: -0.05,
		accentToneBias: 0.05
	}
]
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
	const preset = pickRandomItem(SEMANTIC_COMPOSITION_PRESETS)
	const compositionPlan = createCompositionPlan(anchorHue, preset)
	const roleProfile = getModeRoleSeedProfile(mode)
	const neutralHue = normalizeHue(compositionPlan.primaryHue + randomInRange(-8, 8))
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
				l: applyToneBias(roleProfile.primaryLightness, compositionPlan.primaryToneBias),
				c: applyChromaScale(roleProfile.primaryChroma, compositionPlan.primaryChromaScale),
				h: compositionPlan.primaryHue
			}),
			secondary: createOklchHex({
				l: applyToneBias(roleProfile.secondaryLightness, compositionPlan.secondaryToneBias),
				c: applyChromaScale(roleProfile.secondaryChroma, compositionPlan.secondaryChromaScale),
				h: compositionPlan.secondaryHue
			}),
			accent: createOklchHex({
				l: applyToneBias(roleProfile.accentLightness, compositionPlan.accentToneBias),
				c: applyChromaScale(roleProfile.accentChroma, compositionPlan.accentChromaScale),
				h: compositionPlan.accentHue
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
			l: applyToneBias(roleProfile.primaryLightness, compositionPlan.primaryToneBias),
			c: applyChromaScale(roleProfile.primaryChroma, compositionPlan.primaryChromaScale),
			h: compositionPlan.primaryHue
		}),
		secondary: createOklchHex({
			l: applyToneBias(roleProfile.secondaryLightness, compositionPlan.secondaryToneBias),
			c: applyChromaScale(roleProfile.secondaryChroma, compositionPlan.secondaryChromaScale),
			h: compositionPlan.secondaryHue
		}),
		accent: createOklchHex({
			l: applyToneBias(roleProfile.accentLightness, compositionPlan.accentToneBias),
			c: applyChromaScale(roleProfile.accentChroma, compositionPlan.accentChromaScale),
			h: compositionPlan.accentHue
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
	score += scoreSemanticHierarchy(mode)
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

function scoreSemanticHierarchy(mode) {
	let score = 0
	const primary = hexToOklch(mode.roles.primary.solid.bg)
	const secondary = hexToOklch(mode.roles.secondary.solid.bg)
	const accent = hexToOklch(mode.roles.accent.solid.bg)
	const primaryDistance = getAxisDistanceFromBackground(mode.roles.primary.solid.bg, mode.app.bg)
	const secondaryDistance = getAxisDistanceFromBackground(mode.roles.secondary.solid.bg, mode.app.bg)

	if (primary.c >= secondary.c) {
		score += 8
	}

	if (primaryDistance >= secondaryDistance) {
		score += 8
	}

	if (accent.c >= secondary.c) {
		score += 6
	}

	if (perceptualDifference(mode.roles.accent.solid.bg, mode.roles.primary.solid.bg) >= ACCENT_SEPARATION_MINIMUM) {
		score += 6
	}

	if (secondary.c > primary.c) {
		score -= 10
	}

	if (perceptualDifference(mode.roles.secondary.solid.bg, mode.roles.primary.solid.bg) < ROLE_SEPARATION_MINIMUM) {
		score -= 8
	}

	if (perceptualDifference(mode.roles.accent.solid.bg, mode.roles.primary.solid.bg) < ACCENT_SEPARATION_MINIMUM) {
		score -= 8
	}

	return score
}

function getAxisDistanceFromBackground(color, background) {
	const colorOklch = hexToOklch(color)
	const backgroundOklch = hexToOklch(background)

	return Math.abs(colorOklch.l - backgroundOklch.l)
}

function pickRandomItem(items) {
	return items[Math.floor(Math.random() * items.length)]
}

function createCompositionPlan(anchorHue, preset) {
	const direction = randomSign()

	return {
		primaryHue: normalizeHue(anchorHue),
		secondaryHue: normalizeHue(
			anchorHue + randomInRange(preset.secondaryOffset[0], preset.secondaryOffset[1]) * direction
		),
		accentHue: normalizeHue(anchorHue + randomInRange(preset.accentOffset[0], preset.accentOffset[1]) * -direction),
		presetName: preset.name,
		primaryChromaScale: randomInRange(preset.primaryChroma[0], preset.primaryChroma[1]),
		secondaryChromaScale: randomInRange(preset.secondaryChroma[0], preset.secondaryChroma[1]),
		accentChromaScale: randomInRange(preset.accentChroma[0], preset.accentChroma[1]),
		primaryToneBias: preset.primaryToneBias,
		secondaryToneBias: preset.secondaryToneBias,
		accentToneBias: preset.accentToneBias
	}
}

function getModeRoleSeedProfile(mode) {
	if (mode === "light") {
		return {
			primaryLightness: [0.42, 0.56],
			secondaryLightness: [0.4, 0.54],
			accentLightness: [0.44, 0.58],
			primaryChroma: [0.1, 0.2],
			secondaryChroma: [0.075, 0.145],
			accentChroma: [0.105, 0.2]
		}
	}

	return {
		primaryLightness: [0.58, 0.72],
		secondaryLightness: [0.54, 0.68],
		accentLightness: [0.6, 0.74],
		primaryChroma: [0.11, 0.21],
		secondaryChroma: [0.08, 0.155],
		accentChroma: [0.12, 0.22]
	}
}

function applyToneBias(range, bias) {
	const value = randomInRange(range[0], range[1]) + bias

	return Math.min(1, Math.max(0, value))
}

function applyChromaScale(range, scale) {
	const value = randomInRange(range[0], range[1]) * scale

	return Math.min(0.24, Math.max(0.012, value))
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
