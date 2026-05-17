import { createPalette } from "../src/index.js"

const palette = createPalette({
	mode: "light",
	seeds: {
		primary: "#4f46e5",
		secondary: "#0f766e",
		accent: "#d97706",
		neutral: "#475569",
		base: "#94a3b8"
	}
})

const app = document.getElementById("app")
const style = document.createElement("style")

style.textContent = `
	:root {
		color-scheme: light;
		font-family: "Segoe UI", Arial, sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		background: #f8fafc;
		color: #0f172a;
	}

	#app {
		padding: 24px;
	}

	.demo-shell {
		display: grid;
		gap: 24px;
	}

	.mode-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 24px;
	}

	.mode-card {
		display: grid;
		gap: 20px;
		padding: 20px;
		border: 1px solid;
		border-radius: 20px;
	}

	.mode-card h1,
	.mode-card h2,
	.mode-card h3,
	.mode-card h4,
	.mode-card p {
		margin: 0;
	}

	.section-block {
		display: grid;
		gap: 16px;
		padding: 16px;
		border: 1px solid;
		border-radius: 16px;
	}

	.group-stack {
		display: grid;
		gap: 14px;
	}

	.group-card {
		display: grid;
		gap: 12px;
		padding: 14px;
		border: 1px solid;
		border-radius: 14px;
	}

	.swatch-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 12px;
	}

	.swatch {
		display: grid;
		gap: 6px;
		min-height: 110px;
		padding: 12px;
		border: 1px solid rgba(15, 23, 42, 0.12);
		border-radius: 12px;
		align-content: space-between;
	}

	.swatch strong,
	.swatch span {
		display: block;
		line-height: 1.3;
		word-break: break-word;
	}

	.swatch strong {
		font-size: 0.84rem;
	}

	.swatch span {
		font-size: 0.76rem;
		opacity: 0.9;
	}

	@media (max-width: 720px) {
		#app {
			padding: 16px;
		}

		.mode-card {
			padding: 16px;
		}

		.section-block,
		.group-card {
			padding: 12px;
		}
	}
`

document.head.append(style)

let html = '<div class="demo-shell"><div class="mode-grid">'

for (const [label, mode] of [
	["Light", palette.modes.light],
	["Dark", palette.modes.dark]
]) {
	html += `<section class="mode-card" style="background:${mode.app.bg};color:${mode.app.fg};border-color:${mode.app.border}">`
	html += `<header class="group-stack"><h1>${label}</h1><p>Generated ${label.toLowerCase()} mode tokens</p></header>`

	html += `<section class="section-block" style="background:${mode.surfaces.raised.bg};border-color:${mode.app.strongBorder}">`
	html += "<h2>App</h2>"
	html += '<div class="swatch-grid">'
	for (const [tokenName, value] of Object.entries(mode.app)) {
		html += `<article class="swatch" style="background:${value};color:${mode.app.fg}"><strong>${tokenName}</strong><span>${value}</span></article>`
	}
	html += "</div></section>"

	html += `<section class="section-block" style="background:${mode.surfaces.base.bg};border-color:${mode.app.strongBorder}">`
	html += "<h2>Surfaces</h2>"
	html += '<div class="group-stack">'
	for (const [surfaceName, surface] of Object.entries(mode.surfaces)) {
		html += `<section class="group-card" style="background:${surface.bg};color:${mode.app.fg};border-color:${surface.border}">`
		html += `<h3>${surfaceName}</h3>`
		html += '<div class="swatch-grid">'
		for (const [tokenPath, value] of [
			["bg", surface.bg],
			["fg", surface.fg],
			["border", surface.border],
			["hover.bg", surface.hover.bg],
			["active.bg", surface.active.bg],
			["child.bg", surface.child.bg],
			["child.hover.bg", surface.child.hover.bg],
			["child.active.bg", surface.child.active.bg]
		]) {
			html += `<article class="swatch" style="background:${value};color:${mode.app.fg}"><strong>${surfaceName}.${tokenPath}</strong><span>${value}</span></article>`
		}
		html += "</div></section>"
	}
	html += "</div></section>"

	html += `<section class="section-block" style="background:${mode.surfaces.overlay.bg};border-color:${mode.app.strongBorder}">`
	html += "<h2>Roles</h2>"
	html += '<div class="group-stack">'
	for (const [roleName, role] of Object.entries(mode.roles)) {
		html += `<section class="group-card" style="background:${role.soft.bg};color:${mode.app.fg};border-color:${role.soft.border}">`
		html += `<h3>${roleName}</h3>`
		html += '<div class="group-stack">'
		for (const [treatmentName, treatment] of Object.entries(role)) {
			html += `<section class="group-card" style="background:${treatment.bg};color:${mode.app.fg};border-color:${treatment.border}">`
			html += `<h4>${treatmentName}</h4>`
			html += '<div class="swatch-grid">'
			for (const [tokenPath, value] of treatmentName === "solid" || treatmentName === "soft"
				? [
						["bg", treatment.bg],
						["fg", treatment.fg],
						["border", treatment.border],
						["hover.bg", treatment.hover.bg],
						["active.bg", treatment.active.bg],
						["child.bg", treatment.child.bg],
						["child.hover.bg", treatment.child.hover.bg],
						["child.active.bg", treatment.child.active.bg]
					]
				: [
						["bg", treatment.bg],
						["fg", treatment.fg],
						["border", treatment.border],
						["hover.bg", treatment.hover.bg],
						["active.bg", treatment.active.bg]
					]) {
				html += `<article class="swatch" style="background:${value};color:${mode.app.fg}"><strong>${roleName}.${treatmentName}.${tokenPath}</strong><span>${value}</span></article>`
			}
			html += "</div></section>"
		}
		html += "</div></section>"
	}
	html += "</div></section>"

	html += "</section>"
}

html += "</div></div>"

app.innerHTML = html
