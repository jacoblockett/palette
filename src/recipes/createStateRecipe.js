import { CONTRAST_TARGETS } from "./contrastTargets.js"
import { pickReadableCandidate, pickVisibleContrastCandidate } from "./selectCandidates.js"

export function createStateRecipe({ bg, fgCandidates, borderCandidates, minimumFgContrast, parentBg }) {
	return {
		bg,
		fg: pickReadableCandidate(fgCandidates, bg, minimumFgContrast),
		border: pickVisibleContrastCandidate(borderCandidates, bg, CONTRAST_TARGETS.nonText, [parentBg])
	}
}
