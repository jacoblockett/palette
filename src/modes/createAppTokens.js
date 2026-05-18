import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { getRampColor, getTextCandidates } from "../ramps/createRamp.js"
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
	const fg = pickReadableCandidate(getTextCandidates(ramps.neutral, mode), bg, 7)
	const mutedFg = pickReadableCandidate(getStopColors(ramps.neutral, targets.mutedFg), bg, 4.5)
	const subtleFg = pickReadableCandidate(getStopColors(ramps.neutral, targets.subtleFg), bg, 3)
	const border = pickVisibleCandidate(getStopColors(ramps.neutral, targets.border), bg)
	const strongBorder = pickVisibleCandidate(getStopColors(ramps.neutral, targets.strongBorder), bg, [border])
	const focusRing = pickVisibleCandidate(getStopColors(ramps.accent, targets.focusRing), bg, [border, strongBorder])
	const selectionBg = getRampColor(ramps.accent, targets.selectionBg)
	const selectionFg = pickReadableCandidate(getTextCandidates(ramps.neutral, mode), selectionBg, 4.5)

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
