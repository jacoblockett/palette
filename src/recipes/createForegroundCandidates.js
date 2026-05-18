import { getToneFirstForegroundCandidates } from "../ramps/createRamp.js"

export function createForegroundCandidates({ mode, primaryRamp, fallbackRamp, preferredStops = [] }) {
	const primaryCandidates = getToneFirstForegroundCandidates(primaryRamp, mode, preferredStops)

	if (primaryRamp === fallbackRamp) {
		return primaryCandidates
	}

	const fallbackCandidates = getToneFirstForegroundCandidates(fallbackRamp, mode, preferredStops)

	return [...new Set([...primaryCandidates, ...fallbackCandidates])]
}
