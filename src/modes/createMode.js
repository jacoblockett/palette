import { createAppTokens } from "./createAppTokens.js"
import { createSurfaceTokens } from "./createSurfaceTokens.js"

export function createMode({ mode, ramps }) {
	const app = createAppTokens({ mode, ramps })
	const surfaces = createSurfaceTokens({ mode, app, ramps })

	return {
		app,
		surfaces,
		roles: {},
		ramps
	}
}
