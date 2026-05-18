import { perceptualDifference } from "../color/difference.js"

export const SEMANTIC_SEPARATION_TARGETS = {
	roleSurface: 0.08,
	rolePeer: 0.12,
	accentPeer: 0.14
}

export function dedupeColors(colors) {
	return [...new Set(colors)]
}

export function orderSeparatedCandidates(candidates, context) {
	const uniqueCandidates = dedupeColors(candidates)
	const references = (context?.references ?? []).filter(Boolean)

	if (references.length === 0) {
		return uniqueCandidates
	}

	const passing = []
	const failing = []

	for (const candidate of uniqueCandidates) {
		const passes = references.every(
			reference => perceptualDifference(candidate, reference) >= context.minimumDifference
		)

		if (passes) {
			passing.push(candidate)
		} else {
			failing.push(candidate)
		}
	}

	return [...passing, ...failing]
}
