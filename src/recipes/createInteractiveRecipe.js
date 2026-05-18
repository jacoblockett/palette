import { CONTRAST_TARGETS } from "./contrastTargets.js"
import { createStateRecipe } from "./createStateRecipe.js"
import { pickVisibleContrastCandidate } from "./selectCandidates.js"

export function createInteractiveRecipe({
	bg,
	fgCandidates,
	borderCandidates,
	hoverBgCandidates,
	activeBgCandidates,
	minimumFgContrast = 4.5,
	parentBg
}) {
	const base = createStateRecipe({
		bg,
		fgCandidates,
		borderCandidates,
		minimumFgContrast,
		parentBg
	})
	const hoverBg = pickVisibleContrastCandidate(hoverBgCandidates, bg, CONTRAST_TARGETS.nonText, [parentBg])
	const hover = createStateRecipe({
		bg: hoverBg,
		fgCandidates,
		borderCandidates,
		minimumFgContrast,
		parentBg: base.bg
	})
	const activeBg = pickVisibleContrastCandidate(activeBgCandidates, bg, CONTRAST_TARGETS.nonText, [hover.bg, parentBg])
	const active = createStateRecipe({
		bg: activeBg,
		fgCandidates,
		borderCandidates,
		minimumFgContrast,
		parentBg: hover.bg
	})

	return {
		bg: base.bg,
		fg: base.fg,
		border: base.border,
		hover,
		active
	}
}
