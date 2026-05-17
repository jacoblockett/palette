export function createPalette(_input = {}) {
	const light = {}
	const dark = {}
	const modes = {
		light,
		dark
	}

	return {
		mode: "light",
		inverseMode: "dark",
		source: {},
		current: light,
		inverse: dark,
		modes
	}
}
