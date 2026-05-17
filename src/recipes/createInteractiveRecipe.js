import { contrastRatio } from "../color/contrast.js"
import { pickMostDistinctCandidate } from "../color/difference.js"

export function createInteractiveRecipe({
	bg,
	fgCandidates,
	borderCandidates,
	hoverBgCandidates,
	activeBgCandidates,
	minimumFgContrast = 4.5,
	parentBg
}) {
	const fg = pickReadableCandidate(fgCandidates, bg, minimumFgContrast)
	const border = pickVisibleCandidate(borderCandidates, bg, [parentBg])
	const hoverBg = pickVisibleCandidate(hoverBgCandidates, bg, [parentBg])
	const hover = {
		bg: hoverBg,
		fg: pickReadableCandidate(fgCandidates, hoverBg, minimumFgContrast),
		border: pickVisibleCandidate(borderCandidates, hoverBg, [bg])
	}
	const activeBg = pickVisibleCandidate(activeBgCandidates, bg, [hover.bg, parentBg])
	const active = {
		bg: activeBg,
		fg: pickReadableCandidate(fgCandidates, activeBg, minimumFgContrast),
		border: pickVisibleCandidate(borderCandidates, activeBg, [bg, hover.bg])
	}

	return {
		bg,
		fg,
		border,
		hover,
		active
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
