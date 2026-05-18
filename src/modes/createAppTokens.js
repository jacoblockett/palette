import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { getRampColor } from "../ramps/createRamp.js"
import { CONTRAST_TARGETS } from "../recipes/contrastTargets.js"
import { MODE_TONE_TARGETS } from "./toneTargets.js"
import { pickReadableCandidate, pickVisibleCandidate } from "../recipes/selectCandidates.js"

export function createAppTokens({ mode, ramps }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (!ramps?.base || !ramps?.neutral || !ramps?.accent) {
		throw new TypeError("Expected base, neutral, and accent ramps")
	}

	const targets = MODE_TONE_TARGETS[mode]
	const bg = getRampColor(ramps.base, targets.appBg)
	const appFgCandidates = getStopColors(ramps.neutral, targets.appFg)
	const fg = pickReadableCandidate(appFgCandidates, bg, CONTRAST_TARGETS.appText)
	const mutedFg = pickReadableCandidate(getStopColors(ramps.neutral, targets.mutedFg), bg, CONTRAST_TARGETS.mutedText)
	const subtleFg = pickReadableCandidate(
		getStopColors(ramps.neutral, targets.subtleFg),
		bg,
		CONTRAST_TARGETS.subtleText
	)
	const border = pickVisibleCandidate(getStopColors(ramps.neutral, targets.border), bg)
	const strongBorder = pickVisibleCandidate(getStopColors(ramps.neutral, targets.strongBorder), bg, [border])
	const focusRing = pickVisibleCandidate(getStopColors(ramps.accent, targets.focusRing), bg, [border, strongBorder])
	const selectionBg = getRampColor(ramps.accent, targets.selectionBg)
	const selectionFg = pickReadableCandidate(appFgCandidates, selectionBg, CONTRAST_TARGETS.selectionText)

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

function getStopColors(ramp, stops) {
	return stops.map(stop => getRampColor(ramp, stop))
}
