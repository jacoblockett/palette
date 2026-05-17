import { contrastRatio } from "../color/contrast.js"
import { pickMostDistinctCandidate } from "../color/difference.js"

export function createStaticRecipe({ bg, fgCandidates, mutedFgCandidates, borderCandidates, minimumFgContrast = 4.5 }) {
	return {
		bg,
		fg: pickReadableCandidate(fgCandidates, bg, minimumFgContrast),
		mutedFg: pickReadableCandidate(mutedFgCandidates, bg, minimumFgContrast),
		border: pickVisibleCandidate(borderCandidates, bg)
	}
}

function pickReadableCandidate(candidates, background, minimumContrastRatio) {
	if (!Array.isArray(candidates) || candidates.length === 0) {
		throw new TypeError("Expected a non-empty candidates array")
	}

	let bestCandidate = candidates[0]
	let bestContrast = contrastRatio(bestCandidate, background)

	if (bestContrast >= minimumContrastRatio) {
		return bestCandidate
	}

	for (const candidate of candidates.slice(1)) {
		const candidateContrast = contrastRatio(candidate, background)

		if (candidateContrast >= minimumContrastRatio) {
			return candidate
		}

		if (candidateContrast > bestContrast) {
			bestCandidate = candidate
			bestContrast = candidateContrast
		}
	}

	return bestCandidate
}

function pickVisibleCandidate(candidates, background, avoid = []) {
	if (!Array.isArray(candidates) || candidates.length === 0) {
		throw new TypeError("Expected a non-empty candidates array")
	}

	return pickMostDistinctCandidate(candidates, {
		from: background,
		avoid: avoid.filter(Boolean)
	})
}
