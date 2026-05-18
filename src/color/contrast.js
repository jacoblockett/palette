import { hexToRgb } from "./rgb.js"

export function linearizeContrastChannel(channel) {
	if (typeof channel !== "number" || !Number.isFinite(channel)) {
		throw new TypeError("Expected a finite numeric RGB channel value")
	}

	const value = channel / 255

	if (value <= 0.04045) {
		return value / 12.92
	}

	return ((value + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex) {
	const { r, g, b } = hexToRgb(hex)

	return (
		0.2126 * linearizeContrastChannel(r) + 0.7152 * linearizeContrastChannel(g) + 0.0722 * linearizeContrastChannel(b)
	)
}

export function contrastRatio(foreground, background) {
	const foregroundLuminance = relativeLuminance(foreground)
	const backgroundLuminance = relativeLuminance(background)
	const lighter = Math.max(foregroundLuminance, backgroundLuminance)
	const darker = Math.min(foregroundLuminance, backgroundLuminance)

	return (lighter + 0.05) / (darker + 0.05)
}

export function readableForeground(background, candidates) {
	if (!Array.isArray(candidates) || candidates.length === 0) {
		throw new TypeError("Expected a non-empty candidates array")
	}

	let bestCandidate = candidates[0]
	let bestRatio = -Infinity

	for (const candidate of candidates) {
		const ratio = contrastRatio(candidate, background)

		if (ratio > bestRatio) {
			bestCandidate = candidate
			bestRatio = ratio
		}
	}

	return bestCandidate
}

export function meetsContrast(foreground, background, minimumRatio) {
	return contrastRatio(foreground, background) >= minimumRatio
}

export function createContrastCache() {
	const cache = new Map()

	return {
		ratio(foreground, background) {
			const key = createCacheKey(foreground, background)

			if (!cache.has(key)) {
				cache.set(key, contrastRatio(foreground, background))
			}

			return cache.get(key)
		}
	}
}

function createCacheKey(foreground, background) {
	return [serializeHexColor(foreground), serializeHexColor(background)].sort().join(":")
}

function serializeHexColor(hex) {
	const { r, g, b } = hexToRgb(hex)

	return `${r},${g},${b}`
}
