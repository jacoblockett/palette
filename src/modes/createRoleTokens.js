import { MODE_LIGHT, MODE_DARK, ROLE_KEYS, GENERATED_ROLE_KEYS } from "../defaults.js"
import {
	createRamp,
	getRampColor,
	getSolidCandidates,
	getSoftCandidates,
	getTextCandidates
} from "../ramps/createRamp.js"
import { hexToOklch, oklchToHex, normalizeHue, clampChroma, clampLightness } from "../color/oklch.js"
import { createInteractiveRecipe } from "../recipes/createInteractiveRecipe.js"
import { createNestedInteractiveRecipe } from "../recipes/createNestedInteractiveRecipe.js"

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

	const roleRamps = createAllRoleRamps(ramps)
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

function createGeneratedRoleRamps(ramps) {
	const derivedSeeds = Object.fromEntries(
		GENERATED_ROLE_KEYS.map(role => {
			if (role === "success") {
				return [role, deriveSeedFromRamp(ramps.secondary, 90)]
			}

			if (role === "warning") {
				return [role, deriveSeedFromRamp(ramps.accent, -35)]
			}

			if (role === "danger") {
				return [role, deriveSeedFromRamp(ramps.primary, 150)]
			}

			return [role, deriveSeedFromRamp(ramps.secondary, 0)]
		})
	)

	return {
		success: createRamp(derivedSeeds.success),
		warning: createRamp(derivedSeeds.warning),
		danger: createRamp(derivedSeeds.danger),
		info: createRamp(derivedSeeds.info)
	}
}

function deriveSeedFromRamp(ramp, hueShift) {
	const source = {
		...hexToOklch(ramp.seed),
		...ramp.oklch
	}

	return oklchToHex({
		l: Math.min(0.72, Math.max(0.45, clampLightness(source.l))),
		c: Math.min(0.24, Math.max(0.08, clampChroma(source.c))),
		h: normalizeHue(source.h + hueShift)
	})
}

function createAllRoleRamps(ramps) {
	const generatedRamps = createGeneratedRoleRamps(ramps)

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

	return {
		solid: createSolidTreatment({ mode, roleRamp, neutralRamp, app }),
		soft: createSoftTreatment({ mode, roleRamp, neutralRamp, app }),
		outline: createOutlineTreatment({ mode, roleRamp, neutralRamp, surface }),
		ghost: createGhostTreatment({ mode, roleRamp, neutralRamp, surface })
	}
}

function createSolidTreatment({ mode, roleRamp, neutralRamp, app }) {
	const solidCandidates = getSolidCandidates(roleRamp, mode)

	return createNestedInteractiveRecipe({
		bg: solidCandidates[0],
		fgCandidates: [...getTextCandidates(neutralRamp, mode), ...getTextCandidates(roleRamp, mode)],
		borderCandidates: getModeRoleStops(roleRamp, mode, [20, 30, 40, 50], [70, 80, 90, 95]),
		hoverBgCandidates: getModeRoleStops(roleRamp, mode, [30, 40, 50, 60], [60, 70, 80, 90]),
		activeBgCandidates: getModeRoleStops(roleRamp, mode, [20, 30, 40, 50], [70, 80, 90, 95]),
		childBgCandidates: getModeRoleStops(roleRamp, mode, [70, 80, 90, 95], [20, 30, 40, 50]),
		childHoverBgCandidates: getModeRoleStops(roleRamp, mode, [60, 70, 80, 90], [30, 40, 50, 60]),
		childActiveBgCandidates: getModeRoleStops(roleRamp, mode, [50, 60, 70, 80], [40, 50, 60, 70]),
		minimumFgContrast: 4.5,
		parentBg: app.bg
	})
}

function createSoftTreatment({ mode, roleRamp, neutralRamp, app }) {
	const softCandidates = getSoftCandidates(roleRamp, mode)

	return createNestedInteractiveRecipe({
		bg: softCandidates[0],
		fgCandidates: [...getTextCandidates(roleRamp, mode), ...getTextCandidates(neutralRamp, mode)],
		borderCandidates: getModeRoleStops(roleRamp, mode, [60, 70, 80], [30, 40, 50]),
		hoverBgCandidates: getModeRoleStops(roleRamp, mode, [90, 80, 70], [20, 30, 40]),
		activeBgCandidates: getModeRoleStops(roleRamp, mode, [80, 70, 60], [30, 40, 50]),
		childBgCandidates: getModeRoleStops(roleRamp, mode, [95, 90, 80], [20, 30, 40]),
		childHoverBgCandidates: getModeRoleStops(roleRamp, mode, [90, 80, 70], [30, 40, 50]),
		childActiveBgCandidates: getModeRoleStops(roleRamp, mode, [80, 70, 60], [40, 50, 60]),
		minimumFgContrast: 4.5,
		parentBg: app.bg
	})
}

function createOutlineTreatment({ mode, roleRamp, neutralRamp, surface }) {
	return createInteractiveRecipe({
		bg: surface.bg,
		fgCandidates: [...getTextCandidates(roleRamp, mode), ...getTextCandidates(neutralRamp, mode)],
		borderCandidates: getModeRoleStops(roleRamp, mode, [40, 50, 60], [60, 70, 80]),
		hoverBgCandidates: getModeRoleStops(roleRamp, mode, [95, 90, 80], [10, 20, 30]),
		activeBgCandidates: getModeRoleStops(roleRamp, mode, [90, 80, 70], [20, 30, 40]),
		minimumFgContrast: 4.5,
		parentBg: surface.bg
	})
}

function createGhostTreatment({ mode, roleRamp, neutralRamp, surface }) {
	return createInteractiveRecipe({
		bg: surface.bg,
		fgCandidates: [...getTextCandidates(roleRamp, mode), ...getTextCandidates(neutralRamp, mode)],
		borderCandidates: getModeRoleStops(neutralRamp, mode, [90, 80, 70], [20, 30, 40]),
		hoverBgCandidates: getModeRoleStops(roleRamp, mode, [95, 90, 80], [10, 20, 30]),
		activeBgCandidates: getModeRoleStops(roleRamp, mode, [90, 80, 70], [20, 30, 40]),
		minimumFgContrast: 4.5,
		parentBg: surface.bg
	})
}

function getModeRoleStops(ramp, mode, lightStops, darkStops) {
	const stops = mode === MODE_LIGHT ? lightStops : darkStops

	return stops.map(stop => getRampColor(ramp, stop))
}
