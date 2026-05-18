import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { getRampColor } from "../ramps/createRamp.js"
import { CONTRAST_TARGETS } from "../recipes/contrastTargets.js"
import { createForegroundCandidates } from "../recipes/createForegroundCandidates.js"
import { MODE_TONE_TARGETS } from "./toneTargets.js"
import { pickReadableCandidate, pickReadablePair, pickVisibleContrastCandidate } from "../recipes/selectCandidates.js"

export function createAppTokens({ mode, ramps, axis }) {
	void axis

	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (!ramps?.base || !ramps?.neutral || !ramps?.accent) {
		throw new TypeError("Expected base, neutral, and accent ramps")
	}

	const targets = MODE_TONE_TARGETS[mode]
	const bg = getRampColor(ramps.base, targets.appBg)
	const appFgCandidates = createForegroundCandidates({
		mode,
		primaryRamp: ramps.neutral,
		fallbackRamp: ramps.neutral,
		preferredStops: targets.appFg
	})
	const fg = pickReadableCandidate(appFgCandidates, bg, CONTRAST_TARGETS.appText)
	const mutedFg = pickReadableCandidate(
		createForegroundCandidates({
			mode,
			primaryRamp: ramps.neutral,
			fallbackRamp: ramps.neutral,
			preferredStops: targets.mutedFg
		}),
		bg,
		CONTRAST_TARGETS.mutedText
	)
	const subtleFg = pickReadableCandidate(
		createForegroundCandidates({
			mode,
			primaryRamp: ramps.neutral,
			fallbackRamp: ramps.neutral,
			preferredStops: targets.subtleFg
		}),
		bg,
		CONTRAST_TARGETS.subtleText
	)
	const border = pickVisibleContrastCandidate(
		getStopColors(ramps.neutral, targets.border),
		bg,
		CONTRAST_TARGETS.nonText
	)
	const strongBorder = pickVisibleContrastCandidate(
		getStopColors(ramps.neutral, targets.strongBorder),
		bg,
		CONTRAST_TARGETS.nonText,
		[border]
	)
	const focusRing = pickVisibleContrastCandidate(
		getStopColors(ramps.accent, targets.focusRing),
		bg,
		CONTRAST_TARGETS.nonText,
		[border, strongBorder]
	)
	const selectionPair = pickReadablePair({
		backgroundCandidates: [getRampColor(ramps.accent, targets.selectionBg)],
		foregroundCandidates: appFgCandidates,
		minimumContrastRatio: CONTRAST_TARGETS.selectionText
	})
	const selectionBg = selectionPair.bg
	const selectionFg = selectionPair.fg

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
