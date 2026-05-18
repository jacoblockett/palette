import { pickReadableCandidate, pickVisibleCandidate } from "./selectCandidates.js"

export function createStateRecipe({ bg, fgCandidates, borderCandidates, minimumFgContrast, parentBg }) {
	return {
		bg,
		fg: pickReadableCandidate(fgCandidates, bg, minimumFgContrast),
		border: pickVisibleCandidate(borderCandidates, bg, [parentBg])
	}
}
