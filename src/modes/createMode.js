import { createAppTokens } from "./createAppTokens.js"

export function createMode({ mode, ramps }) {
	return {
		app: createAppTokens({ mode, ramps }),
		surfaces: {},
		roles: {},
		ramps
	}
}
