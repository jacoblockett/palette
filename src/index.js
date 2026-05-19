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
const ROLE_KEYS = ["text", "background", "primary", "secondary", "accent"]

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
const CHROMATIC_NON_WCAG_MINIMUM_CONTRAST = 3
const SHADE_STOPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
const SHADE_MINIMUM_CONTRAST = 1.05
const SHADE_STRONG_CONTRAST_PROGRESS = 0.35

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

function normalizeHexSeed(hex) {
	if (typeof hex !== "string" || !/^#?[0-9a-fA-F]{6}$/.test(hex)) {
		throw new RangeError("palette seed values must be 6-digit hex colors.")
	}

	const normalized = hex.startsWith("#") ? hex.slice(1) : hex

	return `#${normalized.toLowerCase()}`
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

function decodeSrgbChannel(channel) {
	return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
}

function hexToLinearSrgb(hex) {
	const normalizedHex = normalizeHexSeed(hex)
	const r = parseInt(normalizedHex.slice(1, 3), 16) / 255
	const g = parseInt(normalizedHex.slice(3, 5), 16) / 255
	const b = parseInt(normalizedHex.slice(5, 7), 16) / 255

	return {
		r: decodeSrgbChannel(r),
		g: decodeSrgbChannel(g),
		b: decodeSrgbChannel(b)
	}
}

function linearSrgbToOklab({ r, g, b }) {
	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

	return {
		l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
		a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
		b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
	}
}

function oklabToOklch({ l, a, b }) {
	const c = Math.sqrt(a * a + b * b)

	return {
		l,
		c,
		h: c < 0.000001 ? 0 : wrapHue((Math.atan2(b, a) * 180) / Math.PI)
	}
}

function hexToOklch(hex) {
	return oklabToOklch(linearSrgbToOklab(hexToLinearSrgb(normalizeHexSeed(hex))))
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

function safeDivide(numerator, denominator) {
	return denominator === 0 ? 0 : numerator / denominator
}

function normalizeSeeds(seeds) {
	if (seeds === undefined || seeds === null) {
		return {}
	}

	if (typeof seeds !== "object" || Array.isArray(seeds)) {
		throw new TypeError("palette seeds must be an object.")
	}

	const normalizedSeeds = {}

	for (const role of ROLE_KEYS) {
		if (seeds[role] === undefined) {
			continue
		}

		const hex = normalizeHexSeed(seeds[role])

		normalizedSeeds[role] = {
			hex,
			oklch: hexToOklch(hex)
		}
	}

	return normalizedSeeds
}

function createSeedLockMap(normalizedSeeds) {
	return Object.fromEntries(ROLE_KEYS.map(role => [role, normalizedSeeds[role] !== undefined]))
}

function hasSeedValues(normalizedSeeds) {
	return ROLE_KEYS.some(role => normalizedSeeds[role] !== undefined)
}

function findColorByContrast(baseOklch, backgroundOklch, targetContrast, lightnessRange) {
	const [minLightness, maxLightness] = lightnessRange
	let bestCandidate = null
	let bestScore = Number.POSITIVE_INFINITY
	let bestLightnessDistance = Number.POSITIVE_INFINITY
	let bestChromaDistance = Number.POSITIVE_INFINITY
	let low = minLightness
	let high = maxLightness

	const evaluateCandidate = lightness => {
		const candidate = gamutMapOklch({
			l: lightness,
			c: baseOklch.c,
			h: baseOklch.h
		})
		const score = Math.abs(wcagContrast(candidate.oklch, backgroundOklch) - targetContrast)
		const lightnessDistance = Math.abs(candidate.oklch.l - baseOklch.l)
		const chromaDistance = Math.abs(candidate.oklch.c - baseOklch.c)

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

		return wcagContrast(candidate.oklch, backgroundOklch)
	}

	const minContrast = evaluateCandidate(minLightness)
	const maxContrast = evaluateCandidate(maxLightness)
	const contrastIncreasesWithLightness = maxContrast >= minContrast

	for (let index = 0; index < 24; index += 1) {
		const midpoint = (low + high) / 2
		const midpointContrast = evaluateCandidate(midpoint)

		if (midpointContrast < targetContrast) {
			if (contrastIncreasesWithLightness) {
				low = midpoint
			} else {
				high = midpoint
			}
		} else if (contrastIncreasesWithLightness) {
			high = midpoint
		} else {
			low = midpoint
		}
	}

	return bestCandidate
}

function getSoftShadeLightnessRange(baseOklch, backgroundOklch) {
	return baseOklch.l >= backgroundOklch.l ? [backgroundOklch.l, baseOklch.l] : [baseOklch.l, backgroundOklch.l]
}

function getStrongShadeLightnessRange(baseOklch, backgroundOklch) {
	return baseOklch.l >= backgroundOklch.l ? [baseOklch.l, 0.98] : [0.02, baseOklch.l]
}

function getStrongShadeTargetContrast(baseContrast) {
	return baseContrast + (21 - baseContrast) * SHADE_STRONG_CONTRAST_PROGRESS
}

function generateRoleShadeScale(roleOklch, backgroundOklch) {
	const baseContrast = wcagContrast(roleOklch, backgroundOklch)
	const softAnchor = findColorByContrast(
		roleOklch,
		backgroundOklch,
		SHADE_MINIMUM_CONTRAST,
		getSoftShadeLightnessRange(roleOklch, backgroundOklch)
	)
	const strongAnchor = findColorByContrast(
		roleOklch,
		backgroundOklch,
		getStrongShadeTargetContrast(baseContrast),
		getStrongShadeLightnessRange(roleOklch, backgroundOklch)
	)
	const shades = {}

	for (const percent of SHADE_STOPS) {
		const key = String(percent)

		if (percent === 100) {
			shades[key] = oklchToHex(roleOklch)
			continue
		}

		const amount = percent < 100 ? (percent - 10) / 90 : (percent - 100) / 100
		const interpolated =
			percent < 100
				? interpolateOklch(softAnchor.oklch, roleOklch, amount)
				: interpolateOklch(roleOklch, strongAnchor.oklch, amount)

		shades[key] = gamutMapOklch(interpolated).hex
	}

	return shades
}

function interpolate(start, end, amount) {
	return start + (end - start) * amount
}

function interpolateOklch(startOklch, endOklch, amount) {
	return {
		l: interpolate(startOklch.l, endOklch.l, amount),
		c: interpolate(startOklch.c, endOklch.c, amount),
		h: startOklch.h
	}
}

function generateBackgroundShadeScale(backgroundOklch, mode) {
	const lowAnchor = mode === "light" ? 0.995 : 0.02
	const highAnchor =
		mode === "light" ? Math.max(0.72, backgroundOklch.l - 0.18) : Math.min(0.34, backgroundOklch.l + 0.18)
	const shades = {}

	for (const percent of SHADE_STOPS) {
		const key = String(percent)

		if (percent === 100) {
			shades[key] = oklchToHex(backgroundOklch)
			continue
		}

		const amount = percent < 100 ? percent / 100 : (percent - 100) / 100
		const candidate = gamutMapOklch({
			l:
				percent < 100
					? interpolate(lowAnchor, backgroundOklch.l, amount)
					: interpolate(backgroundOklch.l, highAnchor, amount),
			c: backgroundOklch.c,
			h: backgroundOklch.h
		})

		shades[key] = candidate.hex
	}

	return shades
}

function inverseWithinRange(value, sourceMin, sourceMax, targetMin, targetMax) {
	const normalized = getNormalizedRangePosition(value, sourceMin, sourceMax)
	const inverted = 1 - normalized

	return targetMin + inverted * (targetMax - targetMin)
}

function projectWithinRange(value, sourceMin, sourceMax, targetMin, targetMax) {
	const normalized = getNormalizedRangePosition(value, sourceMin, sourceMax)

	return targetMin + normalized * (targetMax - targetMin)
}

function getNormalizedRangePosition(value, min, max) {
	return clamp(safeDivide(value - min, max - min), 0, 1)
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

function sampleChromaticRoles(mode, scheme, basePrimaryHue) {
	let primaryHue = typeof basePrimaryHue === "number" ? basePrimaryHue : randomHue()
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
		if (typeof basePrimaryHue !== "number") {
			primaryHue = sampleWarmHue()
		}
		secondaryHue = sampleWarmHue()
		accentHue = sampleWarmHue()
	} else if (scheme === "cool") {
		if (typeof basePrimaryHue !== "number") {
			primaryHue = sampleCoolHue()
		}
		secondaryHue = sampleCoolHue()
		accentHue = sampleCoolHue()
	} else if (scheme === "earth") {
		if (typeof basePrimaryHue !== "number") {
			primaryHue = sampleEarthHue()
		}
		secondaryHue = sampleEarthHue()
		accentHue = sampleEarthHue()
	} else if (scheme === "pastel") {
		secondaryHue = randomHue()
		accentHue = randomHue()
	} else if (scheme === "neon") {
		secondaryHue = randomHue()
		accentHue = randomHue()
	} else if (scheme === "jewel") {
		if (typeof basePrimaryHue !== "number") {
			primaryHue = sampleJewelHue()
		}
		secondaryHue = sampleJewelHue()
		accentHue = sampleJewelHue()
	} else if (scheme === "brand-status") {
		if (typeof basePrimaryHue !== "number") {
			primaryHue = sampleBrandStatusHue()
		}
		secondaryHue = sampleSuccessHue()
		accentHue = sampleWarningHue()
	} else if (scheme === "enterprise") {
		if (typeof basePrimaryHue !== "number") {
			primaryHue = sampleEnterpriseHue()
		}
		secondaryHue = sampleEnterpriseHue()
		accentHue = sampleEnterpriseHue()
	} else if (scheme === "luxury") {
		if (typeof basePrimaryHue !== "number") {
			primaryHue = sampleLuxuryHue()
		}
		secondaryHue = sampleLuxuryHue()
		accentHue = sampleLuxuryHue()
	} else if (scheme === "muted") {
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

function mapSeededRole(seed) {
	return {
		hex: seed.hex,
		oklch: seed.oklch
	}
}

function getRoleProjectedLightness(sourceOklch, role, sourceMode, targetMode) {
	const sourceRange = ROLE_RANGES[sourceMode][role]
	const targetRange = ROLE_RANGES[targetMode][role]

	return inverseWithinRange(sourceOklch.l, sourceRange.l[0], sourceRange.l[1], targetRange.l[0], targetRange.l[1])
}

function getRoleProjectedChroma(sourceOklch, role, sourceMode, targetMode) {
	const sourceRange = ROLE_RANGES[sourceMode][role]
	const targetRange = ROLE_RANGES[targetMode][role]

	return projectWithinRange(sourceOklch.c, sourceRange.c[0], sourceRange.c[1], targetRange.c[0], targetRange.c[1])
}

function getTargetChromaticPolarityRange(role, targetMode, targetBackgroundOklch) {
	const roleRange = ROLE_RANGES[targetMode][role]
	const polarityRange = [...roleRange.l]

	if (targetMode === "light") {
		polarityRange[1] = Math.min(roleRange.l[1], targetBackgroundOklch.l - 0.08)
	} else {
		polarityRange[0] = Math.max(roleRange.l[0], targetBackgroundOklch.l + 0.08)
	}

	if (polarityRange[0] >= polarityRange[1]) {
		return [...roleRange.l]
	}

	return polarityRange
}

function isYellowGreenHue(hue) {
	const wrappedHue = wrapHue(hue)

	return wrappedHue >= 45 && wrappedHue <= 115
}

function isDeepBluePurpleHue(hue) {
	const wrappedHue = wrapHue(hue)

	return wrappedHue >= 235 && wrappedHue <= 305
}

function shapeProjectedChromaForTargetMode(chroma, hue, role, targetMode) {
	if (targetMode === "light") {
		return chroma
	}

	let shapedChroma = chroma

	if (isYellowGreenHue(hue)) {
		shapedChroma *= 0.86
	} else if (isDeepBluePurpleHue(hue)) {
		shapedChroma *= 1.04
	}

	if (role === "accent") {
		shapedChroma *= 1.03
	}

	const chromaRange = ROLE_RANGES[targetMode][role].c

	return clamp(shapedChroma, chromaRange[0], chromaRange[1])
}

function adaptChromaticRoleForMode(sourceOklch, targetBackgroundOklch, activeWcag, role, sourceMode, targetMode) {
	const projectedLightness = getRoleProjectedLightness(sourceOklch, role, sourceMode, targetMode)
	const projectedChroma = shapeProjectedChromaForTargetMode(
		getRoleProjectedChroma(sourceOklch, role, sourceMode, targetMode),
		sourceOklch.h,
		role,
		targetMode
	)
	const polarityRange = getTargetChromaticPolarityRange(role, targetMode, targetBackgroundOklch)
	const projected = gamutMapOklch({
		l: clamp(projectedLightness, polarityRange[0], polarityRange[1]),
		c: projectedChroma,
		h: sourceOklch.h
	})
	const requiredContrast = activeWcag ? WCAG_MINIMUM_CONTRAST : CHROMATIC_NON_WCAG_MINIMUM_CONTRAST
	const projectedContrast = wcagContrast(projected.oklch, targetBackgroundOklch)

	if (projectedContrast >= requiredContrast) {
		return projected
	}

	const repairMinLightness = targetMode === "light" ? polarityRange[0] : projected.oklch.l
	const repairMaxLightness = targetMode === "light" ? projected.oklch.l : polarityRange[1]
	let bestPassingRecord = null
	let bestFallbackRecord = null

	for (let index = 0; index <= 400; index += 1) {
		const progress = index / 400
		const lightness =
			targetMode === "light"
				? projected.oklch.l - (projected.oklch.l - repairMinLightness) * progress
				: projected.oklch.l + (repairMaxLightness - projected.oklch.l) * progress

		for (const chromaMultiplier of [1, 0.96, 0.92, 0.88, 0.84, 0.78, 0.72, 0.66]) {
			const candidate = gamutMapOklch({
				l: lightness,
				c: projected.oklch.c * chromaMultiplier,
				h: projected.oklch.h
			})
			const contrast = wcagContrast(candidate.oklch, targetBackgroundOklch)
			const identityDistance = oklabDistance(candidate.oklch, projected.oklch)
			const chromaLoss = Math.max(0, projected.oklch.c - candidate.oklch.c)
			const lightnessMovement = Math.abs(candidate.oklch.l - projected.oklch.l)
			const score = identityDistance * 1 + chromaLoss * 0.35 + lightnessMovement * 0.25
			const record = {
				candidate,
				contrast,
				score
			}

			if (contrast >= requiredContrast) {
				if (bestPassingRecord === null || score < bestPassingRecord.score) {
					bestPassingRecord = record
				}
				continue
			}

			if (
				bestFallbackRecord === null ||
				contrast > bestFallbackRecord.contrast ||
				(contrast === bestFallbackRecord.contrast && score < bestFallbackRecord.score)
			) {
				bestFallbackRecord = record
			}
		}
	}

	if (bestPassingRecord !== null) {
		return bestPassingRecord.candidate
	}

	return bestFallbackRecord === null ? projected : bestFallbackRecord.candidate
}

function deriveRoleForMode(sourceOklch, role, sourceMode, targetMode, targetBackgroundOklch, activeWcag) {
	if (isChromaticRole(role)) {
		return adaptChromaticRoleForMode(sourceOklch, targetBackgroundOklch, activeWcag, role, sourceMode, targetMode)
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

function isRejectedCandidate(mode, candidate, scheme, seedLocks) {
	const minimumChroma = MIN_CHROMA_BY_SCHEME[scheme] ?? MIN_CHROMA_BY_SCHEME.default

	if (mode === "light" && candidate.text.oklch.l >= candidate.background.oklch.l) {
		return true
	}

	if (mode === "dark" && candidate.text.oklch.l <= candidate.background.oklch.l) {
		return true
	}

	if (!seedLocks.primary && candidate.primary.oklch.c < minimumChroma.primary) {
		return true
	}

	if (!seedLocks.secondary && candidate.secondary.oklch.c < minimumChroma.secondary) {
		return true
	}

	if (!seedLocks.accent && candidate.accent.oklch.c < minimumChroma.accent) {
		return true
	}

	if (
		!seedLocks.primary &&
		!seedLocks.secondary &&
		oklabDistance(candidate.primary.oklch, candidate.secondary.oklch) < 0.075
	) {
		return true
	}

	if (
		!seedLocks.primary &&
		!seedLocks.accent &&
		oklabDistance(candidate.primary.oklch, candidate.accent.oklch) < 0.075
	) {
		return true
	}

	if (
		!seedLocks.secondary &&
		!seedLocks.accent &&
		oklabDistance(candidate.secondary.oklch, candidate.accent.oklch) < 0.075
	) {
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

function toPublicPalette(candidate, mode, includeShades) {
	const publicPalette = {
		text: candidate.text.hex,
		background: candidate.background.hex,
		primary: candidate.primary.hex,
		secondary: candidate.secondary.hex,
		accent: candidate.accent.hex
	}

	if (!includeShades) {
		return publicPalette
	}

	return {
		...publicPalette,
		shades: {
			text: generateRoleShadeScale(candidate.text.oklch, candidate.background.oklch),
			background: generateBackgroundShadeScale(candidate.background.oklch, mode),
			primary: generateRoleShadeScale(candidate.primary.oklch, candidate.background.oklch),
			secondary: generateRoleShadeScale(candidate.secondary.oklch, candidate.background.oklch),
			accent: generateRoleShadeScale(candidate.accent.oklch, candidate.background.oklch)
		}
	}
}

function palette(options = {}) {
	const { mode, seeds, scheme, wcag, shades } = options
	const activeSeeds = normalizeSeeds(seeds)
	const activeHasSeeds = hasSeedValues(activeSeeds)

	if (mode === undefined && activeHasSeeds) {
		throw new TypeError("palette requires a mode of light or dark when seeds are provided.")
	}

	const sourceMode = mode === undefined ? "light" : mode

	if (sourceMode !== "light" && sourceMode !== "dark") {
		throw new RangeError("palette mode must be light or dark.")
	}

	const activeScheme = normalizeScheme(scheme)
	const activeSeedLocks = createSeedLockMap(activeSeeds)
	const activeWcag = Boolean(wcag)
	const activeShades = Boolean(shades)
	const oppositeMode = sourceMode === "light" ? "dark" : "light"

	for (let index = 0; index < 2000; index += 1) {
		const chromaticRoles = sampleChromaticRoles(sourceMode, activeScheme, activeSeeds.primary?.oklch.h)
		const sourcePrimary = activeSeeds.primary
			? mapSeededRole(activeSeeds.primary)
			: mapSampledRole(chromaticRoles.primary)
		const sampledCandidate = {
			primary: sourcePrimary,
			text: activeSeeds.text
				? mapSeededRole(activeSeeds.text)
				: mapSampledRole(sampleRole(sourceMode, "text", sourcePrimary.oklch.h)),
			background: activeSeeds.background
				? mapSeededRole(activeSeeds.background)
				: mapSampledRole(sampleRole(sourceMode, "background", sourcePrimary.oklch.h)),
			secondary: activeSeeds.secondary
				? mapSeededRole(activeSeeds.secondary)
				: mapSampledRole(chromaticRoles.secondary),
			accent: activeSeeds.accent ? mapSeededRole(activeSeeds.accent) : mapSampledRole(chromaticRoles.accent)
		}
		const derivedCandidate = {
			text: deriveRoleForMode(
				sampledCandidate.text.oklch,
				"text",
				sourceMode,
				oppositeMode,
				null,
				activeWcag
			),
			background: deriveRoleForMode(
				sampledCandidate.background.oklch,
				"background",
				sourceMode,
				oppositeMode,
				null,
				activeWcag
			)
		}
		derivedCandidate.primary = deriveRoleForMode(
			sampledCandidate.primary.oklch,
			"primary",
			sourceMode,
			oppositeMode,
			derivedCandidate.background.oklch,
			activeWcag
		)
		derivedCandidate.secondary = deriveRoleForMode(
			sampledCandidate.secondary.oklch,
			"secondary",
			sourceMode,
			oppositeMode,
			derivedCandidate.background.oklch,
			activeWcag
		)
		derivedCandidate.accent = deriveRoleForMode(
			sampledCandidate.accent.oklch,
			"accent",
			sourceMode,
			oppositeMode,
			derivedCandidate.background.oklch,
			activeWcag
		)
		const pairedCandidate =
			sourceMode === "light"
				? { light: sampledCandidate, dark: derivedCandidate }
				: { light: derivedCandidate, dark: sampledCandidate }

		if (
			isRejectedCandidate("light", pairedCandidate.light, activeScheme, activeSeedLocks) ||
			isRejectedCandidate("dark", pairedCandidate.dark, activeScheme, activeSeedLocks)
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
			light: toPublicPalette(pairedCandidate.light, "light", activeShades),
			dark: toPublicPalette(pairedCandidate.dark, "dark", activeShades)
		}
	}

	throw new Error("Unable to generate a semantic palette candidate.")
}

export default palette
