import { createInteractiveRecipe } from "./createInteractiveRecipe.js"
import { contrastRatio } from "../color/contrast.js"
import { pickMostDistinctCandidate } from "../color/difference.js"

export function createNestedInteractiveRecipe({
	bg,
	fgCandidates,
	borderCandidates,
	hoverBgCandidates,
	activeBgCandidates,
	childBgCandidates,
	childHoverBgCandidates,
	childActiveBgCandidates,
	minimumFgContrast = 4.5,
	parentBg
}) {
	const baseRecipe = createInteractiveRecipe({
		bg,
		fgCandidates,
		borderCandidates,
		hoverBgCandidates,
		activeBgCandidates,
		minimumFgContrast,
		parentBg
	})
	const childBg = pickVisibleCandidate(childBgCandidates, baseRecipe.bg, [
		baseRecipe.hover.bg,
		baseRecipe.active.bg,
		parentBg
	])
	const child = createInteractiveRecipe({
		bg: childBg,
		fgCandidates,
		borderCandidates,
		hoverBgCandidates: childHoverBgCandidates,
		activeBgCandidates: childActiveBgCandidates,
		minimumFgContrast,
		parentBg: baseRecipe.bg
	})

	return {
		bg: baseRecipe.bg,
		fg: baseRecipe.fg,
		border: baseRecipe.border,
		hover: baseRecipe.hover,
		active: baseRecipe.active,
		child
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
