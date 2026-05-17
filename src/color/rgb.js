import { normalizeHex } from "./normalize.js"

export function clampRgbChannel(value) {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new TypeError("Expected a finite numeric RGB channel value")
	}

	return Math.min(255, Math.max(0, Math.round(value)))
}

export function hexToRgb(hex) {
	const normalizedHex = normalizeHex(hex)

	return {
		r: Number.parseInt(normalizedHex.slice(1, 3), 16),
		g: Number.parseInt(normalizedHex.slice(3, 5), 16),
		b: Number.parseInt(normalizedHex.slice(5, 7), 16)
	}
}

export function rgbToHex(value) {
	if (value === null || Array.isArray(value) || typeof value !== "object") {
		throw new TypeError("Expected an RGB object")
	}

	if (!("r" in value) || !("g" in value) || !("b" in value)) {
		throw new TypeError("Expected r, g, and b channel values")
	}

	const r = clampRgbChannel(value.r)
	const g = clampRgbChannel(value.g)
	const b = clampRgbChannel(value.b)

	return `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`
}

function toHexChannel(value) {
	return value.toString(16).padStart(2, "0")
}
