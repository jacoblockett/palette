import { createAppTokens } from "./createAppTokens.js"
import { createRoleTokens } from "./createRoleTokens.js"
import { createSurfaceTokens } from "./createSurfaceTokens.js"

export function createMode({ mode, ramps, axis }) {
	const app = createAppTokens({ mode, ramps, axis })
	const surfaces = createSurfaceTokens({ mode, app, ramps, axis })
	const roles = createRoleTokens({ mode, app, surfaces, ramps, axis })

	return {
		app,
		surfaces,
		roles,
		ramps
	}
}
