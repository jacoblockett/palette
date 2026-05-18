import { contrastRatio } from "../color/contrast.js"
import { perceptualDifference, pickMostDistinctCandidate, scoreCandidateDifference } from "../color/difference.js"

export function scoreContrast(foreground, background) {
	return contrastRatio(foreground, background)
}

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

export function scoreCandidateVisibility(candidate, context) {
	const contrast = scoreContrast(candidate, context.background)
	const distinctness = scoreCandidateDifference(candidate, {
		from: context.background,
		avoid: context.avoid
	})
	let score = contrast + distinctness

	if (contrast < context.minimumContrastRatio) {
		score -= 100
		score -= context.minimumContrastRatio - contrast
	}

	return score
}

export function pickVisibleContrastCandidate(candidates, background, minimumContrastRatio, avoid = []) {
	if (!Array.isArray(candidates) || candidates.length === 0) {
		throw new TypeError("Expected a non-empty candidates array")
	}

	const filteredAvoid = avoid.filter(Boolean)
	const allCandidatesAvoided = candidates.every(candidate => filteredAvoid.includes(candidate))

	for (const candidate of candidates) {
		if (!allCandidatesAvoided && filteredAvoid.includes(candidate)) {
			continue
		}

		if (scoreContrast(candidate, background) >= minimumContrastRatio) {
			return candidate
		}
	}

	let bestCandidate = candidates[0]
	let bestScore = scoreCandidateVisibility(bestCandidate, {
		background,
		minimumContrastRatio,
		avoid: filteredAvoid
	})

	for (const candidate of candidates.slice(1)) {
		const score = scoreCandidateVisibility(candidate, {
			background,
			minimumContrastRatio,
			avoid: filteredAvoid
		})

		if (score > bestScore) {
			bestCandidate = candidate
			bestScore = score
		}
	}

	return bestCandidate
}

export function scoreReadablePair(pair, context) {
	const contrast = scoreContrast(pair.fg, pair.bg)
	let score = contrast

	if (contrast < context.minimumContrastRatio) {
		score -= 100 + (context.minimumContrastRatio - contrast)
	}

	if (context.preferredBg) {
		score += perceptualDifference(pair.bg, context.preferredBg)
	}

	for (const color of context.avoidBg ?? []) {
		if (perceptualDifference(pair.bg, color) < 0.06) {
			score -= 25
		}
	}

	return score
}

export function pickReadablePair({
	backgroundCandidates,
	foregroundCandidates,
	minimumContrastRatio,
	preferredBg,
	avoidBg = []
}) {
	if (!Array.isArray(backgroundCandidates) || backgroundCandidates.length === 0) {
		throw new TypeError("Expected a non-empty backgroundCandidates array")
	}

	if (!Array.isArray(foregroundCandidates) || foregroundCandidates.length === 0) {
		throw new TypeError("Expected a non-empty foregroundCandidates array")
	}

	for (const bg of backgroundCandidates) {
		for (const fg of foregroundCandidates) {
			if (scoreContrast(fg, bg) >= minimumContrastRatio) {
				return { bg, fg }
			}
		}
	}

	const fallbackPairs = []

	for (const bg of backgroundCandidates) {
		fallbackPairs.push({ bg, fg: "#000000" })
		fallbackPairs.push({ bg, fg: "#ffffff" })
	}

	let bestPair = fallbackPairs[0]
	let bestScore = scoreReadablePair(bestPair, {
		minimumContrastRatio,
		preferredBg,
		avoidBg
	})

	for (const pair of fallbackPairs.slice(1)) {
		const score = scoreReadablePair(pair, {
			minimumContrastRatio,
			preferredBg,
			avoidBg
		})

		if (score > bestScore) {
			bestPair = pair
			bestScore = score
		}
	}

	return bestPair
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
