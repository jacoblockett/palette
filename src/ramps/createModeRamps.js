import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { createRamp } from "./createRamp.js"

const MODE_RAMP_OPTIONS = {
	[MODE_LIGHT]: {
		role: {
			chromaScale: 0.82,
			minChroma: 0.04,
			maxChroma: 0.22
		},
		neutral: {
			chromaScale: 0.38,
			minChroma: 0,
			maxChroma: 0.055
		}
	},
	[MODE_DARK]: {
		role: {
			chromaScale: 1.16,
			minChroma: 0.08,
			maxChroma: 0.3
		},
		neutral: {
			chromaScale: 0.5,
			minChroma: 0,
			maxChroma: 0.07
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
