import { hexToRgb, rgbToHex } from "./rgb.js"

export function srgbChannelToLinear(channel) {
	if (typeof channel !== "number" || !Number.isFinite(channel)) {
		throw new TypeError("Expected a finite numeric sRGB channel value")
	}

	const value = channel / 255

	if (value <= 0.04045) {
		return value / 12.92
	}

	return ((value + 0.055) / 1.055) ** 2.4
}

export function linearChannelToSrgb(channel) {
	if (typeof channel !== "number" || !Number.isFinite(channel)) {
		throw new TypeError("Expected a finite numeric linear RGB channel value")
	}

	const value = Math.min(1, Math.max(0, channel))

	return convertLinearChannelToSrgb(value)
}

function convertLinearChannelToSrgb(channel) {
	if (channel <= 0.0031308) {
		return channel * 12.92 * 255
	}

	return (1.055 * channel ** (1 / 2.4) - 0.055) * 255
}

function oklabToUnclippedSrgb(oklab) {
	const l = oklab.l + 0.3963377774 * oklab.a + 0.2158037573 * oklab.b
	const m = oklab.l - 0.1055613458 * oklab.a - 0.0638541728 * oklab.b
	const s = oklab.l - 0.0894841775 * oklab.a - 1.291485548 * oklab.b

	const l3 = l ** 3
	const m3 = m ** 3
	const s3 = s ** 3

	return {
		r: convertLinearChannelToSrgb(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3),
		g: convertLinearChannelToSrgb(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3),
		b: convertLinearChannelToSrgb(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3)
	}
}

function isOklchInSrgbGamut(oklch) {
	const rgb = oklabToUnclippedSrgb(oklchToOklab(oklch))

	return rgb.r >= 0 && rgb.r <= 255 && rgb.g >= 0 && rgb.g <= 255 && rgb.b >= 0 && rgb.b <= 255
}

export function rgbToOklab(rgb) {
	const r = srgbChannelToLinear(rgb.r)
	const g = srgbChannelToLinear(rgb.g)
	const b = srgbChannelToLinear(rgb.b)

	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

	return {
		l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
		a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
		b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
	}
}

export function oklabToRgb(oklab) {
	const rgb = oklabToUnclippedSrgb(oklab)

	return {
		r: Math.min(255, Math.max(0, rgb.r)),
		g: Math.min(255, Math.max(0, rgb.g)),
		b: Math.min(255, Math.max(0, rgb.b))
	}
}

export function oklabToOklch(oklab) {
	const chroma = Math.sqrt(oklab.a * oklab.a + oklab.b * oklab.b)
	const hue = chroma === 0 ? 0 : normalizeHue((Math.atan2(oklab.b, oklab.a) * 180) / Math.PI)

	return {
		l: oklab.l,
		c: chroma,
		h: hue
	}
}

export function oklchToOklab(oklch) {
	const radians = (oklch.h * Math.PI) / 180

	return {
		l: oklch.l,
		a: oklch.c * Math.cos(radians),
		b: oklch.c * Math.sin(radians)
	}
}

export function rgbToOklch(rgb) {
	return oklabToOklch(rgbToOklab(rgb))
}

export function oklchToRgb(oklch) {
	return oklabToRgb(oklchToOklab(oklch))
}

export function hexToOklch(hex) {
	return rgbToOklch(hexToRgb(hex))
}

export function mapOklchToSrgbGamut(oklch) {
	const normalized = {
		l: clampLightness(oklch.l),
		c: clampChroma(oklch.c),
		h: normalizeHue(oklch.h)
	}

	if (isOklchInSrgbGamut(normalized)) {
		return normalized
	}

	if (normalized.c === 0) {
		return {
			l: normalized.l,
			c: 0,
			h: normalized.h
		}
	}

	let low = 0
	let high = normalized.c
	let best = 0

	for (let index = 0; index < 24; index += 1) {
		const mid = (low + high) / 2
		const candidate = {
			l: normalized.l,
			c: mid,
			h: normalized.h
		}

		if (isOklchInSrgbGamut(candidate)) {
			best = mid
			low = mid
			continue
		}

		high = mid
	}

	return {
		l: normalized.l,
		c: best,
		h: normalized.h
	}
}

export function oklchToHex(oklch) {
	return rgbToHex(oklabToRgb(oklchToOklab(mapOklchToSrgbGamut(oklch))))
}

export function normalizeHue(hue) {
	if (typeof hue !== "number" || !Number.isFinite(hue)) {
		throw new TypeError("Expected a finite numeric hue value")
	}

	return ((hue % 360) + 360) % 360
}

export function clampLightness(lightness) {
	if (typeof lightness !== "number" || !Number.isFinite(lightness)) {
		throw new TypeError("Expected a finite numeric lightness value")
	}

	return Math.min(1, Math.max(0, lightness))
}

export function clampChroma(chroma) {
	if (typeof chroma !== "number" || !Number.isFinite(chroma)) {
		throw new TypeError("Expected a finite numeric chroma value")
	}

	return Math.max(0, chroma)
}

export function withLightness(oklch, lightness) {
	return {
		l: lightness,
		c: oklch.c,
		h: oklch.h
	}
}

export function withChroma(oklch, chroma) {
	return {
		l: oklch.l,
		c: chroma,
		h: oklch.h
	}
}

export function withHue(oklch, hue) {
	return {
		l: oklch.l,
		c: oklch.c,
		h: hue
	}
}

export function shiftLightness(oklch, delta) {
	return {
		l: oklch.l + delta,
		c: oklch.c,
		h: oklch.h
	}
}

export function shiftChroma(oklch, delta) {
	return {
		l: oklch.l,
		c: oklch.c + delta,
		h: oklch.h
	}
}

export function shiftHue(oklch, delta) {
	return {
		l: oklch.l,
		c: oklch.c,
		h: oklch.h + delta
	}
}
