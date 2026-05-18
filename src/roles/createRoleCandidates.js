import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { TONE_STOPS, getRampColor } from "../ramps/createRamp.js"
import { perceptualDifference } from "../color/difference.js"

function clampTone(tone) {
	return Math.min(100, Math.max(0, tone))
}

function nearestToneStop(tone) {
	return TONE_STOPS.reduce((best, current) => (Math.abs(current - tone) < Math.abs(best - tone) ? current : best))
}

function dedupeTones(tones) {
	return [...new Set(tones)]
}

function getToneColorPairs(ramp, tones) {
	return tones.map(tone => ({
		tone,
		color: getRampColor(ramp, tone)
	}))
}

function getRoleToneWindow(mode, axis, treatment) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (treatment === "solid") {
		const midpoint = (axis.backgroundTone + axis.textTone) / 2
		const center = midpoint + (axis.textTone - midpoint) * 0.18

		return {
			center: nearestToneStop(center),
			radius: 32,
			direction: axis.modeDirection
		}
	}

	if (treatment === "soft") {
		const center = axis.backgroundTone + (axis.textTone - axis.backgroundTone) * 0.1

		return {
			center: nearestToneStop(center),
			radius: 18,
			direction: axis.modeDirection
		}
	}

	if (treatment === "outline" || treatment === "ghost") {
		const center = axis.backgroundTone + (axis.textTone - axis.backgroundTone) * 0.06

		return {
			center: nearestToneStop(center),
			radius: 14,
			direction: axis.modeDirection
		}
	}

	throw new TypeError("Expected a valid role treatment")
}

function compareCandidateTones(first, second, center, direction) {
	const distanceDifference = Math.abs(first - center) - Math.abs(second - center)

	if (distanceDifference !== 0) {
		return distanceDifference
	}

	const directionalFirst = (first - center) * direction
	const directionalSecond = (second - center) * direction

	if (directionalFirst !== directionalSecond) {
		return directionalSecond - directionalFirst
	}

	return first - second
}

function orderCandidateColors(pairs, references, minimumDifference) {
	const uniquePairs = []
	const seenColors = new Set()

	for (const pair of pairs) {
		if (seenColors.has(pair.color)) {
			continue
		}

		seenColors.add(pair.color)
		uniquePairs.push(pair)
	}

	if (references.length === 0 || minimumDifference <= 0) {
		return uniquePairs.map(pair => pair.color)
	}

	const passing = []
	const failing = []

	for (const pair of uniquePairs) {
		const passes = references.every(reference => perceptualDifference(pair.color, reference) >= minimumDifference)

		if (passes) {
			passing.push(pair.color)
		} else {
			failing.push(pair.color)
		}
	}

	return [...passing, ...failing]
}

function getStepDirection(baseTone, targetTone, fallbackDirection) {
	const nearestBaseTone = nearestToneStop(baseTone)
	const nearestTargetTone = nearestToneStop(targetTone)

	if (nearestTargetTone === nearestBaseTone) {
		return fallbackDirection
	}

	return nearestTargetTone > nearestBaseTone ? 1 : -1
}

function shiftTone(tone, direction, steps) {
	const startTone = nearestToneStop(clampTone(tone))
	const index = TONE_STOPS.indexOf(startTone)
	const nextIndex = Math.min(TONE_STOPS.length - 1, Math.max(0, index + direction * steps))

	return TONE_STOPS[nextIndex]
}

export function createRoleToneCandidates({ mode, axis, roleRamp, treatment, references = [], minimumDifference = 0 }) {
	const window = getRoleToneWindow(mode, axis, treatment)
	const candidateTones = TONE_STOPS.filter(
		tone => tone !== 0 && tone !== 100 && Math.abs(tone - window.center) <= window.radius
	).sort((first, second) => compareCandidateTones(first, second, window.center, window.direction))
	const candidatePairs = getToneColorPairs(roleRamp, candidateTones)

	return orderCandidateColors(candidatePairs, references.filter(Boolean), minimumDifference)
}

export function createRoleStateCandidates({
	mode,
	axis,
	roleRamp,
	baseColor,
	baseTone,
	state,
	references = [],
	minimumDifference = 0
}) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	void baseColor

	let targetTone
	let steps
	let fallbackDirection

	if (state === "hover") {
		targetTone = axis.textTone
		steps = [1, 2]
		fallbackDirection = axis.modeDirection
	} else if (state === "active") {
		targetTone = axis.textTone
		steps = [2, 3]
		fallbackDirection = axis.modeDirection
	} else if (state === "child") {
		targetTone = axis.backgroundTone
		steps = [1, 2]
		fallbackDirection = axis.modeDirection * -1
	} else if (state === "childHover") {
		targetTone = axis.backgroundTone
		steps = [2, 3]
		fallbackDirection = axis.modeDirection * -1
	} else if (state === "childActive") {
		targetTone = axis.backgroundTone
		steps = [3, 4]
		fallbackDirection = axis.modeDirection * -1
	} else {
		throw new TypeError("Expected a valid role state")
	}

	const direction = getStepDirection(baseTone, targetTone, fallbackDirection)
	const candidateTones = dedupeTones([
		...steps.map(step => shiftTone(baseTone, direction, step)),
		nearestToneStop(clampTone(baseTone))
	])
	const candidatePairs = getToneColorPairs(roleRamp, candidateTones)

	return orderCandidateColors(candidatePairs, references.filter(Boolean), minimumDifference)
}
