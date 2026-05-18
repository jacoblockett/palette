import { MODE_DARK, MODE_LIGHT } from "../defaults.js"
import { clampChroma, clampLightness, normalizeHue, oklchToHex } from "../color/oklch.js"

function toneFromLightness(lightness) {
	return Math.round(clampLightness(lightness) * 100)
}

function toneDistance(first, second) {
	return Math.abs(first - second)
}

function getAxisCharacter(contrastSpan, neutralTint) {
	if (contrastSpan >= 86) {
		return "stark"
	}

	if (contrastSpan <= 68) {
		return "soft"
	}

	if (neutralTint >= 0.025) {
		return "tinted"
	}

	return "balanced"
}

export function getAxisRoleAnchorTone({ axis, role }) {
	const normalizedSpan = Math.min(1, Math.max(0, axis.contrastSpan / 100))
	const basePresence = 0.62 + normalizedSpan * 0.18
	let presence = basePresence

	if (role === "secondary") {
		presence = basePresence - 0.08
	} else if (role === "accent") {
		presence = basePresence + 0.06
	} else if (role !== "primary") {
		throw new TypeError('Expected role to be "primary", "secondary", or "accent"')
	}

	presence = Math.min(0.88, Math.max(0.42, presence))

	const tone = axis.backgroundTone + (axis.textTone - axis.backgroundTone) * presence

	return Math.min(100, Math.max(0, tone))
}

export function getAxisRoleChromaScale({ axis, role }) {
	let scale = 1

	if (role === "secondary") {
		scale -= 0.16
	} else if (role === "accent") {
		scale += 0.08
	} else if (role !== "primary") {
		throw new TypeError('Expected role to be "primary", "secondary", or "accent"')
	}

	if (axis.axisCharacter === "soft") {
		scale -= 0.08
	} else if (axis.axisCharacter === "stark") {
		scale += 0.04
	} else if (axis.axisCharacter === "tinted") {
		scale -= 0.04
	}

	return Math.min(1.14, Math.max(0.68, scale))
}

export function createTonalAxis({ mode, neutral, base }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	const backgroundSource = base
	const textSource = neutral

	const backgroundTone = Math.min(
		100,
		Math.max(
			0,
			mode === MODE_LIGHT
				? Math.max(toneFromLightness(backgroundSource.l), 94)
				: Math.min(toneFromLightness(backgroundSource.l), 12)
		)
	)
	const textTone = Math.min(
		100,
		Math.max(
			0,
			mode === MODE_LIGHT
				? Math.min(toneFromLightness(textSource.l), 24)
				: Math.max(toneFromLightness(textSource.l), 88)
		)
	)
	const contrastSpan = toneDistance(textTone, backgroundTone)
	const axis = {
		mode,
		backgroundTone,
		textTone,
		surfaceTone: mode === MODE_LIGHT ? Math.min(98, backgroundTone) : Math.max(6, backgroundTone),
		raisedSurfaceTone: mode === MODE_LIGHT ? Math.min(100, backgroundTone + 2) : Math.max(10, backgroundTone + 4),
		sunkenSurfaceTone: mode === MODE_LIGHT ? Math.max(90, backgroundTone - 4) : Math.min(4, backgroundTone - 2),
		contrastSpan,
		polarity: mode === MODE_LIGHT ? "dark-on-light" : "light-on-dark",
		modeDirection: mode === MODE_LIGHT ? -1 : 1,
		neutralTint: Math.max(textSource.c, backgroundSource.c),
		axisCharacter: getAxisCharacter(contrastSpan, Math.max(textSource.c, backgroundSource.c))
	}

	axis.roleAnchorTones = {
		primary: getAxisRoleAnchorTone({ axis, role: "primary" }),
		secondary: getAxisRoleAnchorTone({ axis, role: "secondary" }),
		accent: getAxisRoleAnchorTone({ axis, role: "accent" })
	}
	axis.roleChromaScales = {
		primary: getAxisRoleChromaScale({ axis, role: "primary" }),
		secondary: getAxisRoleChromaScale({ axis, role: "secondary" }),
		accent: getAxisRoleChromaScale({ axis, role: "accent" })
	}

	return axis
}

export function createModeTonalAxes({ identity }) {
	return {
		light: createTonalAxis({ mode: MODE_LIGHT, neutral: identity.neutral, base: identity.base }),
		dark: createTonalAxis({ mode: MODE_DARK, neutral: identity.neutral, base: identity.base })
	}
}

export function renderAxisColor({ tone, source, maxChroma }) {
	return oklchToHex({
		l: clampLightness(tone / 100),
		c: Math.min(clampChroma(source.c), clampChroma(maxChroma)),
		h: normalizeHue(source.h)
	})
}
