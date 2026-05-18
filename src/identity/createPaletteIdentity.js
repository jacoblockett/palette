import { MODE_DARK, MODE_LIGHT } from "../defaults.js"
import { clampChroma, clampLightness, hexToOklch, normalizeHue, oklchToHex } from "../color/oklch.js"

const NEUTRAL_MAX_CHROMA = 0.08
const ROLE_MAX_CHROMA = 0.24

export function createPaletteIdentity({ mode, seeds }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (seeds === null || Array.isArray(seeds) || typeof seeds !== "object") {
		throw new TypeError("Expected seeds to be an object")
	}

	return {
		sourceMode: mode,
		source: seeds,
		neutral: createIdentityColor(seeds.text, NEUTRAL_MAX_CHROMA),
		base: createIdentityColor(seeds.background, NEUTRAL_MAX_CHROMA),
		roles: {
			primary: createIdentityColor(seeds.primary, ROLE_MAX_CHROMA),
			secondary: createIdentityColor(seeds.secondary, ROLE_MAX_CHROMA),
			accent: createIdentityColor(seeds.accent, ROLE_MAX_CHROMA)
		}
	}
}

export function createModeRampSeeds({ mode, identity }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	const neutralLightness = mode === MODE_LIGHT ? 0.18 : 0.88
	const baseLightness = mode === MODE_LIGHT ? 0.96 : 0.08
	const roleLightness = mode === MODE_LIGHT ? 0.56 : 0.68

	return {
		primary: renderIdentitySeed(identity.roles.primary, roleLightness),
		secondary: renderIdentitySeed(identity.roles.secondary, roleLightness),
		accent: renderIdentitySeed(identity.roles.accent, roleLightness),
		neutral: renderIdentitySeed(identity.neutral, neutralLightness),
		base: renderIdentitySeed(identity.base, baseLightness)
	}
}

function createIdentityColor(seed, maxChroma) {
	const color = hexToOklch(seed)

	return {
		l: clampLightness(color.l),
		c: Math.min(maxChroma, clampChroma(color.c)),
		h: normalizeHue(color.h)
	}
}

function renderIdentitySeed(color, lightness) {
	return oklchToHex({
		l: clampLightness(lightness),
		c: clampChroma(color.c),
		h: normalizeHue(color.h)
	})
}
