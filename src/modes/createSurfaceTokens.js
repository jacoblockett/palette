import { MODE_LIGHT, MODE_DARK } from "../defaults.js"
import { getRampColor, getTextCandidates } from "../ramps/createRamp.js"
import { createNestedInteractiveRecipe } from "../recipes/createNestedInteractiveRecipe.js"

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

	return mode === MODE_LIGHT ? createLightSurfaceTokens(app, ramps) : createDarkSurfaceTokens(app, ramps)
}

function createLightSurfaceTokens(app, ramps) {
	const fgCandidates = getTextCandidates(ramps.neutral, MODE_LIGHT)
	const borderCandidates = [
		getRampColor(ramps.neutral, 40),
		getRampColor(ramps.neutral, 50),
		getRampColor(ramps.neutral, 60)
	]
	const hoverBgCandidates = [getRampColor(ramps.base, 90), getRampColor(ramps.base, 80), getRampColor(ramps.base, 70)]
	const activeBgCandidates = [getRampColor(ramps.base, 80), getRampColor(ramps.base, 70), getRampColor(ramps.base, 60)]
	const childBgCandidates = [getRampColor(ramps.base, 95), getRampColor(ramps.base, 90), getRampColor(ramps.base, 80)]
	const childHoverBgCandidates = [
		getRampColor(ramps.base, 90),
		getRampColor(ramps.base, 80),
		getRampColor(ramps.base, 70)
	]
	const childActiveBgCandidates = [
		getRampColor(ramps.base, 80),
		getRampColor(ramps.base, 70),
		getRampColor(ramps.base, 60)
	]

	return {
		base: createNestedInteractiveRecipe({
			bg: getRampColor(ramps.base, 90),
			fgCandidates,
			borderCandidates,
			hoverBgCandidates,
			activeBgCandidates,
			childBgCandidates,
			childHoverBgCandidates,
			childActiveBgCandidates,
			parentBg: app.bg
		}),
		raised: createNestedInteractiveRecipe({
			bg: getRampColor(ramps.base, 95),
			fgCandidates,
			borderCandidates,
			hoverBgCandidates,
			activeBgCandidates,
			childBgCandidates,
			childHoverBgCandidates,
			childActiveBgCandidates,
			parentBg: app.bg
		}),
		sunken: createNestedInteractiveRecipe({
			bg: getRampColor(ramps.base, 80),
			fgCandidates,
			borderCandidates,
			hoverBgCandidates,
			activeBgCandidates,
			childBgCandidates,
			childHoverBgCandidates,
			childActiveBgCandidates,
			parentBg: app.bg
		}),
		overlay: createNestedInteractiveRecipe({
			bg: getRampColor(ramps.base, 100),
			fgCandidates,
			borderCandidates,
			hoverBgCandidates,
			activeBgCandidates,
			childBgCandidates,
			childHoverBgCandidates,
			childActiveBgCandidates,
			parentBg: app.bg
		})
	}
}

function createDarkSurfaceTokens(app, ramps) {
	const fgCandidates = getTextCandidates(ramps.neutral, MODE_DARK)
	const borderCandidates = [
		getRampColor(ramps.neutral, 30),
		getRampColor(ramps.neutral, 40),
		getRampColor(ramps.neutral, 50)
	]
	const hoverBgCandidates = [getRampColor(ramps.base, 20), getRampColor(ramps.base, 30), getRampColor(ramps.base, 40)]
	const activeBgCandidates = [getRampColor(ramps.base, 30), getRampColor(ramps.base, 40), getRampColor(ramps.base, 50)]
	const childBgCandidates = [getRampColor(ramps.base, 20), getRampColor(ramps.base, 30), getRampColor(ramps.base, 40)]
	const childHoverBgCandidates = [
		getRampColor(ramps.base, 30),
		getRampColor(ramps.base, 40),
		getRampColor(ramps.base, 50)
	]
	const childActiveBgCandidates = [
		getRampColor(ramps.base, 40),
		getRampColor(ramps.base, 50),
		getRampColor(ramps.base, 60)
	]

	return {
		base: createNestedInteractiveRecipe({
			bg: getRampColor(ramps.base, 10),
			fgCandidates,
			borderCandidates,
			hoverBgCandidates,
			activeBgCandidates,
			childBgCandidates,
			childHoverBgCandidates,
			childActiveBgCandidates,
			parentBg: app.bg
		}),
		raised: createNestedInteractiveRecipe({
			bg: getRampColor(ramps.base, 20),
			fgCandidates,
			borderCandidates,
			hoverBgCandidates,
			activeBgCandidates,
			childBgCandidates,
			childHoverBgCandidates,
			childActiveBgCandidates,
			parentBg: app.bg
		}),
		sunken: createNestedInteractiveRecipe({
			bg: getRampColor(ramps.base, 5),
			fgCandidates,
			borderCandidates,
			hoverBgCandidates,
			activeBgCandidates,
			childBgCandidates,
			childHoverBgCandidates,
			childActiveBgCandidates,
			parentBg: app.bg
		}),
		overlay: createNestedInteractiveRecipe({
			bg: getRampColor(ramps.base, 30),
			fgCandidates,
			borderCandidates,
			hoverBgCandidates,
			activeBgCandidates,
			childBgCandidates,
			childHoverBgCandidates,
			childActiveBgCandidates,
			parentBg: app.bg
		})
	}
}
