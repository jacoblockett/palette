import { contrastRatio } from "../color/contrast.js"
import { perceptualDifference } from "../color/difference.js"
import { hexToOklch } from "../color/oklch.js"
import { CONTRAST_TARGETS } from "../recipes/contrastTargets.js"
import { SEMANTIC_SEPARATION_TARGETS } from "../recipes/semanticSeparation.js"
import { createForegroundCandidates } from "../recipes/createForegroundCandidates.js"
import { getAxisRoleAnchorTone } from "../axis/createTonalAxis.js"
import { createRoleToneCandidates } from "./createRoleCandidates.js"

const COMPOSITION_CANDIDATE_LIMIT = 7
const PRIMARY_WEIGHT = 1.15
const SECONDARY_WEIGHT = 0.82
const ACCENT_WEIGHT = 1
const ROLE_KEYS = ["primary", "secondary", "accent"]

function limitCandidates(candidates) {
	return candidates.slice(0, COMPOSITION_CANDIDATE_LIMIT)
}

function createRoleForegroundCandidates(mode, role, roleRamp, neutralRamp) {
	if (role === "primary" || role === "secondary") {
		return createForegroundCandidates({
			mode,
			primaryRamp: neutralRamp,
			fallbackRamp: roleRamp
		})
	}

	if (role === "accent") {
		return createForegroundCandidates({
			mode,
			primaryRamp: roleRamp,
			fallbackRamp: neutralRamp
		})
	}

	throw new TypeError(`Unknown role: ${role}`)
}

function createRoleBackgroundCandidates(mode, axis, role, roleRamp, references, minimumDifference) {
	return limitCandidates(
		createRoleToneCandidates({
			mode,
			axis,
			role,
			roleRamp,
			treatment: "solid",
			references,
			minimumDifference
		})
	)
}

function getTone(color) {
	return hexToOklch(color).l * 100
}

function getChroma(color) {
	return hexToOklch(color).c
}

function getBestForegroundContrast(background, foregroundCandidates) {
	return foregroundCandidates.reduce(
		(bestRatio, foreground) => Math.max(bestRatio, contrastRatio(foreground, background)),
		-Infinity
	)
}

function getAxisPresence(axis, color) {
	const tone = getTone(color)
	const presence = Math.abs(tone - axis.backgroundTone) / Math.max(1, axis.contrastSpan)

	return Math.min(1, Math.max(0, presence))
}

function createCandidateEntries({ mode, axis, role, roleRamp, neutralRamp, references, minimumDifference }) {
	const filteredReferences = references.filter(Boolean)
	const foregroundCandidates = createRoleForegroundCandidates(mode, role, roleRamp, neutralRamp)
	const backgroundCandidates = createRoleBackgroundCandidates(
		mode,
		axis,
		role,
		roleRamp,
		filteredReferences,
		minimumDifference
	)

	return backgroundCandidates.map(color => ({
		role,
		color,
		tone: getTone(color),
		chroma: getChroma(color),
		axisPresence: getAxisPresence(axis, color),
		surfaceDifference:
			filteredReferences.length === 0
				? 1
				: Math.min(...filteredReferences.map(reference => perceptualDifference(color, reference))),
		bestForegroundContrast: getBestForegroundContrast(color, foregroundCandidates),
		foregroundCandidates
	}))
}

function scoreAnchorAlignment(entry, axis, role) {
	const anchorTone = getAxisRoleAnchorTone({ axis, role })
	const distance = Math.abs(entry.tone - anchorTone)

	return Math.max(0, 12 - distance * 0.35)
}

function scoreCandidateEntry(entry, role, axis) {
	let score = 0

	if (entry.bestForegroundContrast >= CONTRAST_TARGETS.roleText) {
		score += 12
	} else {
		score += 6 * (entry.bestForegroundContrast / CONTRAST_TARGETS.roleText)
	}

	score += entry.surfaceDifference * 18
	score += entry.axisPresence * 10
	score += entry.chroma * 26

	if (axis) {
		score += scoreAnchorAlignment(entry, axis, role)
	}

	if (role === "primary") {
		return score * PRIMARY_WEIGHT
	}

	if (role === "secondary") {
		return score * SECONDARY_WEIGHT
	}

	return score * ACCENT_WEIGHT
}

function scoreComposition(primary, secondary, accent, axis) {
	let score =
		scoreCandidateEntry(primary, "primary", axis) +
		scoreCandidateEntry(secondary, "secondary", axis) +
		scoreCandidateEntry(accent, "accent", axis)

	if (primary.axisPresence >= secondary.axisPresence) {
		score += 14
	}

	if (primary.chroma >= secondary.chroma) {
		score += 8
	}

	if (accent.chroma >= secondary.chroma) {
		score += 10
	}

	if (perceptualDifference(primary.color, secondary.color) >= SEMANTIC_SEPARATION_TARGETS.rolePeer) {
		score += 10
	}

	if (perceptualDifference(primary.color, accent.color) >= SEMANTIC_SEPARATION_TARGETS.accentPeer) {
		score += 12
	}

	if (perceptualDifference(secondary.color, accent.color) >= SEMANTIC_SEPARATION_TARGETS.rolePeer) {
		score += 8
	}

	if (secondary.axisPresence > primary.axisPresence) {
		score -= 10
	}

	if (secondary.chroma > primary.chroma) {
		score -= 8
	}

	if (
		Math.abs(primary.chroma - secondary.chroma) <= 0.025 &&
		Math.abs(primary.chroma - accent.chroma) <= 0.025 &&
		Math.abs(secondary.chroma - accent.chroma) <= 0.025
	) {
		score -= 6
	}

	return score
}

function orderWithSelectedFirst(candidates, selected) {
	const ordered = [selected, ...candidates]
	const seen = new Set()

	return ordered.filter(candidate => {
		if (seen.has(candidate)) {
			return false
		}

		seen.add(candidate)

		return true
	})
}

export function createRoleComposition({ mode, axis, app, surface, roleRamps, neutralRamp }) {
	const primaryReferences = [app.bg, surface.bg]
	const secondaryReferences = [app.bg, surface.bg]
	const accentReferences = [app.bg, surface.bg]
	const primaryEntries = createCandidateEntries({
		mode,
		axis,
		role: ROLE_KEYS[0],
		roleRamp: roleRamps.primary,
		neutralRamp,
		references: primaryReferences,
		minimumDifference: SEMANTIC_SEPARATION_TARGETS.rolePeer
	})
	const secondaryEntries = createCandidateEntries({
		mode,
		axis,
		role: ROLE_KEYS[1],
		roleRamp: roleRamps.secondary,
		neutralRamp,
		references: secondaryReferences,
		minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
	})
	const accentEntries = createCandidateEntries({
		mode,
		axis,
		role: ROLE_KEYS[2],
		roleRamp: roleRamps.accent,
		neutralRamp,
		references: accentReferences,
		minimumDifference: SEMANTIC_SEPARATION_TARGETS.accentPeer
	})

	let bestComposition = {
		primary: primaryEntries[0],
		secondary: secondaryEntries[0],
		accent: accentEntries[0]
	}
	let bestScore = -Infinity

	for (const primary of primaryEntries) {
		for (const secondary of secondaryEntries) {
			for (const accent of accentEntries) {
				const score = scoreComposition(primary, secondary, accent, axis)

				if (score > bestScore) {
					bestScore = score
					bestComposition = {
						primary,
						secondary,
						accent
					}
				}
			}
		}
	}

	return {
		primary: {
			selectedSolidBg: bestComposition.primary.color,
			solidBackgroundCandidates: orderWithSelectedFirst(
				primaryEntries.map(entry => entry.color),
				bestComposition.primary.color
			),
			softBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[0],
				roleRamp: roleRamps.primary,
				treatment: "soft",
				references: primaryReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.rolePeer
			}),
			outlineBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[0],
				roleRamp: roleRamps.primary,
				treatment: "outline",
				references: primaryReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.rolePeer
			}),
			ghostBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[0],
				roleRamp: roleRamps.primary,
				treatment: "ghost",
				references: primaryReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.rolePeer
			}),
			foregroundCandidates: bestComposition.primary.foregroundCandidates,
			axisPresence: bestComposition.primary.axisPresence,
			chroma: bestComposition.primary.chroma,
			tone: bestComposition.primary.tone
		},
		secondary: {
			selectedSolidBg: bestComposition.secondary.color,
			solidBackgroundCandidates: orderWithSelectedFirst(
				secondaryEntries.map(entry => entry.color),
				bestComposition.secondary.color
			),
			softBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[1],
				roleRamp: roleRamps.secondary,
				treatment: "soft",
				references: secondaryReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
			}),
			outlineBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[1],
				roleRamp: roleRamps.secondary,
				treatment: "outline",
				references: secondaryReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
			}),
			ghostBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[1],
				roleRamp: roleRamps.secondary,
				treatment: "ghost",
				references: secondaryReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
			}),
			foregroundCandidates: bestComposition.secondary.foregroundCandidates,
			axisPresence: bestComposition.secondary.axisPresence,
			chroma: bestComposition.secondary.chroma,
			tone: bestComposition.secondary.tone
		},
		accent: {
			selectedSolidBg: bestComposition.accent.color,
			solidBackgroundCandidates: orderWithSelectedFirst(
				accentEntries.map(entry => entry.color),
				bestComposition.accent.color
			),
			softBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[2],
				roleRamp: roleRamps.accent,
				treatment: "soft",
				references: accentReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.accentPeer
			}),
			outlineBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[2],
				roleRamp: roleRamps.accent,
				treatment: "outline",
				references: accentReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.accentPeer
			}),
			ghostBackgroundCandidates: createRoleToneCandidates({
				mode,
				axis,
				role: ROLE_KEYS[2],
				roleRamp: roleRamps.accent,
				treatment: "ghost",
				references: accentReferences,
				minimumDifference: SEMANTIC_SEPARATION_TARGETS.accentPeer
			}),
			foregroundCandidates: bestComposition.accent.foregroundCandidates,
			axisPresence: bestComposition.accent.axisPresence,
			chroma: bestComposition.accent.chroma,
			tone: bestComposition.accent.tone
		}
	}
}
