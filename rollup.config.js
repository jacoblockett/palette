import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import copy from "rollup-plugin-copy"
import css from "rollup-plugin-css-only"
import svelte from "rollup-plugin-svelte"

const production = process.env.NODE_ENV === "production"

export default [
	{
		input: "src/index.js",
		output: [
			{ file: "dist/index.cjs", format: "cjs", sourcemap: !production },
			{ file: "dist/index.mjs", format: "es", sourcemap: !production }
		],
		plugins: [resolve(), commonjs()]
	},
	{
		input: "demo/src/main.js",
		output: {
			file: "demo/dist/script.js",
			format: "iife",
			name: "paletteDemo",
			sourcemap: !production
		},
		plugins: [
			svelte({
				compilerOptions: {
					dev: !production
				},
				emitCss: true
			}),
			css({ output: "style.css" }),
			resolve({
				browser: true,
				exportConditions: ["svelte"],
				extensions: [".mjs", ".js", ".svelte"],
				dedupe: ["svelte"]
			}),
			commonjs(),
			production && terser(),
			copy({
				targets: [{ src: "demo/public/index.html", dest: "demo/dist" }]
			})
		].filter(Boolean)
	}
]
