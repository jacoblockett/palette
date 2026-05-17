import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { getRampColor, getTextCandidates } from "../ramps/createRamp.js"
import { readableForeground, contrastRatio } from "../color/contrast.js"
import { pickMostDistinctCandidate } from "../color/difference.js"

export function createAppTokens({ mode, ramps }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (!ramps?.base || !ramps?.neutral || !ramps?.accent) {
		throw new TypeError("Expected base, neutral, and accent ramps")
	}

	if (mode === MODE_LIGHT) {
		const bg = getRampColor(ramps.base, 95)
		const fg = pickReadableCandidate(getTextCandidates(ramps.neutral, mode), bg, 7)
		const mutedFg = pickReadableCandidate(
			[getRampColor(ramps.neutral, 40), getRampColor(ramps.neutral, 50), getRampColor(ramps.neutral, 60)],
			bg,
			4.5
		)
		const subtleFg = pickReadableCandidate(
			[getRampColor(ramps.neutral, 50), getRampColor(ramps.neutral, 60), getRampColor(ramps.neutral, 70)],
			bg,
			3
		)
		const border = pickVisibleCandidate([getRampColor(ramps.neutral, 80), getRampColor(ramps.neutral, 90)], bg)
		const strongBorder = pickVisibleCandidate([getRampColor(ramps.neutral, 60), getRampColor(ramps.neutral, 70)], bg, [
			border
		])
		const focusRing = pickVisibleCandidate([getRampColor(ramps.accent, 50)], bg, [border, strongBorder])
		const selectionBg = getRampColor(ramps.accent, 80)
		const selectionFg = readableForeground(selectionBg)

		return {
			bg,
			fg,
			mutedFg,
			subtleFg,
			border,
			strongBorder,
			focusRing,
			selectionBg,
			selectionFg
		}
	}

	const bg = getRampColor(ramps.base, 5)
	const fg = pickReadableCandidate(getTextCandidates(ramps.neutral, mode), bg, 7)
	const mutedFg = pickReadableCandidate(
		[getRampColor(ramps.neutral, 60), getRampColor(ramps.neutral, 70), getRampColor(ramps.neutral, 80)],
		bg,
		4.5
	)
	const subtleFg = pickReadableCandidate(
		[getRampColor(ramps.neutral, 40), getRampColor(ramps.neutral, 50), getRampColor(ramps.neutral, 60)],
		bg,
		3
	)
	const border = pickVisibleCandidate([getRampColor(ramps.neutral, 20), getRampColor(ramps.neutral, 30)], bg)
	const strongBorder = pickVisibleCandidate([getRampColor(ramps.neutral, 30), getRampColor(ramps.neutral, 40)], bg, [
		border
	])
	const focusRing = pickVisibleCandidate([getRampColor(ramps.accent, 60)], bg, [border, strongBorder])
	const selectionBg = getRampColor(ramps.accent, 30)
	const selectionFg = readableForeground(selectionBg)

	return {
		bg,
		fg,
		mutedFg,
		subtleFg,
		border,
		strongBorder,
		focusRing,
		selectionBg,
		selectionFg
	}
}

function pickReadableCandidate(candidates, background, minimumContrastRatio) {
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
	return pickMostDistinctCandidate(candidates, {
		from: background,
		avoid
	})
}
