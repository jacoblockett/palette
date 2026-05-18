import { contrastRatio } from "../color/contrast.js"
import { pickMostDistinctCandidate } from "../color/difference.js"

export function pickReadableCandidate(candidates, background, minimumContrastRatio) {
	if (!Array.isArray(candidates) || candidates.length === 0) {
		throw new TypeError("Expected a non-empty candidates array")
	}

	for (const candidate of candidates) {
		if (contrastRatio(candidate, background) >= minimumContrastRatio) {
			return candidate
		}
	}

	return solveReadableForeground(background, minimumContrastRatio)
}

export function pickVisibleCandidate(candidates, background, avoid = []) {
	if (!Array.isArray(candidates) || candidates.length === 0) {
		throw new TypeError("Expected a non-empty candidates array")
	}

	return pickMostDistinctCandidate(candidates, {
		from: background,
		avoid: avoid.filter(Boolean)
	})
}

function solveReadableForeground(background, minimumContrastRatio) {
	const fallbackCandidates = ["#000000", "#ffffff"]

	for (const candidate of fallbackCandidates) {
		if (contrastRatio(candidate, background) >= minimumContrastRatio) {
			return candidate
		}
	}

	const blackContrast = contrastRatio("#000000", background)
	const whiteContrast = contrastRatio("#ffffff", background)

	return blackContrast >= whiteContrast ? "#000000" : "#ffffff"
}
