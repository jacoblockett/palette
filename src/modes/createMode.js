import { createAppTokens } from "./createAppTokens.js"
import { createRoleTokens } from "./createRoleTokens.js"
import { createSurfaceTokens } from "./createSurfaceTokens.js"

export function createMode({ mode, ramps }) {
	const app = createAppTokens({ mode, ramps })
	const surfaces = createSurfaceTokens({ mode, app, ramps })
	const roles = createRoleTokens({ mode, app, surfaces, ramps })

	return {
		app,
		surfaces,
		roles,
		ramps
	}
}
