import { MODE_DARK, MODE_LIGHT } from "../defaults.js"
import { clampChroma, clampLightness, hexToOklch, normalizeHue, oklchToHex } from "../color/oklch.js"

const NEAR_NEUTRAL_CHROMA_THRESHOLD = 0.025
const NEUTRAL_RAIL_MAX_CHROMA = 0.045
const ROLE_MAX_CHROMA = 0.24
const ROLE_RECOVERY_CHROMA = {
	primary: 0.06,
	secondary: 0.045,
	accent: 0.065
}
const ROLE_RECOVERY_HUE_OFFSETS = {
	primary: 0,
	secondary: 38,
	accent: 180
}

export function createPaletteIdentity({ mode, seeds }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (seeds === null || Array.isArray(seeds) || typeof seeds !== "object") {
		throw new TypeError("Expected seeds to be an object")
	}

	const recoveryHue = getStableRecoveryHue(seeds)

	return {
		sourceMode: mode,
		source: seeds,
		neutral: createNeutralIdentityColor(seeds.text),
		base: createNeutralIdentityColor(seeds.background),
		roles: {
			primary: createRoleIdentityColor(seeds.primary, "primary", recoveryHue),
			secondary: createRoleIdentityColor(seeds.secondary, "secondary", recoveryHue),
			accent: createRoleIdentityColor(seeds.accent, "accent", recoveryHue)
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

function createNeutralIdentityColor(seed) {
	const color = hexToOklch(seed)
	const sourceChroma = clampChroma(color.c)
	const nearNeutral = sourceChroma < NEAR_NEUTRAL_CHROMA_THRESHOLD

	return {
		l: clampLightness(color.l),
		c: nearNeutral ? 0 : Math.min(NEUTRAL_RAIL_MAX_CHROMA, sourceChroma),
		h: normalizeHue(color.h),
		nearNeutral
	}
}

function createRoleIdentityColor(seed, role, recoveryHue) {
	const color = hexToOklch(seed)
	const sourceChroma = clampChroma(color.c)
	const nearNeutral = sourceChroma < NEAR_NEUTRAL_CHROMA_THRESHOLD

	return {
		l: clampLightness(color.l),
		c: nearNeutral ? ROLE_RECOVERY_CHROMA[role] : Math.min(ROLE_MAX_CHROMA, sourceChroma),
		h: nearNeutral ? normalizeHue(recoveryHue + ROLE_RECOVERY_HUE_OFFSETS[role]) : normalizeHue(color.h),
		nearNeutral
	}
}

function renderIdentitySeed(color, lightness) {
	return oklchToHex({
		l: clampLightness(lightness),
		c: clampChroma(color.c),
		h: normalizeHue(color.h)
	})
}

function getStableRecoveryHue(seeds) {
	const chromaticColors = [hexToOklch(seeds.primary), hexToOklch(seeds.secondary), hexToOklch(seeds.accent)]
	const eligibleColors = chromaticColors.filter(color => clampChroma(color.c) >= NEAR_NEUTRAL_CHROMA_THRESHOLD)

	if (eligibleColors.length === 0) {
		return normalizeHue(260)
	}

	const strongestColor = eligibleColors.reduce((best, current) =>
		clampChroma(current.c) > clampChroma(best.c) ? current : best
	)

	return normalizeHue(strongestColor.h)
}
