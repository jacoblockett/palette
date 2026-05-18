import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { getRampColor, TONE_STOPS } from "../ramps/createRamp.js"
import { CONTRAST_TARGETS } from "../recipes/contrastTargets.js"
import { createForegroundCandidates } from "../recipes/createForegroundCandidates.js"
import { createNestedInteractiveRecipe } from "../recipes/createNestedInteractiveRecipe.js"
import { MODE_TONE_TARGETS } from "./toneTargets.js"

export function createSurfaceTokens({ mode, app, ramps }) {
	if (mode !== MODE_LIGHT && mode !== MODE_DARK) {
		throw new TypeError('Expected mode to be "light" or "dark"')
	}

	if (app === null || Array.isArray(app) || typeof app !== "object") {
		throw new TypeError("Expected app to be an object")
	}

	if (!ramps?.base || !ramps?.neutral) {
		throw new TypeError("Expected base and neutral ramps")
	}

	const targets = MODE_TONE_TARGETS[mode]
	const fgCandidates = createForegroundCandidates({
		mode,
		primaryRamp: ramps.neutral,
		fallbackRamp: ramps.neutral
	})
	const borderCandidates = [
		getRampColor(ramps.neutral, mode === MODE_LIGHT ? 40 : 30),
		getRampColor(ramps.neutral, mode === MODE_LIGHT ? 50 : 40),
		getRampColor(ramps.neutral, mode === MODE_LIGHT ? 60 : 50)
	]

	return {
		base: createSurfaceRecipe({
			mode,
			surfaceTone: targets.surfaceBase,
			appTone: targets.appBg,
			app,
			ramps,
			fgCandidates,
			borderCandidates
		}),
		raised: createSurfaceRecipe({
			mode,
			surfaceTone: targets.surfaceRaised,
			appTone: targets.appBg,
			app,
			ramps,
			fgCandidates,
			borderCandidates
		}),
		sunken: createSurfaceRecipe({
			mode,
			surfaceTone: targets.surfaceSunken,
			appTone: targets.appBg,
			app,
			ramps,
			fgCandidates,
			borderCandidates
		}),
		overlay: createSurfaceRecipe({
			mode,
			surfaceTone: targets.surfaceOverlay,
			appTone: targets.appBg,
			app,
			ramps,
			fgCandidates,
			borderCandidates
		})
	}
}

function createSurfaceRecipe({ mode, surfaceTone, appTone, app, ramps, fgCandidates, borderCandidates }) {
	const oppositeDirection = mode === MODE_LIGHT ? -1 : 1
	const childDirection = getDirectionAwayFromTone(surfaceTone, appTone, mode)
	const childTone = shiftTone(surfaceTone, childDirection, 1)

	return createNestedInteractiveRecipe({
		bg: getRampColor(ramps.base, surfaceTone),
		fgCandidates,
		borderCandidates,
		hoverBgCandidates: [
			getRampColor(ramps.base, shiftTone(surfaceTone, oppositeDirection, 1)),
			getRampColor(ramps.base, shiftTone(surfaceTone, oppositeDirection, 2))
		],
		activeBgCandidates: [
			getRampColor(ramps.base, shiftTone(surfaceTone, oppositeDirection, 2)),
			getRampColor(ramps.base, shiftTone(surfaceTone, oppositeDirection, 3))
		],
		childBgCandidates: [getRampColor(ramps.base, childTone)],
		childHoverBgCandidates: [
			getRampColor(ramps.base, shiftTone(childTone, oppositeDirection, 1)),
			getRampColor(ramps.base, shiftTone(childTone, oppositeDirection, 2))
		],
		childActiveBgCandidates: [
			getRampColor(ramps.base, shiftTone(childTone, oppositeDirection, 2)),
			getRampColor(ramps.base, shiftTone(childTone, oppositeDirection, 3))
		],
		minimumFgContrast: CONTRAST_TARGETS.bodyText,
		parentBg: app.bg
	})
}

function getDirectionAwayFromTone(tone, parentTone, mode) {
	if (tone === parentTone) {
		return mode === MODE_LIGHT ? -1 : 1
	}

	return tone > parentTone ? 1 : -1
}

function shiftTone(tone, direction, steps) {
	const index = TONE_STOPS.indexOf(tone)

	if (index === -1) {
		throw new TypeError("Expected a valid tone stop")
	}

	const nextIndex = Math.min(TONE_STOPS.length - 1, Math.max(0, index + direction * steps))

	return TONE_STOPS[nextIndex]
}
