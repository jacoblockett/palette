import { pickReadableCandidate, pickVisibleCandidate } from "./selectCandidates.js"

export function createStaticRecipe({ bg, fgCandidates, mutedFgCandidates, borderCandidates, minimumFgContrast = 4.5 }) {
	return {
		bg,
		fg: pickReadableCandidate(fgCandidates, bg, minimumFgContrast),
		mutedFg: pickReadableCandidate(mutedFgCandidates, bg, minimumFgContrast),
		border: pickVisibleCandidate(borderCandidates, bg)
	}
}
