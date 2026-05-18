function randomFloat(min, max) {
	return min + Math.random() * (max - min)
}

function randomHue() {
	return randomFloat(0, 360)
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
	const clamped = Math.min(1, Math.max(0, channel))
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

function sampleRole(mode, role, primaryHue) {
	if (role === "primary") {
		return mode === "light"
			? { l: randomFloat(0.34, 0.7), c: randomFloat(0.06, 0.25), h: randomHue() }
			: { l: randomFloat(0.48, 0.86), c: randomFloat(0.05, 0.23), h: randomHue() }
	}

	if (role === "text") {
		return mode === "light"
			? { l: randomFloat(0.1, 0.26), c: randomFloat(0.004, 0.03), h: primaryHue }
			: { l: randomFloat(0.78, 0.96), c: randomFloat(0.004, 0.03), h: primaryHue }
	}

	if (role === "background") {
		return mode === "light"
			? { l: randomFloat(0.9, 0.985), c: randomFloat(0.004, 0.03), h: primaryHue }
			: { l: randomFloat(0.055, 0.22), c: randomFloat(0.004, 0.035), h: primaryHue }
	}

	if (role === "secondary") {
		return mode === "light"
			? { l: randomFloat(0.36, 0.8), c: randomFloat(0.025, 0.19), h: randomHue() }
			: { l: randomFloat(0.42, 0.84), c: randomFloat(0.025, 0.18), h: randomHue() }
	}

	if (role === "accent") {
		return mode === "light"
			? { l: randomFloat(0.4, 0.86), c: randomFloat(0.05, 0.27), h: randomHue() }
			: { l: randomFloat(0.48, 0.9), c: randomFloat(0.05, 0.25), h: randomHue() }
	}

	throw new RangeError("Unknown role.")
}

function mapSampledRole(sampled) {
	const mapped = gamutMapOklch(sampled)

	return {
		oklch: mapped.oklch,
		hex: mapped.hex
	}
}

function isRejectedCandidate(mode, candidate) {
	if (mode === "light" && candidate.text.oklch.l >= candidate.background.oklch.l) {
		return true
	}

	if (mode === "dark" && candidate.text.oklch.l <= candidate.background.oklch.l) {
		return true
	}

	if (candidate.primary.oklch.c < 0.045) {
		return true
	}

	if (candidate.secondary.oklch.c < 0.022) {
		return true
	}

	if (candidate.accent.oklch.c < 0.045) {
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

export function palette(options = {}) {
	const { mode, seeds } = options

	void seeds

	if (mode === undefined) {
		throw new TypeError("palette requires a mode of light or dark.")
	}

	if (mode !== "light" && mode !== "dark") {
		throw new RangeError("palette mode must be light or dark.")
	}

	for (let index = 0; index < 500; index += 1) {
		const primarySample = sampleRole(mode, "primary")
		const candidate = {
			primary: mapSampledRole(primarySample),
			text: mapSampledRole(sampleRole(mode, "text", primarySample.h)),
			background: mapSampledRole(sampleRole(mode, "background", primarySample.h)),
			secondary: mapSampledRole(sampleRole(mode, "secondary")),
			accent: mapSampledRole(sampleRole(mode, "accent"))
		}

		if (isRejectedCandidate(mode, candidate)) {
			continue
		}

		return {
			text: candidate.text.hex,
			background: candidate.background.hex,
			primary: candidate.primary.hex,
			secondary: candidate.secondary.hex,
			accent: candidate.accent.hex
		}
	}

	throw new Error("Unable to generate a semantic palette candidate.")
}

export default palette
