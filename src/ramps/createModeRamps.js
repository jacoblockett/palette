import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { createRamp } from "./createRamp.js"

const MODE_RAMP_OPTIONS = {
	[MODE_LIGHT]: {
		role: {
			profile: "chromatic",
			chromaScale: 0.9
		},
		neutral: {
			profile: "neutral",
			chromaScale: 0.42
		}
	},
	[MODE_DARK]: {
		role: {
			profile: "chromatic",
			chromaScale: 1.05
		},
		neutral: {
			profile: "neutral",
			chromaScale: 0.5
		}
	}
}

export function createModeRamps({ mode, seeds }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (seeds === null || Array.isArray(seeds) || typeof seeds !== "object") {
		throw new TypeError("Expected a seeds object")
	}

	const options = MODE_RAMP_OPTIONS[mode]

	return {
		primary: createRamp(seeds.primary, options.role),
		secondary: createRamp(seeds.secondary, options.role),
		accent: createRamp(seeds.accent, options.role),
		neutral: createRamp(seeds.neutral, options.neutral),
		base: createRamp(seeds.base, options.neutral)
	}
}
