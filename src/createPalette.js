import { normalizeHex } from "./color/normalize.js"
import { MODE_LIGHT, MODE_DARK, REQUIRED_SEED_KEYS } from "./defaults.js"
import { createMode } from "./modes/createMode.js"
import { createModeRamps } from "./ramps/createModeRamps.js"

export function createPalette(input) {
	const normalizedInput = normalizeInput(input)
	const lightRamps = createModeRamps({ mode: MODE_LIGHT, seeds: normalizedInput.seeds })
	const darkRamps = createModeRamps({ mode: MODE_DARK, seeds: normalizedInput.seeds })
	const light = createMode({ mode: MODE_LIGHT, ramps: lightRamps })
	const dark = createMode({ mode: MODE_DARK, ramps: darkRamps })
	const modes = {
		light,
		dark
	}
	const inverseMode = getInverseMode(normalizedInput.mode)

	return {
		mode: normalizedInput.mode,
		inverseMode,
		source: normalizedInput.seeds,
		current: modes[normalizedInput.mode],
		inverse: modes[inverseMode],
		modes
	}
}

function normalizeMode(mode) {
	if (mode === undefined) {
		return MODE_LIGHT
	}

	if (mode === MODE_LIGHT || mode === MODE_DARK) {
		return mode
	}

	throw new TypeError('Expected mode to be "light" or "dark"')
}

function getInverseMode(mode) {
	return mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT
}

function normalizeInput(input) {
	if (input === undefined) {
		throw new TypeError("Expected a palette input object")
	}

	if (input === null || Array.isArray(input) || typeof input !== "object") {
		throw new TypeError("Expected a palette input object")
	}

	if (!("seeds" in input)) {
		throw new TypeError("Expected input.seeds")
	}

	if (input.seeds === null || Array.isArray(input.seeds) || typeof input.seeds !== "object") {
		throw new TypeError("Expected input.seeds to be an object")
	}

	return {
		mode: normalizeMode(input.mode),
		seeds: normalizeSeeds(input.seeds)
	}
}

function normalizeSeeds(seeds) {
	for (const key of REQUIRED_SEED_KEYS) {
		if (!(key in seeds)) {
			throw new TypeError(`Missing required seed: ${key}`)
		}
	}

	return {
		primary: normalizeHex(seeds.primary),
		secondary: normalizeHex(seeds.secondary),
		accent: normalizeHex(seeds.accent),
		neutral: normalizeHex(seeds.neutral),
		base: normalizeHex(seeds.base)
	}
}
