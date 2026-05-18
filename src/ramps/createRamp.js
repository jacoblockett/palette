import { MODE_DARK, MODE_LIGHT } from "../defaults.js"
import { normalizeHex } from "../color/normalize.js"
import { hexToOklch, oklchToHex, clampLightness, clampChroma, normalizeHue } from "../color/oklch.js"

const CHROMATIC_PROFILE = {
	chromaScale: 1,
	minChroma: 0.035,
	maxChroma: 0.24,
	toneChromaBias: 0.82,
	neutralizeExtremes: 0.72
}

const NEUTRAL_PROFILE = {
	chromaScale: 1,
	minChroma: 0,
	maxChroma: 0.07,
	toneChromaBias: 0.42,
	neutralizeExtremes: 0.9
}

export const TONE_STOPS = [
	0, 5, 10, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 88, 90, 92, 95, 98, 100
]

export const RAMP_STOPS = TONE_STOPS

export function createRamp(seed, options = {}) {
	const normalizedSeed = normalizeHex(seed)
	const sourceOklch = hexToOklch(normalizedSeed)
	const seedOklch = {
		l: clampLightness(sourceOklch.l),
		c: clampChroma(sourceOklch.c),
		h: normalizeHue(sourceOklch.h)
	}
	const resolvedOptions = resolveProfileOptions(options)
	const stops = [...TONE_STOPS]
	const colors = {}

	for (const stop of stops) {
		const lightness = stop / 100
		const chroma = getToneChroma(seedOklch, stop, resolvedOptions)

		colors[String(stop)] = oklchToHex({
			l: clampLightness(lightness),
			c: chroma,
			h: normalizeHue(seedOklch.h)
		})
	}

	return {
		seed: normalizedSeed,
		oklch: seedOklch,
		stops,
		colors
	}
}

export function createRamps(seeds) {
	if (seeds === null || Array.isArray(seeds) || typeof seeds !== "object") {
		throw new TypeError("Expected a seeds object")
	}

	return Object.fromEntries(Object.entries(seeds).map(([key, seed]) => [key, createRamp(seed)]))
}

export function getRampColor(ramp, stop) {
	if (!ramp || typeof ramp !== "object" || !ramp.colors || typeof ramp.colors !== "object") {
		throw new TypeError("Expected a ramp with colors")
	}

	const key = String(stop)

	if (!(key in ramp.colors)) {
		throw new TypeError("Expected a valid ramp stop")
	}

	return ramp.colors[key]
}

export function getRampCandidates(ramp, stops = RAMP_STOPS) {
	return stops.map(stop => getRampColor(ramp, stop))
}

export function getLightModeCandidates(ramp) {
	return getRampCandidates(ramp, [98, 95, 92, 90, 85, 80, 70, 60, 50, 40, 30, 20])
}

export function getDarkModeCandidates(ramp) {
	return getRampCandidates(ramp, [5, 10, 12, 16, 20, 25, 30, 40, 50, 60, 70, 80])
}

export function getSolidCandidates(ramp, mode) {
	if (mode === MODE_LIGHT) {
		return getRampCandidates(ramp, [40, 45, 50, 55])
	}

	if (mode === MODE_DARK) {
		return getRampCandidates(ramp, [60, 65, 70, 75])
	}

	throw new TypeError('Expected mode to be "light" or "dark"')
}

export function getSoftCandidates(ramp, mode) {
	if (mode === MODE_LIGHT) {
		return getRampCandidates(ramp, [95, 92, 90, 88])
	}

	if (mode === MODE_DARK) {
		return getRampCandidates(ramp, [10, 12, 16, 20])
	}

	throw new TypeError('Expected mode to be "light" or "dark"')
}

export function getTextCandidates(ramp, mode) {
	if (mode === MODE_LIGHT) {
		return getRampCandidates(ramp, [10, 12, 16, 20, 25, 30, 35, 40])
	}

	if (mode === MODE_DARK) {
		return getRampCandidates(ramp, [98, 95, 92, 90, 85, 80, 75, 70])
	}

	throw new TypeError('Expected mode to be "light" or "dark"')
}

export function getToneFirstForegroundCandidates(ramp, mode, preferredStops = []) {
	let searchOrder

	if (mode === MODE_LIGHT) {
		searchOrder = [5, 10, 12, 16, 20, 25, 30, 35, 40, 45, 50]
	} else if (mode === MODE_DARK) {
		searchOrder = [100, 98, 95, 92, 90, 88, 85, 80, 75, 70, 65, 60]
	} else {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	const combinedStops = [...new Set([...preferredStops, ...searchOrder])]

	return getRampCandidates(ramp, combinedStops)
}

function resolveProfileOptions(options) {
	const baseProfile = options.profile === "neutral" ? NEUTRAL_PROFILE : CHROMATIC_PROFILE

	return {
		...baseProfile,
		...(options.chromaScale === undefined ? {} : { chromaScale: options.chromaScale }),
		...(options.minChroma === undefined ? {} : { minChroma: options.minChroma }),
		...(options.maxChroma === undefined ? {} : { maxChroma: options.maxChroma }),
		...(options.toneChromaBias === undefined ? {} : { toneChromaBias: options.toneChromaBias }),
		...(options.neutralizeExtremes === undefined ? {} : { neutralizeExtremes: options.neutralizeExtremes })
	}
}

function getToneChroma(source, tone, options) {
	if (tone === 0 || tone === 100) {
		return 0
	}

	const lightness = tone / 100
	const distanceFromMiddle = Math.abs(lightness - 0.5) * 2
	const toneAttenuation = 1 - distanceFromMiddle ** options.neutralizeExtremes
	const sourceChroma = source.c * options.chromaScale
	const biasedChroma = sourceChroma * (options.toneChromaBias + toneAttenuation * (1 - options.toneChromaBias))

	return clampRampChroma(biasedChroma, options.minChroma, options.maxChroma)
}

function clampRampChroma(chroma, minChroma, maxChroma) {
	const minimum = clampChroma(minChroma)
	const maximum = clampChroma(maxChroma)

	return Math.min(maximum, Math.max(minimum, clampChroma(chroma)))
}
