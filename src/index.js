const ROLE_RANGES = {
	light: {
		text: { l: [0.1, 0.26], c: [0.004, 0.03] },
		background: { l: [0.9, 0.985], c: [0.004, 0.03] },
		primary: { l: [0.34, 0.7], c: [0.06, 0.25] },
		secondary: { l: [0.36, 0.8], c: [0.025, 0.19] },
		accent: { l: [0.4, 0.86], c: [0.05, 0.27] }
	},
	dark: {
		text: { l: [0.78, 0.96], c: [0.004, 0.03] },
		background: { l: [0.055, 0.22], c: [0.004, 0.035] },
		primary: { l: [0.48, 0.86], c: [0.05, 0.23] },
		secondary: { l: [0.42, 0.84], c: [0.025, 0.18] },
		accent: { l: [0.48, 0.9], c: [0.05, 0.25] }
	}
}

const SUPPORTED_SCHEMES = [
	"random",
	"monochromatic",
	"analogous",
	"complementary",
	"split-complementary",
	"triadic",
	"compound",
	"double-split-complementary",
	"neutral-complementary",
	"accented-neutral",
	"achromatic",
	"warm",
	"cool",
	"muted",
	"earth",
	"pastel",
	"neon",
	"jewel",
	"brand-status",
	"enterprise",
	"luxury"
]

const DEFAULT_SCHEME = "random"

const CHROMATIC_LIGHTNESS_SEARCH_RANGES = {
	light: {
		primary: [0.08, 0.88],
		secondary: [0.08, 0.88],
		accent: [0.08, 0.9]
	},
	dark: {
		primary: [0.16, 0.96],
		secondary: [0.14, 0.94],
		accent: [0.16, 0.96]
	}
}

const MIN_CHROMA_BY_SCHEME = {
	default: {
		primary: 0.045,
		secondary: 0.022,
		accent: 0.045
	},
	"accented-neutral": {
		primary: 0.035,
		secondary: 0.01,
		accent: 0.045
	},
	"neutral-complementary": {
		primary: 0.035,
		secondary: 0.012,
		accent: 0.01
	},
	achromatic: {
		primary: 0.002,
		secondary: 0.002,
		accent: 0.002
	},
	earth: {
		primary: 0.025,
		secondary: 0.018,
		accent: 0.025
	},
	pastel: {
		primary: 0.025,
		secondary: 0.018,
		accent: 0.025
	},
	neon: {
		primary: 0.045,
		secondary: 0.035,
		accent: 0.045
	},
	jewel: {
		primary: 0.04,
		secondary: 0.03,
		accent: 0.04
	},
	muted: {
		primary: 0.025,
		secondary: 0.012,
		accent: 0.025
	},
	enterprise: {
		primary: 0.03,
		secondary: 0.018,
		accent: 0.03
	},
	luxury: {
		primary: 0.035,
		secondary: 0.018,
		accent: 0.035
	}
}

const WCAG_MINIMUM_CONTRAST = 4.5

function randomFloat(min, max) {
	return min + Math.random() * (max - min)
}

function randomHue() {
	return randomFloat(0, 360)
}

function randomSign() {
	return Math.random() < 0.5 ? -1 : 1
}

function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value))
}

function normalizeScheme(scheme) {
	if (scheme === undefined) {
		return DEFAULT_SCHEME
	}

	if (SUPPORTED_SCHEMES.includes(scheme)) {
		return scheme
	}

	throw new RangeError("palette scheme must be a supported scheme.")
}

function wrapHue(hue) {
	const wrapped = hue % 360

	return wrapped < 0 ? wrapped + 360 : wrapped
}

function shiftHue(hue, amount) {
	return wrapHue(hue + amount)
}

function randomFromRanges(ranges) {
	const [min, max] = ranges[Math.floor(Math.random() * ranges.length)]

	return randomFloat(min, max)
}

function sampleWarmHue() {
	return randomFromRanges([
		[0, 70],
		[330, 360]
	])
}

function sampleCoolHue() {
	return randomFromRanges([[155, 285]])
}

function sampleEarthHue() {
	return randomFromRanges([
		[25, 55],
		[65, 105],
		[105, 145],
		[330, 360]
	])
}

function sampleJewelHue() {
	return randomFromRanges([
		[135, 165],
		[210, 250],
		[275, 315],
		[335, 360],
		[0, 12]
	])
}

function sampleLuxuryHue() {
	return randomFromRanges([
		[32, 55],
		[265, 310],
		[335, 360],
		[0, 8]
	])
}

function sampleEnterpriseHue() {
	return randomFromRanges([
		[205, 245],
		[180, 215],
		[250, 275]
	])
}

function sampleBrandStatusHue() {
	return randomFromRanges([[205, 275]])
}

function sampleSuccessHue() {
	return randomFromRanges([[135, 165]])
}

function sampleWarningHue() {
	return randomFromRanges([[35, 75]])
}

function oklchToOklab({ l, c, h }) {
	const radians = (h * Math.PI) / 180

	return {
		l,
		a: c * Math.cos(radians),
		b: c * Math.sin(radians)
	}
}

function oklabToLinearSrgb({ l, a, b }) {
	const l_ = l + 0.3963377774 * a + 0.2158037573 * b
	const m_ = l - 0.1055613458 * a - 0.0638541728 * b
	const s_ = l - 0.0894841775 * a - 1.291485548 * b
	const l3 = l_ * l_ * l_
	const m3 = m_ * m_ * m_
	const s3 = s_ * s_ * s_

	return {
		r: 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
		g: -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
		b: -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3
	}
}

function isLinearSrgbInGamut({ r, g, b }) {
	return r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1
}

function encodeSrgbChannel(channel) {
	return channel <= 0.0031308 ? 12.92 * channel : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055
}

function channelToHex(channel) {
	const clamped = clamp(channel, 0, 1)
	const byte = Math.round(clamped * 255)

	return byte.toString(16).padStart(2, "0")
}

function oklchToHex(oklch) {
	const oklab = oklchToOklab(oklch)
	const linearSrgb = oklabToLinearSrgb(oklab)
	const encoded = {
		r: encodeSrgbChannel(linearSrgb.r),
		g: encodeSrgbChannel(linearSrgb.g),
		b: encodeSrgbChannel(linearSrgb.b)
	}

	return `#${channelToHex(encoded.r)}${channelToHex(encoded.g)}${channelToHex(encoded.b)}`
}

function gamutMapOklch(oklch) {
	const initialLinearSrgb = oklabToLinearSrgb(oklchToOklab(oklch))

	if (isLinearSrgbInGamut(initialLinearSrgb)) {
		return {
			oklch: { ...oklch },
			hex: oklchToHex(oklch)
		}
	}

	let low = 0
	let high = oklch.c
	let best = 0

	for (let index = 0; index < 24; index += 1) {
		const mid = (low + high) / 2
		const candidate = { l: oklch.l, c: mid, h: oklch.h }
		const linearSrgb = oklabToLinearSrgb(oklchToOklab(candidate))

		if (isLinearSrgbInGamut(linearSrgb)) {
			best = mid
			low = mid
		} else {
			high = mid
		}
	}

	const mapped = {
		l: oklch.l,
		c: best,
		h: oklch.h
	}

	return {
		oklch: mapped,
		hex: oklchToHex(mapped)
	}
}

function oklabDistance(colorA, colorB) {
	const first = oklchToOklab(colorA)
	const second = oklchToOklab(colorB)
	const deltaL = first.l - second.l
	const deltaA = first.a - second.a
	const deltaB = first.b - second.b

	return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB)
}

function relativeLuminanceFromOklch(oklch) {
	const linearSrgb = oklabToLinearSrgb(oklchToOklab(oklch))
	const r = clamp(linearSrgb.r, 0, 1)
	const g = clamp(linearSrgb.g, 0, 1)
	const b = clamp(linearSrgb.b, 0, 1)

	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function wcagContrast(firstOklch, secondOklch) {
	const firstLuminance = relativeLuminanceFromOklch(firstOklch) + 0.05
	const secondLuminance = relativeLuminanceFromOklch(secondOklch) + 0.05

	return Math.max(firstLuminance, secondLuminance) / Math.min(firstLuminance, secondLuminance)
}

function inverseWithinRange(value, sourceMin, sourceMax, targetMin, targetMax) {
	const normalized = clamp((value - sourceMin) / (sourceMax - sourceMin), 0, 1)
	const inverted = 1 - normalized

	return targetMin + inverted * (targetMax - targetMin)
}

function projectWithinRange(value, sourceMin, sourceMax, targetMin, targetMax) {
	const normalized = clamp((value - sourceMin) / (sourceMax - sourceMin), 0, 1)

	return targetMin + normalized * (targetMax - targetMin)
}

function isChromaticRole(role) {
	return role === "primary" || role === "secondary" || role === "accent"
}

function sampleRole(mode, role, hue) {
	const range = ROLE_RANGES[mode][role]

	return {
		l: randomFloat(range.l[0], range.l[1]),
		c: randomFloat(range.c[0], range.c[1]),
		h: hue
	}
}

function sampleRoleWithChroma(mode, role, hue, chromaRange) {
	const range = ROLE_RANGES[mode][role]
	const clampedChromaRange = clampChromaRange(mode, role, chromaRange)

	return {
		l: randomFloat(range.l[0], range.l[1]),
		c: randomFloat(clampedChromaRange[0], clampedChromaRange[1]),
		h: hue
	}
}

function clampChromaRange(mode, role, requestedRange) {
	const roleChromaRange = ROLE_RANGES[mode][role].c

	return [Math.max(roleChromaRange[0], requestedRange[0]), Math.min(roleChromaRange[1], requestedRange[1])]
}

function sampleChromaticRoles(mode, scheme) {
	let primaryHue = randomHue()
	let secondaryHue = randomHue()
	let accentHue = randomHue()

	if (scheme === "monochromatic") {
		secondaryHue = primaryHue
		accentHue = primaryHue
	} else if (scheme === "analogous") {
		const direction = randomSign()
		secondaryHue = shiftHue(primaryHue, direction * randomFloat(24, 52))
		accentHue = shiftHue(primaryHue, direction * randomFloat(-52, -24))
	} else if (scheme === "complementary") {
		const direction = randomSign()
		secondaryHue = shiftHue(primaryHue, 180)
		accentHue = shiftHue(primaryHue, direction * randomFloat(24, 44))
	} else if (scheme === "split-complementary") {
		const direction = randomSign()
		secondaryHue = shiftHue(primaryHue, direction * randomFloat(145, 165))
		accentHue = shiftHue(primaryHue, direction * randomFloat(195, 215))
	} else if (scheme === "triadic") {
		const direction = randomSign()
		secondaryHue = shiftHue(primaryHue, direction * 120)
		accentHue = shiftHue(primaryHue, direction * 240)
	} else if (scheme === "compound") {
		const direction = randomSign()
		secondaryHue = shiftHue(primaryHue, direction * randomFloat(150, 170))
		accentHue = shiftHue(primaryHue, direction * randomFloat(24, 44))
	} else if (scheme === "double-split-complementary") {
		const direction = randomSign()
		secondaryHue = shiftHue(primaryHue, direction * randomFloat(135, 155))
		accentHue = shiftHue(primaryHue, direction * randomFloat(205, 225))
	} else if (scheme === "neutral-complementary") {
		secondaryHue = shiftHue(primaryHue, 180)
		accentHue = shiftHue(primaryHue, randomFloat(-16, 16))
	} else if (scheme === "accented-neutral") {
		secondaryHue = shiftHue(primaryHue, randomFloat(-18, 18))
		accentHue = randomHue()
	} else if (scheme === "achromatic") {
		secondaryHue = primaryHue
		accentHue = primaryHue
	} else if (scheme === "warm") {
		primaryHue = sampleWarmHue()
		secondaryHue = sampleWarmHue()
		accentHue = sampleWarmHue()
	} else if (scheme === "cool") {
		primaryHue = sampleCoolHue()
		secondaryHue = sampleCoolHue()
		accentHue = sampleCoolHue()
	} else if (scheme === "earth") {
		primaryHue = sampleEarthHue()
		secondaryHue = sampleEarthHue()
		accentHue = sampleEarthHue()
	} else if (scheme === "pastel") {
		primaryHue = randomHue()
		secondaryHue = randomHue()
		accentHue = randomHue()
	} else if (scheme === "neon") {
		primaryHue = randomHue()
		secondaryHue = randomHue()
		accentHue = randomHue()
	} else if (scheme === "jewel") {
		primaryHue = sampleJewelHue()
		secondaryHue = sampleJewelHue()
		accentHue = sampleJewelHue()
	} else if (scheme === "brand-status") {
		primaryHue = sampleBrandStatusHue()
		secondaryHue = sampleSuccessHue()
		accentHue = sampleWarningHue()
	} else if (scheme === "enterprise") {
		primaryHue = sampleEnterpriseHue()
		secondaryHue = sampleEnterpriseHue()
		accentHue = sampleEnterpriseHue()
	} else if (scheme === "luxury") {
		primaryHue = sampleLuxuryHue()
		secondaryHue = sampleLuxuryHue()
		accentHue = sampleLuxuryHue()
	} else if (scheme === "muted") {
		primaryHue = randomHue()
		secondaryHue = randomHue()
		accentHue = randomHue()
	}

	if (scheme === "accented-neutral") {
		return {
			primary: sampleRole(mode, "primary", primaryHue),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.012, 0.07]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.06, ROLE_RANGES[mode].accent.c[1]])
		}
	}

	if (scheme === "achromatic") {
		return {
			primary: sampleRoleWithChroma(mode, "primary", primaryHue, [0.004, 0.018]),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.004, 0.016]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.004, 0.02])
		}
	}

	if (scheme === "neutral-complementary") {
		return {
			primary: sampleRole(mode, "primary", primaryHue),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.018, 0.095]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.012, 0.07])
		}
	}

	if (scheme === "earth") {
		return {
			primary: sampleRoleWithChroma(mode, "primary", primaryHue, [0.035, 0.13]),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.025, 0.105]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.04, 0.15])
		}
	}

	if (scheme === "pastel") {
		return {
			primary: sampleRoleWithChroma(mode, "primary", primaryHue, [0.035, 0.12]),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.025, 0.095]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.04, 0.13])
		}
	}

	if (scheme === "neon") {
		return {
			primary: sampleRoleWithChroma(mode, "primary", primaryHue, [0.16, 0.3]),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.12, 0.26]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.18, 0.32])
		}
	}

	if (scheme === "jewel") {
		return {
			primary: sampleRoleWithChroma(mode, "primary", primaryHue, [0.09, 0.22]),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.075, 0.19]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.1, 0.24])
		}
	}

	if (scheme === "brand-status") {
		return {
			primary: sampleRole(mode, "primary", primaryHue),
			secondary: sampleRole(mode, "secondary", secondaryHue),
			accent: sampleRole(mode, "accent", accentHue)
		}
	}

	if (scheme === "enterprise") {
		return {
			primary: sampleRoleWithChroma(mode, "primary", primaryHue, [0.045, 0.14]),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.025, 0.095]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.04, 0.13])
		}
	}

	if (scheme === "luxury") {
		return {
			primary: sampleRoleWithChroma(mode, "primary", primaryHue, [0.055, 0.17]),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.025, 0.105]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.065, 0.19])
		}
	}

	if (scheme === "muted") {
		return {
			primary: sampleRoleWithChroma(mode, "primary", primaryHue, [0.035, 0.12]),
			secondary: sampleRoleWithChroma(mode, "secondary", secondaryHue, [0.018, 0.09]),
			accent: sampleRoleWithChroma(mode, "accent", accentHue, [0.035, 0.13])
		}
	}

	return {
		primary: sampleRole(mode, "primary", primaryHue),
		secondary: sampleRole(mode, "secondary", secondaryHue),
		accent: sampleRole(mode, "accent", accentHue)
	}
}

function mapSampledRole(sampled) {
	const mapped = gamutMapOklch(sampled)

	return {
		oklch: mapped.oklch,
		hex: mapped.hex
	}
}

function deriveChromaticRoleByContrast(sourceOklch, role, targetMode, sourceBackgroundOklch, targetBackgroundOklch) {
	const sourceContrast = wcagContrast(sourceOklch, sourceBackgroundOklch)
	const [minLightness, maxLightness] = CHROMATIC_LIGHTNESS_SEARCH_RANGES[targetMode][role]
	let bestCandidate = null
	let bestScore = Number.POSITIVE_INFINITY
	let bestLightnessDistance = Number.POSITIVE_INFINITY
	let bestChromaDistance = Number.POSITIVE_INFINITY

	for (let index = 0; index <= 400; index += 1) {
		const lightness = minLightness + ((maxLightness - minLightness) * index) / 400
		const candidate = gamutMapOklch({
			l: lightness,
			c: sourceOklch.c,
			h: sourceOklch.h
		})
		const candidateContrast = wcagContrast(candidate.oklch, targetBackgroundOklch)
		const score = Math.abs(candidateContrast - sourceContrast)
		const lightnessDistance = Math.abs(candidate.oklch.l - sourceOklch.l)
		const chromaDistance = Math.abs(candidate.oklch.c - sourceOklch.c)

		if (
			score < bestScore ||
			(score === bestScore && lightnessDistance < bestLightnessDistance) ||
			(score === bestScore && lightnessDistance === bestLightnessDistance && chromaDistance < bestChromaDistance)
		) {
			bestCandidate = candidate
			bestScore = score
			bestLightnessDistance = lightnessDistance
			bestChromaDistance = chromaDistance
		}
	}

	return bestCandidate
}

function deriveRoleForMode(sourceOklch, role, sourceMode, targetMode, sourceBackgroundOklch, targetBackgroundOklch) {
	if (isChromaticRole(role)) {
		return deriveChromaticRoleByContrast(sourceOklch, role, targetMode, sourceBackgroundOklch, targetBackgroundOklch)
	}

	const sourceRange = ROLE_RANGES[sourceMode][role]
	const targetRange = ROLE_RANGES[targetMode][role]
	const inverted = {
		l: inverseWithinRange(sourceOklch.l, sourceRange.l[0], sourceRange.l[1], targetRange.l[0], targetRange.l[1]),
		c: projectWithinRange(sourceOklch.c, sourceRange.c[0], sourceRange.c[1], targetRange.c[0], targetRange.c[1]),
		h: sourceOklch.h
	}
	const mapped = gamutMapOklch(inverted)

	return {
		oklch: mapped.oklch,
		hex: mapped.hex
	}
}

function isRejectedCandidate(mode, candidate, scheme) {
	const minimumChroma = MIN_CHROMA_BY_SCHEME[scheme] ?? MIN_CHROMA_BY_SCHEME.default

	if (mode === "light" && candidate.text.oklch.l >= candidate.background.oklch.l) {
		return true
	}

	if (mode === "dark" && candidate.text.oklch.l <= candidate.background.oklch.l) {
		return true
	}

	if (candidate.primary.oklch.c < minimumChroma.primary) {
		return true
	}

	if (candidate.secondary.oklch.c < minimumChroma.secondary) {
		return true
	}

	if (candidate.accent.oklch.c < minimumChroma.accent) {
		return true
	}

	if (oklabDistance(candidate.primary.oklch, candidate.secondary.oklch) < 0.075) {
		return true
	}

	if (oklabDistance(candidate.primary.oklch, candidate.accent.oklch) < 0.075) {
		return true
	}

	if (oklabDistance(candidate.secondary.oklch, candidate.accent.oklch) < 0.075) {
		return true
	}

	return false
}

function isWcagCompliantCandidate(candidate) {
	return (
		wcagContrast(candidate.text.oklch, candidate.background.oklch) >= WCAG_MINIMUM_CONTRAST &&
		wcagContrast(candidate.primary.oklch, candidate.background.oklch) >= WCAG_MINIMUM_CONTRAST &&
		wcagContrast(candidate.secondary.oklch, candidate.background.oklch) >= WCAG_MINIMUM_CONTRAST &&
		wcagContrast(candidate.accent.oklch, candidate.background.oklch) >= WCAG_MINIMUM_CONTRAST
	)
}

function toPublicPalette(candidate) {
	return {
		text: candidate.text.hex,
		background: candidate.background.hex,
		primary: candidate.primary.hex,
		secondary: candidate.secondary.hex,
		accent: candidate.accent.hex
	}
}

export function palette(options = {}) {
	const { mode, seeds, scheme, wcag } = options

	void seeds

	if (mode === undefined) {
		throw new TypeError("palette requires a mode of light or dark.")
	}

	if (mode !== "light" && mode !== "dark") {
		throw new RangeError("palette mode must be light or dark.")
	}

	const activeScheme = normalizeScheme(scheme)
	const activeWcag = Boolean(wcag)
	const oppositeMode = mode === "light" ? "dark" : "light"

	for (let index = 0; index < 2000; index += 1) {
		const chromaticRoles = sampleChromaticRoles(mode, activeScheme)
		const sampledCandidate = {
			text: mapSampledRole(sampleRole(mode, "text", chromaticRoles.primary.h)),
			background: mapSampledRole(sampleRole(mode, "background", chromaticRoles.primary.h)),
			primary: mapSampledRole(chromaticRoles.primary),
			secondary: mapSampledRole(chromaticRoles.secondary),
			accent: mapSampledRole(chromaticRoles.accent)
		}
		const derivedCandidate = {
			text: deriveRoleForMode(
				sampledCandidate.text.oklch,
				"text",
				mode,
				oppositeMode,
				sampledCandidate.background.oklch,
				null
			),
			background: deriveRoleForMode(
				sampledCandidate.background.oklch,
				"background",
				mode,
				oppositeMode,
				sampledCandidate.background.oklch,
				null
			)
		}
		derivedCandidate.primary = deriveRoleForMode(
			sampledCandidate.primary.oklch,
			"primary",
			mode,
			oppositeMode,
			sampledCandidate.background.oklch,
			derivedCandidate.background.oklch
		)
		derivedCandidate.secondary = deriveRoleForMode(
			sampledCandidate.secondary.oklch,
			"secondary",
			mode,
			oppositeMode,
			sampledCandidate.background.oklch,
			derivedCandidate.background.oklch
		)
		derivedCandidate.accent = deriveRoleForMode(
			sampledCandidate.accent.oklch,
			"accent",
			mode,
			oppositeMode,
			sampledCandidate.background.oklch,
			derivedCandidate.background.oklch
		)
		const pairedCandidate =
			mode === "light"
				? { light: sampledCandidate, dark: derivedCandidate }
				: { light: derivedCandidate, dark: sampledCandidate }

		if (
			isRejectedCandidate("light", pairedCandidate.light, activeScheme) ||
			isRejectedCandidate("dark", pairedCandidate.dark, activeScheme)
		) {
			continue
		}

		if (
			activeWcag &&
			(!isWcagCompliantCandidate(pairedCandidate.light) || !isWcagCompliantCandidate(pairedCandidate.dark))
		) {
			continue
		}

		return {
			light: toPublicPalette(pairedCandidate.light),
			dark: toPublicPalette(pairedCandidate.dark)
		}
	}

	throw new Error("Unable to generate a semantic palette candidate.")
}

export default palette
