import { createInteractiveRecipe } from "./createInteractiveRecipe.js"
import { pickVisibleCandidate } from "./selectCandidates.js"

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
