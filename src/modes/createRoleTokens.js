import { MODE_LIGHT, MODE_DARK, ROLE_KEYS, GENERATED_ROLE_KEYS } from "../defaults.js"
import { createRamp, getRampColor, getTextCandidates, TONE_STOPS } from "../ramps/createRamp.js"
import { hexToOklch, oklchToHex, normalizeHue, clampChroma } from "../color/oklch.js"
import { CONTRAST_TARGETS } from "../recipes/contrastTargets.js"
import { createInteractiveRecipe } from "../recipes/createInteractiveRecipe.js"
import { createNestedInteractiveRecipe } from "../recipes/createNestedInteractiveRecipe.js"

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

export function createRoleTokens({ mode, app, surfaces, ramps }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
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

	return {
		primary: createRoleRecipe({
			mode,
			role: "primary",
			roleRamp: roleRamps.primary,
			neutralRamp: roleRamps.neutral,
			surface,
			app
		}),
		secondary: createRoleRecipe({
			mode,
			role: "secondary",
			roleRamp: roleRamps.secondary,
			neutralRamp: roleRamps.neutral,
			surface,
			app
		}),
		accent: createRoleRecipe({
			mode,
			role: "accent",
			roleRamp: roleRamps.accent,
			neutralRamp: roleRamps.neutral,
			surface,
			app
		}),
		neutral: createRoleRecipe({
			mode,
			role: "neutral",
			roleRamp: roleRamps.neutral,
			neutralRamp: roleRamps.neutral,
			surface,
			app
		}),
		success: createRoleRecipe({
			mode,
			role: "success",
			roleRamp: roleRamps.success,
			neutralRamp: roleRamps.neutral,
			surface,
			app
		}),
		warning: createRoleRecipe({
			mode,
			role: "warning",
			roleRamp: roleRamps.warning,
			neutralRamp: roleRamps.neutral,
			surface,
			app
		}),
		danger: createRoleRecipe({
			mode,
			role: "danger",
			roleRamp: roleRamps.danger,
			neutralRamp: roleRamps.neutral,
			surface,
			app
		}),
		info: createRoleRecipe({
			mode,
			role: "info",
			roleRamp: roleRamps.info,
			neutralRamp: roleRamps.neutral,
			surface,
			app
		})
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

function createRoleRecipe({ mode, role, roleRamp, neutralRamp, surface, app }) {
	if (!ROLE_KEYS.includes(role)) {
		throw new TypeError(`Unknown role: ${role}`)
	}

	const targets = ROLE_TONE_TARGETS[mode]

	return {
		solid: createSolidTreatment({ mode, targets, roleRamp, neutralRamp, app }),
		soft: createSoftTreatment({ mode, targets, roleRamp, neutralRamp, app }),
		outline: createOutlineTreatment({ targets, roleRamp, neutralRamp, surface, mode }),
		ghost: createGhostTreatment({ targets, roleRamp, neutralRamp, surface, mode })
	}
}

function createSolidTreatment({ mode, targets, roleRamp, neutralRamp, app }) {
	return createNestedInteractiveRecipe({
		bg: getRoleToneColors(roleRamp, targets.solid)[0],
		fgCandidates: [...getTextCandidates(neutralRamp, mode), ...getTextCandidates(roleRamp, mode)],
		borderCandidates: getRoleToneColors(roleRamp, targets.solidBorder),
		hoverBgCandidates: getRoleToneColors(roleRamp, targets.solidHover),
		activeBgCandidates: getRoleToneColors(roleRamp, targets.solidActive),
		childBgCandidates: getRoleToneColors(roleRamp, targets.solidChild),
		childHoverBgCandidates: getRoleToneColors(
			roleRamp,
			shiftToneStops(targets.solidChild, getOppositeDirection(mode), 1)
		),
		childActiveBgCandidates: getRoleToneColors(
			roleRamp,
			shiftToneStops(targets.solidChild, getOppositeDirection(mode), 2)
		),
		minimumFgContrast: CONTRAST_TARGETS.roleText,
		parentBg: app.bg
	})
}

function createSoftTreatment({ mode, targets, roleRamp, neutralRamp, app }) {
	return createNestedInteractiveRecipe({
		bg: getRoleToneColors(roleRamp, targets.soft)[0],
		fgCandidates: [...getTextCandidates(roleRamp, mode), ...getTextCandidates(neutralRamp, mode)],
		borderCandidates: getRoleToneColors(roleRamp, targets.softBorder),
		hoverBgCandidates: getRoleToneColors(roleRamp, targets.softHover),
		activeBgCandidates: getRoleToneColors(roleRamp, targets.softActive),
		childBgCandidates: getRoleToneColors(roleRamp, shiftToneStops(targets.soft, getOppositeDirection(mode), 1)),
		childHoverBgCandidates: getRoleToneColors(
			roleRamp,
			shiftToneStops(targets.softHover, getOppositeDirection(mode), 1)
		),
		childActiveBgCandidates: getRoleToneColors(
			roleRamp,
			shiftToneStops(targets.softActive, getOppositeDirection(mode), 1)
		),
		minimumFgContrast: CONTRAST_TARGETS.roleText,
		parentBg: app.bg
	})
}

function createOutlineTreatment({ mode, targets, roleRamp, neutralRamp, surface }) {
	return createInteractiveRecipe({
		bg: surface.bg,
		fgCandidates: [...getTextCandidates(roleRamp, mode), ...getTextCandidates(neutralRamp, mode)],
		borderCandidates: getRoleToneColors(roleRamp, targets.outlineBorder),
		hoverBgCandidates: getRoleToneColors(roleRamp, targets.outlineHover),
		activeBgCandidates: getRoleToneColors(roleRamp, targets.outlineActive),
		minimumFgContrast: CONTRAST_TARGETS.roleText,
		parentBg: surface.bg
	})
}

function createGhostTreatment({ mode, targets, roleRamp, neutralRamp, surface }) {
	return createInteractiveRecipe({
		bg: surface.bg,
		fgCandidates: [...getTextCandidates(roleRamp, mode), ...getTextCandidates(neutralRamp, mode)],
		borderCandidates: getRoleToneColors(neutralRamp, targets.outlineBorder),
		hoverBgCandidates: getRoleToneColors(roleRamp, targets.outlineHover),
		activeBgCandidates: getRoleToneColors(roleRamp, targets.outlineActive),
		minimumFgContrast: CONTRAST_TARGETS.roleText,
		parentBg: surface.bg
	})
}

function getRoleToneColors(ramp, stops) {
	return stops.map(stop => getRampColor(ramp, stop))
}

function getOppositeDirection(mode) {
	return mode === MODE_LIGHT ? -1 : 1
}

function shiftToneStops(stops, direction, steps) {
	return stops.map(stop => shiftTone(stop, direction, steps))
}

function shiftTone(tone, direction, steps) {
	const index = TONE_STOPS.indexOf(tone)

	if (index === -1) {
		throw new TypeError("Expected a valid tone stop")
	}

	const nextIndex = Math.min(TONE_STOPS.length - 1, Math.max(0, index + direction * steps))

	return TONE_STOPS[nextIndex]
}
