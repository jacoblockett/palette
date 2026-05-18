import { MODE_LIGHT, MODE_DARK, ROLE_KEYS, GENERATED_ROLE_KEYS } from "../defaults.js"
import { createRamp, getRampColor, TONE_STOPS } from "../ramps/createRamp.js"
import { hexToOklch, oklchToHex, normalizeHue, clampChroma } from "../color/oklch.js"
import { CONTRAST_TARGETS } from "../recipes/contrastTargets.js"
import { createForegroundCandidates } from "../recipes/createForegroundCandidates.js"
import { createInteractiveRecipe } from "../recipes/createInteractiveRecipe.js"
import { createNestedInteractiveRecipe } from "../recipes/createNestedInteractiveRecipe.js"
import { pickReadablePair } from "../recipes/selectCandidates.js"
import { SEMANTIC_SEPARATION_TARGETS } from "../recipes/semanticSeparation.js"
import { createRoleToneCandidates, createRoleStateCandidates } from "../roles/createRoleCandidates.js"
import { createRoleComposition } from "../roles/createRoleComposition.js"

const ROLE_TONE_TARGETS = {
	[MODE_LIGHT]: {
		solid: [45, 50, 55],
		solidHover: [40, 45, 50],
		solidActive: [35, 40, 45],
		solidBorder: [35, 40, 45],
		solidChild: [90, 92, 95],
		soft: [95, 92, 90],
		softHover: [92, 90, 88],
		softActive: [90, 88, 85],
		softBorder: [70, 75, 80],
		outlineBorder: [45, 50, 55],
		outlineHover: [95, 92, 90],
		outlineActive: [92, 90, 88]
	},
	[MODE_DARK]: {
		solid: [65, 70, 75],
		solidHover: [70, 75, 80],
		solidActive: [75, 80, 85],
		solidBorder: [75, 80, 85],
		solidChild: [20, 25, 30],
		soft: [12, 16, 20],
		softHover: [16, 20, 25],
		softActive: [20, 25, 30],
		softBorder: [35, 40, 45],
		outlineBorder: [60, 65, 70],
		outlineHover: [10, 12, 16],
		outlineActive: [16, 20, 25]
	}
}

export function createRoleTokens({ mode, app, surfaces, ramps, axis }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (axis === null || typeof axis !== "object") {
		throw new TypeError("Expected axis to be an object")
	}

	if (app === null || Array.isArray(app) || typeof app !== "object") {
		throw new TypeError("Expected app to be an object")
	}

	if (surfaces === null || Array.isArray(surfaces) || typeof surfaces !== "object") {
		throw new TypeError("Expected surfaces to be an object")
	}

	for (const key of ["primary", "secondary", "accent", "neutral", "base"]) {
		if (!ramps?.[key]) {
			throw new TypeError(`Missing required ramp: ${key}`)
		}
	}

	const roleRamps = createAllRoleRamps(ramps, mode)
	const surface = surfaces.base
	const baseReferences = [app.bg, surface.bg]
	const coreComposition = createRoleComposition({
		mode,
		axis,
		app,
		surface,
		roleRamps,
		neutralRamp: roleRamps.neutral
	})

	const primary = createRoleRecipe({
		mode,
		role: "primary",
		roleRamp: roleRamps.primary,
		neutralRamp: roleRamps.neutral,
		surface,
		app,
		axis,
		composition: coreComposition.primary,
		separationReferences: baseReferences
	})
	const secondary = createRoleRecipe({
		mode,
		role: "secondary",
		roleRamp: roleRamps.secondary,
		neutralRamp: roleRamps.neutral,
		surface,
		app,
		axis,
		composition: coreComposition.secondary,
		separationReferences: [...baseReferences, primary.solid.bg]
	})
	const accent = createRoleRecipe({
		mode,
		role: "accent",
		roleRamp: roleRamps.accent,
		neutralRamp: roleRamps.neutral,
		surface,
		app,
		axis,
		composition: coreComposition.accent,
		separationReferences: [...baseReferences, primary.solid.bg, secondary.solid.bg]
	})
	const neutral = createRoleRecipe({
		mode,
		role: "neutral",
		roleRamp: roleRamps.neutral,
		neutralRamp: roleRamps.neutral,
		surface,
		app,
		axis,
		separationReferences: [...baseReferences, primary.solid.bg, secondary.solid.bg, accent.solid.bg]
	})
	const success = createRoleRecipe({
		mode,
		role: "success",
		roleRamp: roleRamps.success,
		neutralRamp: roleRamps.neutral,
		surface,
		app,
		axis,
		separationReferences: [...baseReferences, primary.solid.bg, secondary.solid.bg, accent.solid.bg]
	})
	const warning = createRoleRecipe({
		mode,
		role: "warning",
		roleRamp: roleRamps.warning,
		neutralRamp: roleRamps.neutral,
		surface,
		app,
		axis,
		separationReferences: [...baseReferences, primary.solid.bg, secondary.solid.bg, accent.solid.bg, success.solid.bg]
	})
	const danger = createRoleRecipe({
		mode,
		role: "danger",
		roleRamp: roleRamps.danger,
		neutralRamp: roleRamps.neutral,
		surface,
		app,
		axis,
		separationReferences: [
			...baseReferences,
			primary.solid.bg,
			secondary.solid.bg,
			accent.solid.bg,
			success.solid.bg,
			warning.solid.bg
		]
	})
	const info = createRoleRecipe({
		mode,
		role: "info",
		roleRamp: roleRamps.info,
		neutralRamp: roleRamps.neutral,
		surface,
		app,
		axis,
		separationReferences: [
			...baseReferences,
			primary.solid.bg,
			secondary.solid.bg,
			accent.solid.bg,
			success.solid.bg,
			warning.solid.bg,
			danger.solid.bg
		]
	})

	return {
		primary,
		secondary,
		accent,
		neutral,
		success,
		warning,
		danger,
		info
	}
}

function createGeneratedRoleRamps(ramps, mode) {
	const derivedSeeds = Object.fromEntries(
		GENERATED_ROLE_KEYS.map(role => {
			if (role === "success") {
				return [role, deriveSeedFromRamp(ramps.secondary, 90, mode)]
			}

			if (role === "warning") {
				return [role, deriveSeedFromRamp(ramps.accent, -35, mode)]
			}

			if (role === "danger") {
				return [role, deriveSeedFromRamp(ramps.primary, 150, mode)]
			}

			return [role, deriveSeedFromRamp(ramps.secondary, 0, mode)]
		})
	)

	return {
		success: createRamp(derivedSeeds.success),
		warning: createRamp(derivedSeeds.warning),
		danger: createRamp(derivedSeeds.danger),
		info: createRamp(derivedSeeds.info)
	}
}

function deriveSeedFromRamp(ramp, hueShift, mode) {
	const source = {
		...hexToOklch(ramp.seed),
		...ramp.oklch
	}

	return oklchToHex({
		l: mode === MODE_LIGHT ? 0.54 : 0.68,
		c: Math.min(0.24, Math.max(0.08, clampChroma(source.c))),
		h: normalizeHue(source.h + hueShift)
	})
}

function createAllRoleRamps(ramps, mode) {
	const generatedRamps = createGeneratedRoleRamps(ramps, mode)

	return {
		primary: ramps.primary,
		secondary: ramps.secondary,
		accent: ramps.accent,
		neutral: ramps.neutral,
		success: generatedRamps.success,
		warning: generatedRamps.warning,
		danger: generatedRamps.danger,
		info: generatedRamps.info
	}
}

function createRoleRecipe({
	mode,
	role,
	roleRamp,
	neutralRamp,
	surface,
	app,
	axis,
	composition,
	separationReferences
}) {
	if (!ROLE_KEYS.includes(role)) {
		throw new TypeError(`Unknown role: ${role}`)
	}

	const targets = ROLE_TONE_TARGETS[mode]
	const solidMinimumDifference =
		role === "accent" ? SEMANTIC_SEPARATION_TARGETS.accentPeer : SEMANTIC_SEPARATION_TARGETS.rolePeer

	return {
		solid: createSolidTreatment({
			mode,
			targets,
			roleRamp,
			neutralRamp,
			app,
			axis,
			composition,
			separationReferences,
			minimumDifference: solidMinimumDifference
		}),
		soft: createSoftTreatment({
			mode,
			targets,
			roleRamp,
			neutralRamp,
			app,
			axis,
			separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		}),
		outline: createOutlineTreatment({
			targets,
			roleRamp,
			neutralRamp,
			surface,
			mode,
			axis,
			separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		}),
		ghost: createGhostTreatment({
			targets,
			roleRamp,
			neutralRamp,
			surface,
			mode,
			axis,
			separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		})
	}
}

function createSolidTreatment({
	mode,
	targets,
	roleRamp,
	neutralRamp,
	app,
	axis,
	composition,
	separationReferences,
	minimumDifference
}) {
	const roleFgCandidates = createForegroundCandidates({
		mode,
		primaryRamp: neutralRamp,
		fallbackRamp: roleRamp
	})
	const solidBackgroundCandidates =
		composition?.solidBackgroundCandidates ??
		createRoleToneCandidates({
			mode,
			axis,
			roleRamp,
			treatment: "solid",
			references: separationReferences,
			minimumDifference
		})
	const solidPairForegroundCandidates = composition?.foregroundCandidates ?? roleFgCandidates
	const solidPair = pickReadablePair({
		backgroundCandidates: solidBackgroundCandidates,
		foregroundCandidates: solidPairForegroundCandidates,
		minimumContrastRatio: CONTRAST_TARGETS.roleText,
		preferredBg: solidBackgroundCandidates[0]
	})
	const solidTone = getToneForColor(roleRamp, solidPair.bg)
	const solidChildCandidates = createRoleStateCandidates({
		mode,
		axis,
		roleRamp,
		baseColor: solidPair.bg,
		baseTone: solidTone,
		state: "child",
		references: separationReferences,
		minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
	})
	const solidChildTone = getToneForCandidateColor(roleRamp, solidChildCandidates[0], axis.backgroundTone)

	return createNestedInteractiveRecipe({
		bg: solidPair.bg,
		fgCandidates: [solidPair.fg, ...roleFgCandidates],
		borderCandidates: getRoleToneColors(roleRamp, targets.solidBorder),
		hoverBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: solidPair.bg,
			baseTone: solidTone,
			state: "hover",
			references: separationReferences,
			minimumDifference
		}),
		activeBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: solidPair.bg,
			baseTone: solidTone,
			state: "active",
			references: separationReferences,
			minimumDifference
		}),
		childBgCandidates: solidChildCandidates,
		childHoverBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: solidChildCandidates[0],
			baseTone: solidChildTone,
			state: "childHover",
			references: separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		}),
		childActiveBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: solidChildCandidates[0],
			baseTone: solidChildTone,
			state: "childActive",
			references: separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		}),
		minimumFgContrast: CONTRAST_TARGETS.roleText,
		parentBg: app.bg
	})
}

function createSoftTreatment({
	mode,
	targets,
	roleRamp,
	neutralRamp,
	app,
	axis,
	separationReferences,
	minimumDifference
}) {
	const roleFgCandidates = createForegroundCandidates({
		mode,
		primaryRamp: roleRamp,
		fallbackRamp: neutralRamp
	})
	const softBackgroundCandidates = createRoleToneCandidates({
		mode,
		axis,
		roleRamp,
		treatment: "soft",
		references: separationReferences,
		minimumDifference
	})
	const softPair = pickReadablePair({
		backgroundCandidates: softBackgroundCandidates,
		foregroundCandidates: roleFgCandidates,
		minimumContrastRatio: CONTRAST_TARGETS.roleText,
		preferredBg: softBackgroundCandidates[0]
	})
	const softTone = getToneForColor(roleRamp, softPair.bg)
	const softChildCandidates = createRoleStateCandidates({
		mode,
		axis,
		roleRamp,
		baseColor: softPair.bg,
		baseTone: softTone,
		state: "child",
		references: separationReferences,
		minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
	})
	const softChildTone = getToneForCandidateColor(roleRamp, softChildCandidates[0], axis.backgroundTone)

	return createNestedInteractiveRecipe({
		bg: softPair.bg,
		fgCandidates: [softPair.fg, ...roleFgCandidates],
		borderCandidates: getRoleToneColors(roleRamp, targets.softBorder),
		hoverBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: softPair.bg,
			baseTone: softTone,
			state: "hover",
			references: separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		}),
		activeBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: softPair.bg,
			baseTone: softTone,
			state: "active",
			references: separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		}),
		childBgCandidates: softChildCandidates,
		childHoverBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: softChildCandidates[0],
			baseTone: softChildTone,
			state: "childHover",
			references: separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		}),
		childActiveBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: softChildCandidates[0],
			baseTone: softChildTone,
			state: "childActive",
			references: separationReferences,
			minimumDifference: SEMANTIC_SEPARATION_TARGETS.roleSurface
		}),
		minimumFgContrast: CONTRAST_TARGETS.roleText,
		parentBg: app.bg
	})
}

function createOutlineTreatment({
	mode,
	targets,
	roleRamp,
	neutralRamp,
	surface,
	axis,
	separationReferences,
	minimumDifference
}) {
	const foregroundCandidates = createForegroundCandidates({
		mode,
		primaryRamp: roleRamp,
		fallbackRamp: neutralRamp
	})
	const outlinePair = pickReadablePair({
		backgroundCandidates: [surface.bg],
		foregroundCandidates,
		minimumContrastRatio: CONTRAST_TARGETS.roleText
	})
	const outlineHoverCandidates = createRoleToneCandidates({
		mode,
		axis,
		roleRamp,
		treatment: "outline",
		references: separationReferences,
		minimumDifference
	})
	const outlineHoverTone = getToneForCandidateColor(roleRamp, outlineHoverCandidates[0], axis.backgroundTone)

	return createInteractiveRecipe({
		bg: surface.bg,
		fgCandidates: [outlinePair.fg, ...foregroundCandidates],
		borderCandidates: getRoleToneColors(roleRamp, targets.outlineBorder),
		hoverBgCandidates: outlineHoverCandidates,
		activeBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: outlineHoverCandidates[0],
			baseTone: outlineHoverTone,
			state: "active",
			references: separationReferences,
			minimumDifference
		}),
		minimumFgContrast: CONTRAST_TARGETS.roleText,
		parentBg: surface.bg
	})
}

function createGhostTreatment({
	mode,
	targets,
	roleRamp,
	neutralRamp,
	surface,
	axis,
	separationReferences,
	minimumDifference
}) {
	const foregroundCandidates = createForegroundCandidates({
		mode,
		primaryRamp: roleRamp,
		fallbackRamp: neutralRamp
	})
	const ghostPair = pickReadablePair({
		backgroundCandidates: [surface.bg],
		foregroundCandidates,
		minimumContrastRatio: CONTRAST_TARGETS.roleText
	})
	const ghostHoverCandidates = createRoleToneCandidates({
		mode,
		axis,
		roleRamp,
		treatment: "ghost",
		references: separationReferences,
		minimumDifference
	})
	const ghostHoverTone = getToneForCandidateColor(roleRamp, ghostHoverCandidates[0], axis.backgroundTone)

	return createInteractiveRecipe({
		bg: surface.bg,
		fgCandidates: [ghostPair.fg, ...foregroundCandidates],
		borderCandidates: getRoleToneColors(neutralRamp, targets.outlineBorder),
		hoverBgCandidates: ghostHoverCandidates,
		activeBgCandidates: createRoleStateCandidates({
			mode,
			axis,
			roleRamp,
			baseColor: ghostHoverCandidates[0],
			baseTone: ghostHoverTone,
			state: "active",
			references: separationReferences,
			minimumDifference
		}),
		minimumFgContrast: CONTRAST_TARGETS.roleText,
		parentBg: surface.bg
	})
}

function getRoleToneColors(ramp, stops) {
	return stops.map(stop => getRampColor(ramp, stop))
}

function getToneForColor(ramp, color) {
	for (const tone of TONE_STOPS) {
		if (getRampColor(ramp, tone) === color) {
			return tone
		}
	}

	throw new TypeError("Expected a color from the supplied role ramp")
}

function getToneForCandidateColor(ramp, color, fallbackTone) {
	if (!color) {
		return fallbackTone
	}

	return getToneForColor(ramp, color)
}
