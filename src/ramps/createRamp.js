import { MODE_DARK, MODE_LIGHT } from "../defaults.js"
import { normalizeHex } from "../color/normalize.js"
import { hexToOklch, oklchToHex, clampLightness, clampChroma, normalizeHue } from "../color/oklch.js"

export const RAMP_STOPS = [0, 5, 10, 12, 16, 20, 30, 35, 40, 45, 50, 60, 65, 70, 75, 80, 85, 90, 92, 95, 100]

export function createRamp(seed, options = {}) {
	const normalizedSeed = normalizeHex(seed)
	const seedOklch = hexToOklch(normalizedSeed)
	const { chromaScale = 1, minChroma = 0, maxChroma = 0.32 } = options
	const stops = [...RAMP_STOPS]
	const colors = {}

	for (const stop of stops) {
		const lightness = stop / 100
		const chroma = clampRampChroma(seedOklch.c * chromaScale * Math.sin(lightness * Math.PI), minChroma, maxChroma)

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
	return getRampCandidates(ramp, [95, 90, 80, 70, 60, 50, 40, 30, 20])
}

export function getDarkModeCandidates(ramp) {
	return getRampCandidates(ramp, [5, 10, 20, 30, 40, 50, 60, 70, 80])
}

export function getSolidCandidates(ramp, mode) {
	if (mode === MODE_LIGHT) {
		return getRampCandidates(ramp, [35, 40, 45, 50])
	}

	if (mode === MODE_DARK) {
		return getRampCandidates(ramp, [60, 65, 70, 75])
	}

	throw new TypeError('Expected mode to be "light" or "dark"')
}

export function getSoftCandidates(ramp, mode) {
	if (mode === MODE_LIGHT) {
		return getRampCandidates(ramp, [92, 90, 85])
	}

	if (mode === MODE_DARK) {
		return getRampCandidates(ramp, [12, 16, 20])
	}

	throw new TypeError('Expected mode to be "light" or "dark"')
}

export function getTextCandidates(ramp, mode) {
	if (mode === MODE_LIGHT) {
		return getRampCandidates(ramp, [10, 20, 30, 40])
	}

	if (mode === MODE_DARK) {
		return getRampCandidates(ramp, [90, 80, 70, 60])
	}

	throw new TypeError('Expected mode to be "light" or "dark"')
}

function clampRampChroma(chroma, minChroma, maxChroma) {
	const minimum = clampChroma(minChroma)
	const maximum = clampChroma(maxChroma)

	return Math.min(maximum, Math.max(minimum, clampChroma(chroma)))
}
