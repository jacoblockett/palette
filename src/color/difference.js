import { hexToOklch } from "./oklch.js"

const DEFAULT_MINIMUM_DIFFERENCE = 0.06

export function lightnessDifference(first, second) {
	return Math.abs(hexToOklch(first).l - hexToOklch(second).l)
}

export function chromaDifference(first, second) {
	return Math.abs(hexToOklch(first).c - hexToOklch(second).c)
}

export function hueDifference(first, second) {
	const hueA = hexToOklch(first).h
	const hueB = hexToOklch(second).h
	const distance = Math.abs(hueA - hueB)

	return Math.min(distance, 360 - distance)
}

export function perceptualDifference(first, second) {
	const lightness = lightnessDifference(first, second)
	const chroma = chromaDifference(first, second)
	const hue = hueDifference(first, second) / 180

	return lightness * 1.5 + chroma + hue * 0.5
}

export function isPerceptiblyDifferent(first, second, minimumDifference = DEFAULT_MINIMUM_DIFFERENCE) {
	return perceptualDifference(first, second) >= minimumDifference
}

export function scoreCandidateDifference(candidate, context) {
	let score = 0

	if (context?.from) {
		score += perceptualDifference(candidate, context.from)
	}

	if (context?.parent) {
		score += perceptualDifference(candidate, context.parent)
	}

	for (const color of context?.avoid ?? []) {
		score -= Math.max(0, DEFAULT_MINIMUM_DIFFERENCE - perceptualDifference(candidate, color))
	}

	return score
}

export function pickMostDistinctCandidate(candidates, context) {
	if (!Array.isArray(candidates) || candidates.length === 0) {
		throw new TypeError("Expected a non-empty candidates array")
	}

	let bestCandidate = candidates[0]
	let bestScore = scoreCandidateDifference(bestCandidate, context)

	for (const candidate of candidates.slice(1)) {
		const score = scoreCandidateDifference(candidate, context)

		if (score > bestScore) {
			bestCandidate = candidate
			bestScore = score
		}
	}

	return bestCandidate
}
