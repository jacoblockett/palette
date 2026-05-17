import { pickReadableCandidate, pickVisibleCandidate } from "./selectCandidates.js"

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
