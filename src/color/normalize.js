const SHORT_HEX_PATTERN = /^#[\da-fA-F]{3}$/
const LONG_HEX_PATTERN = /^#[\da-fA-F]{6}$/

export function normalizeHex(value) {
	if (typeof value !== "string") {
		throw new TypeError("Expected a hex color string")
	}

	if (SHORT_HEX_PATTERN.test(value)) {
		const [, r, g, b] = value.toLowerCase()

		return `#${r}${r}${g}${g}${b}${b}`
	}

	if (LONG_HEX_PATTERN.test(value)) {
		return value.toLowerCase()
	}

	throw new TypeError("Expected a hex color in #rgb or #rrggbb format")
}
