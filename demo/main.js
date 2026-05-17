import { createPalette } from "../src/index.js"
import { contrastRatio } from "../src/color/contrast.js"

const SEED_KEYS = ["primary", "secondary", "accent", "neutral", "base"]

const INITIAL_SEEDS = {
	primary: "#4f46e5",
	secondary: "#0f766e",
	accent: "#d97706",
	neutral: "#475569",
	base: "#94a3b8"
}

const state = {
	mode: "light",
	seeds: { ...INITIAL_SEEDS }
}

const app = document.getElementById("app")
const style = document.createElement("style")

style.textContent = `
	:root {
		font-family: "Segoe UI", Arial, sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		background: #e2e8f0;
	}

	button,
	input {
		font: inherit;
	}

	.demo-shell {
		min-height: 100vh;
		background: var(--app-bg);
		color: var(--app-fg);
	}

	.demo-toolbar {
		position: sticky;
		top: 0;
		z-index: 10;
		display: grid;
		gap: 16px;
		padding: 18px 20px;
		background: var(--toolbar-bg);
		color: var(--toolbar-fg);
		border-bottom: 1px solid var(--toolbar-border);
		backdrop-filter: blur(16px);
	}

	.demo-toolbar-head,
	.demo-toolbar-controls,
	.demo-toolbar-meta {
		display: grid;
		gap: 12px;
	}

	.demo-toolbar-head {
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		align-items: end;
	}

	.demo-toolbar h1,
	.demo-toolbar h2,
	.demo-toolbar h3,
	.demo-toolbar p,
	.demo-toolbar span,
	.demo-preview h2,
	.demo-preview h3,
	.demo-preview h4,
	.demo-preview p,
	.demo-reference h2,
	.demo-reference h3,
	.demo-reference p {
		margin: 0;
	}

	.demo-toolbar-controls {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	}

	.demo-seed-control {
		display: grid;
		gap: 8px;
		padding: 12px;
		background: var(--control-bg);
		border: 1px solid var(--control-border);
		border-radius: 16px;
	}

	.demo-seed-control label,
	.demo-toolbar-meta strong {
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.demo-seed-row {
		display: grid;
		grid-template-columns: 52px minmax(0, 1fr);
		gap: 8px;
	}

	.demo-seed-row input[type="color"] {
		inline-size: 52px;
		block-size: 44px;
		padding: 0;
		border: 1px solid var(--control-border);
		border-radius: 12px;
		background: transparent;
	}

	.demo-seed-row input[type="text"] {
		inline-size: 100%;
		padding: 10px 12px;
		border: 1px solid var(--control-border);
		border-radius: 12px;
		background: var(--input-bg);
		color: inherit;
	}

	.demo-seed-row input:focus,
	.demo-mode-button:focus,
	.demo-randomize:focus {
		outline: 2px solid var(--focus-ring);
		outline-offset: 2px;
	}

	.demo-toolbar-meta {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		align-items: center;
	}

	.demo-mode-toggle {
		display: inline-grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		padding: 4px;
		background: var(--control-bg);
		border: 1px solid var(--control-border);
		border-radius: 999px;
	}

	.demo-mode-button,
	.demo-randomize,
	.demo-action,
	.demo-tab,
	.demo-status,
	.demo-state-chip {
		border: 1px solid transparent;
		border-radius: 999px;
	}

	.demo-mode-button,
	.demo-randomize {
		padding: 10px 14px;
		background: transparent;
		color: inherit;
		cursor: pointer;
	}

	.demo-mode-button[data-active="true"] {
		background: var(--active-button-bg);
		color: var(--active-button-fg);
		border-color: var(--active-button-border);
	}

	.demo-randomize {
		justify-self: start;
		background: var(--accent-bg);
		color: var(--accent-fg);
		border-color: var(--accent-border);
	}

	.demo-summary {
		display: grid;
		gap: 4px;
		padding: 12px;
		background: var(--control-bg);
		border: 1px solid var(--control-border);
		border-radius: 16px;
	}

	.demo-main {
		display: grid;
		gap: 24px;
		padding: 24px;
	}

	.demo-preview {
		display: grid;
		gap: 20px;
		padding: 24px;
		background: var(--preview-bg);
		color: var(--preview-fg);
		border: 1px solid var(--preview-border);
		border-radius: 28px;
	}

	.demo-topbar {
		display: grid;
		grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
		gap: 20px;
	}

	.demo-sidebar,
	.demo-hero,
	.demo-card,
	.demo-reference {
		border-radius: 24px;
	}

	.demo-sidebar {
		display: grid;
		gap: 14px;
		padding: 18px;
		background: var(--sidebar-bg);
		color: var(--sidebar-fg);
		border: 1px solid var(--sidebar-border);
	}

	.demo-nav,
	.demo-tabs,
	.demo-actions,
	.demo-status-row,
	.demo-state-row,
	.demo-token-grid,
	.demo-reference-grid,
	.demo-chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.demo-tab,
	.demo-status,
	.demo-state-chip {
		padding: 8px 12px;
	}

	.demo-hero {
		display: grid;
		gap: 16px;
		padding: 22px;
		background: var(--hero-bg);
		color: var(--hero-fg);
		border: 1px solid var(--hero-border);
	}

	.demo-copy {
		display: grid;
		gap: 8px;
		max-inline-size: 64ch;
	}

	.demo-actions {
		align-items: center;
	}

	.demo-action {
		padding: 10px 16px;
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 16px;
	}

	.demo-card {
		display: grid;
		gap: 14px;
		padding: 18px;
		border: 1px solid;
	}

	.demo-nested {
		display: grid;
		gap: 12px;
		padding: 14px;
		border: 1px solid;
		border-radius: 18px;
	}

	.demo-state-panel {
		display: grid;
		gap: 12px;
		padding: 18px;
		border: 1px solid var(--preview-border);
		border-radius: 24px;
		background: var(--reference-bg);
	}

	.demo-state-group {
		display: grid;
		gap: 10px;
		padding: 14px;
		border: 1px solid var(--reference-border);
		border-radius: 18px;
	}

	.demo-reference {
		display: grid;
		gap: 16px;
		padding: 20px;
		background: var(--reference-bg);
		color: var(--reference-fg);
		border: 1px solid var(--reference-border);
	}

	.demo-reference-section {
		display: grid;
		gap: 12px;
	}

	.demo-token-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	}

	.demo-swatch {
		display: grid;
		gap: 6px;
		min-height: 88px;
		padding: 12px;
		border: 1px solid rgba(15, 23, 42, 0.08);
		border-radius: 16px;
		align-content: space-between;
	}

	.demo-swatch strong,
	.demo-swatch span {
		display: block;
		word-break: break-word;
		line-height: 1.3;
	}

	.demo-swatch strong {
		font-size: 0.82rem;
	}

	.demo-swatch span {
		font-size: 0.76rem;
		opacity: 0.9;
	}

	@media (max-width: 900px) {
		.demo-topbar {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 720px) {
		.demo-main {
			padding: 16px;
		}

		.demo-toolbar {
			padding: 14px;
		}

		.demo-preview,
		.demo-reference {
			padding: 16px;
		}
	}
`

document.head.append(style)

function randomHexColor() {
	const channels = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256))

	return `#${channels.map(channel => channel.toString(16).padStart(2, "0")).join("")}`
}

function randomizeSeeds() {
	state.seeds = Object.fromEntries(SEED_KEYS.map(key => [key, randomHexColor()]))
	render()
}

function getPalette() {
	return createPalette({
		mode: state.mode,
		seeds: state.seeds
	})
}

function escapeHtml(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;")
}

function pickDemoTextColor(background, mode) {
	const candidates = [
		mode.app.fg,
		mode.app.mutedFg,
		mode.app.subtleFg,
		mode.app.bg,
		mode.surfaces.base.fg,
		mode.surfaces.base.bg,
		mode.surfaces.raised.fg,
		mode.surfaces.raised.bg
	].filter((candidate, index, values) => candidate && values.indexOf(candidate) === index)

	let bestCandidate = candidates[0]
	let bestContrast = contrastRatio(bestCandidate, background)

	for (const candidate of candidates.slice(1)) {
		const candidateContrast = contrastRatio(candidate, background)

		if (candidateContrast > bestContrast) {
			bestCandidate = candidate
			bestContrast = candidateContrast
		}
	}

	return bestCandidate
}

function renderSwatch(label, value, mode) {
	const textColor = pickDemoTextColor(value, mode)

	return `<article class="demo-swatch" style="background:${value};color:${textColor}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></article>`
}

function renderToolbar(palette) {
	const mode = palette.current

	return `
		<header
			class="demo-toolbar"
			style="--toolbar-bg:${mode.surfaces.raised.bg};--toolbar-fg:${mode.surfaces.raised.fg};--toolbar-border:${mode.surfaces.raised.border};--control-bg:${mode.surfaces.overlay.bg};--control-border:${mode.surfaces.overlay.border};--input-bg:${mode.surfaces.base.bg};--focus-ring:${mode.app.focusRing};--active-button-bg:${mode.roles.primary.soft.bg};--active-button-fg:${mode.roles.primary.soft.fg};--active-button-border:${mode.roles.primary.soft.border};--accent-bg:${mode.roles.accent.solid.bg};--accent-fg:${mode.roles.accent.solid.fg};--accent-border:${mode.roles.accent.solid.border};"
		>
			<div class="demo-toolbar-head">
				<div class="demo-toolbar-copy">
					<h1>Palette Generator</h1>
					<p>Adjust the five required seeds, flip modes, and preview the generated semantic UI tokens in realtime.</p>
				</div>
				<div class="demo-summary">
					<strong>Palette Summary</strong>
					<span>Current mode: ${escapeHtml(palette.mode)}</span>
					<span>Inverse mode: ${escapeHtml(palette.inverseMode)}</span>
				</div>
			</div>
			<div class="demo-toolbar-controls">
				${SEED_KEYS.map(
					key => `
						<div class="demo-seed-control">
							<label for="seed-${escapeHtml(key)}">${escapeHtml(key)}</label>
							<div class="demo-seed-row">
								<input id="seed-${escapeHtml(key)}" data-seed-key="${escapeHtml(key)}" type="color" value="${escapeHtml(state.seeds[key])}" />
								<input data-seed-key="${escapeHtml(key)}" type="text" value="${escapeHtml(state.seeds[key])}" spellcheck="false" />
							</div>
						</div>
					`
				).join("")}
			</div>
			<div class="demo-toolbar-meta">
				<div class="demo-mode-toggle">
					<button type="button" class="demo-mode-button" data-mode="light" data-active="${String(state.mode === "light")}">Light</button>
					<button type="button" class="demo-mode-button" data-mode="dark" data-active="${String(state.mode === "dark")}">Dark</button>
				</div>
				<button type="button" class="demo-randomize" data-action="randomize">Randomize</button>
			</div>
		</header>
	`
}

function renderPreview(palette) {
	const mode = palette.current

	return `
		<section
			class="demo-preview"
			style="--preview-bg:${mode.app.bg};--preview-fg:${mode.app.fg};--preview-border:${mode.app.border};--sidebar-bg:${mode.surfaces.sunken.bg};--sidebar-fg:${mode.surfaces.sunken.fg};--sidebar-border:${mode.surfaces.sunken.border};--hero-bg:${mode.surfaces.raised.bg};--hero-fg:${mode.surfaces.raised.fg};--hero-border:${mode.surfaces.raised.border};--reference-bg:${mode.surfaces.overlay.bg};--reference-fg:${mode.surfaces.overlay.fg};--reference-border:${mode.surfaces.overlay.border};"
		>
			<div class="demo-topbar">
				<aside class="demo-sidebar">
					<div class="demo-copy">
						<h3>Workspace</h3>
						<p>Semantic navigation preview using generated neutral and primary role treatments.</p>
					</div>
					<nav class="demo-nav">
						<span class="demo-tab" style="background:${mode.roles.primary.soft.bg};color:${mode.roles.primary.soft.fg};border-color:${mode.roles.primary.soft.border}">Overview</span>
						<span class="demo-tab" style="background:${mode.roles.neutral.ghost.hover.bg};color:${mode.roles.neutral.ghost.hover.fg};border-color:${mode.roles.neutral.ghost.hover.border}">Reports</span>
						<span class="demo-tab" style="background:${mode.roles.neutral.ghost.bg};color:${mode.roles.neutral.ghost.fg};border-color:${mode.roles.neutral.ghost.border}">Settings</span>
					</nav>
					<div class="demo-copy">
						<h4>Selection</h4>
						<p style="color:${mode.app.mutedFg}">Focus rings, borders, and text all derive from the generated ramps.</p>
					</div>
				</aside>
				<section class="demo-hero">
					<div class="demo-copy">
						<h2>Build semantic UI color systems from five seed colors</h2>
						<p style="color:${mode.app.mutedFg}">This preview applies generated app, surface, and role tokens to a small interface shell so you can inspect how light and dark modes behave as a system.</p>
					</div>
					<div class="demo-actions">
						<span class="demo-action" style="background:${mode.roles.primary.solid.bg};color:${mode.roles.primary.solid.fg};border-color:${mode.roles.primary.solid.border}">Primary Action</span>
						<span class="demo-action" style="background:${mode.roles.secondary.outline.bg};color:${mode.roles.secondary.outline.fg};border-color:${mode.roles.secondary.outline.border}">Secondary Action</span>
						<span class="demo-action" style="background:${mode.roles.neutral.ghost.bg};color:${mode.roles.neutral.ghost.fg};border-color:${mode.roles.neutral.ghost.border}">Ghost Action</span>
					</div>
					<div class="demo-status-row">
						<span class="demo-status" style="background:${mode.roles.success.soft.bg};color:${mode.roles.success.soft.fg};border-color:${mode.roles.success.soft.border}">Success</span>
						<span class="demo-status" style="background:${mode.roles.warning.soft.bg};color:${mode.roles.warning.soft.fg};border-color:${mode.roles.warning.soft.border}">Warning</span>
						<span class="demo-status" style="background:${mode.roles.danger.soft.bg};color:${mode.roles.danger.soft.fg};border-color:${mode.roles.danger.soft.border}">Danger</span>
						<span class="demo-status" style="background:${mode.roles.info.soft.bg};color:${mode.roles.info.soft.fg};border-color:${mode.roles.info.soft.border}">Info</span>
					</div>
				</section>
			</div>
			<div class="demo-grid">
				<section class="demo-card" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
					<div class="demo-copy">
						<h3>Base Surface</h3>
						<p style="color:${mode.app.mutedFg}">Standard card body using the base surface treatment.</p>
					</div>
					<div class="demo-nested" style="background:${mode.surfaces.base.child.bg};color:${mode.surfaces.base.child.fg};border-color:${mode.surfaces.base.child.border}">
						<strong>Nested container</strong>
						<span style="color:${mode.app.subtleFg}">Child tokens provide one bounded layer for embedded UI.</span>
					</div>
				</section>
				<section class="demo-card" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg};border-color:${mode.surfaces.raised.border}">
					<div class="demo-copy">
						<h3>Raised Surface</h3>
						<p style="color:${mode.app.mutedFg}">Good for emphasis blocks, top-level cards, or feature highlights.</p>
					</div>
					<div class="demo-chip-row">
						<span class="demo-status" style="background:${mode.roles.primary.soft.bg};color:${mode.roles.primary.soft.fg};border-color:${mode.roles.primary.soft.border}">Primary</span>
						<span class="demo-status" style="background:${mode.roles.accent.soft.bg};color:${mode.roles.accent.soft.fg};border-color:${mode.roles.accent.soft.border}">Accent</span>
					</div>
					<div class="demo-nested" style="background:${mode.surfaces.raised.child.hover.bg};color:${mode.surfaces.raised.child.hover.fg};border-color:${mode.surfaces.raised.child.hover.border}">
						<strong>Hover sample</strong>
						<span style="color:${mode.app.subtleFg}">Static token preview for nested hover state.</span>
					</div>
				</section>
				<section class="demo-card" style="background:${mode.surfaces.sunken.bg};color:${mode.surfaces.sunken.fg};border-color:${mode.surfaces.sunken.border}">
					<div class="demo-copy">
						<h3>Sunken Surface</h3>
						<p style="color:${mode.app.mutedFg}">Useful for side panels, wells, and grouped controls.</p>
					</div>
					<div class="demo-nested" style="background:${mode.surfaces.sunken.child.active.bg};color:${mode.surfaces.sunken.child.active.fg};border-color:${mode.surfaces.sunken.child.active.border}">
						<strong>Active child sample</strong>
						<span style="color:${mode.app.subtleFg}">Rendered without CSS hover so token states stay explicit.</span>
					</div>
				</section>
			</div>
			<section class="demo-state-panel">
				<div class="demo-copy">
					<h3>State Samples</h3>
					<p style="color:${mode.app.mutedFg}">Rest, Hover, and Active are rendered directly from generated tokens rather than browser pseudo states.</p>
				</div>
				<div class="demo-grid">
					<div class="demo-state-group">
						<h4>Primary Solid</h4>
						<div class="demo-state-row">
							<span class="demo-state-chip" style="background:${mode.roles.primary.solid.bg};color:${mode.roles.primary.solid.fg};border-color:${mode.roles.primary.solid.border}">Rest</span>
							<span class="demo-state-chip" style="background:${mode.roles.primary.solid.hover.bg};color:${mode.roles.primary.solid.hover.fg};border-color:${mode.roles.primary.solid.hover.border}">Hover</span>
							<span class="demo-state-chip" style="background:${mode.roles.primary.solid.active.bg};color:${mode.roles.primary.solid.active.fg};border-color:${mode.roles.primary.solid.active.border}">Active</span>
						</div>
					</div>
					<div class="demo-state-group">
						<h4>Secondary Outline</h4>
						<div class="demo-state-row">
							<span class="demo-state-chip" style="background:${mode.roles.secondary.outline.bg};color:${mode.roles.secondary.outline.fg};border-color:${mode.roles.secondary.outline.border}">Rest</span>
							<span class="demo-state-chip" style="background:${mode.roles.secondary.outline.hover.bg};color:${mode.roles.secondary.outline.hover.fg};border-color:${mode.roles.secondary.outline.hover.border}">Hover</span>
							<span class="demo-state-chip" style="background:${mode.roles.secondary.outline.active.bg};color:${mode.roles.secondary.outline.active.fg};border-color:${mode.roles.secondary.outline.active.border}">Active</span>
						</div>
					</div>
					<div class="demo-state-group">
						<h4>Neutral Ghost</h4>
						<div class="demo-state-row">
							<span class="demo-state-chip" style="background:${mode.roles.neutral.ghost.bg};color:${mode.roles.neutral.ghost.fg};border-color:${mode.roles.neutral.ghost.border}">Rest</span>
							<span class="demo-state-chip" style="background:${mode.roles.neutral.ghost.hover.bg};color:${mode.roles.neutral.ghost.hover.fg};border-color:${mode.roles.neutral.ghost.hover.border}">Hover</span>
							<span class="demo-state-chip" style="background:${mode.roles.neutral.ghost.active.bg};color:${mode.roles.neutral.ghost.active.fg};border-color:${mode.roles.neutral.ghost.active.border}">Active</span>
						</div>
					</div>
				</div>
			</section>
		</section>
	`
}

function renderTokenReference(palette) {
	const mode = palette.current

	return `
		<section class="demo-reference">
			<div class="demo-copy">
				<h2>Compact Token Reference</h2>
				<p style="color:${mode.app.mutedFg}">A compact view of app tokens and selected role treatments for quick scanning.</p>
			</div>
			<section class="demo-reference-section">
				<h3>App Tokens</h3>
				<div class="demo-token-grid">
					${Object.entries(mode.app)
						.map(([label, value]) => renderSwatch(`app.${label}`, value, mode))
						.join("")}
				</div>
			</section>
			<section class="demo-reference-section">
				<h3>Role Treatments</h3>
				<div class="demo-reference-grid">
					${["primary", "secondary", "accent", "success", "warning", "danger", "info"]
						.map(
							roleName => `
								<div class="demo-state-group">
									<h4>${escapeHtml(roleName)}</h4>
									<div class="demo-token-grid">
										${[
											[`${roleName}.solid.bg`, mode.roles[roleName].solid.bg],
											[`${roleName}.solid.fg`, mode.roles[roleName].solid.fg],
											[`${roleName}.solid.border`, mode.roles[roleName].solid.border],
											[`${roleName}.soft.bg`, mode.roles[roleName].soft.bg],
											[`${roleName}.soft.fg`, mode.roles[roleName].soft.fg],
											[`${roleName}.soft.border`, mode.roles[roleName].soft.border]
										]
											.map(([label, value]) => renderSwatch(label, value, mode))
											.join("")}
									</div>
								</div>
							`
						)
						.join("")}
				</div>
			</section>
		</section>
	`
}

function render() {
	const palette = getPalette()
	const mode = palette.current

	app.innerHTML = `
		<div
			class="demo-shell"
			style="--app-bg:${mode.app.bg};--app-fg:${mode.app.fg};--app-border:${mode.app.border}"
		>
			${renderToolbar(palette)}
			<main class="demo-main">
				${renderPreview(palette)}
				${renderTokenReference(palette)}
			</main>
		</div>
	`
}

app.addEventListener("input", event => {
	const target = event.target

	if (!(target instanceof HTMLInputElement) || !target.dataset.seedKey) {
		return
	}

	if (target.type === "color") {
		state.seeds = {
			...state.seeds,
			[target.dataset.seedKey]: target.value
		}
		render()
		return
	}

	const nextValue = target.value.trim().toLowerCase()

	if (!/^#(?:[\da-f]{3}|[\da-f]{6})$/.test(nextValue)) {
		return
	}

	state.seeds = {
		...state.seeds,
		[target.dataset.seedKey]:
			nextValue.length === 4
				? `#${nextValue[1]}${nextValue[1]}${nextValue[2]}${nextValue[2]}${nextValue[3]}${nextValue[3]}`
				: nextValue
	}
	render()
})

app.addEventListener("click", event => {
	const target = event.target

	if (!(target instanceof HTMLElement)) {
		return
	}

	const mode = target.dataset.mode
	const action = target.dataset.action

	if (mode === "light" || mode === "dark") {
		state.mode = mode
		render()
		return
	}

	if (action === "randomize") {
		randomizeSeeds()
	}
})

render()
