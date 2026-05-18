import { createStateRecipe } from "./createStateRecipe.js"
import { pickVisibleCandidate } from "./selectCandidates.js"

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
	const hoverBg = pickVisibleCandidate(hoverBgCandidates, bg, [parentBg])
	const hover = createStateRecipe({
		bg: hoverBg,
		fgCandidates,
		borderCandidates,
		minimumFgContrast,
		parentBg: base.bg
	})
	const activeBg = pickVisibleCandidate(activeBgCandidates, bg, [hover.bg, parentBg])
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
