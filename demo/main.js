import { createPalette } from "../src/index.js"

const SEED_KEYS = ["primary", "secondary", "accent", "neutral", "base"]

const state = {
	mode: "light",
	seeds: randomizeSeedObject()
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

	html {
		scroll-behavior: smooth;
	}

	body {
		margin: 0;
		background: #dce4ee;
	}

	button,
	input {
		font: inherit;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.demo-shell {
		min-height: 100vh;
		padding-bottom: 240px;
		background: var(--app-bg);
		color: var(--app-fg);
	}

	.demo-nav {
		position: sticky;
		top: 0;
		z-index: 20;
		padding: 16px 24px;
		background: color-mix(in srgb, var(--nav-bg) 90%, transparent);
		backdrop-filter: blur(18px);
		border-bottom: 1px solid var(--nav-border);
	}

	.demo-nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.demo-brand {
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: 0.04em;
	}

	.demo-nav-links,
	.demo-nav-actions,
	.demo-hero-actions,
	.demo-pill-row,
	.demo-tab-row,
	.demo-state-row,
	.demo-compare-list,
	.demo-toolbar-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
	}

	.demo-main {
		display: grid;
		gap: 28px;
		max-width: 1200px;
		margin: 0 auto;
		padding: 28px 24px 0;
	}

	.demo-section,
	.demo-hero,
	.demo-dashboard,
	.demo-feature-card,
	.demo-workflow,
	.demo-compare-card,
	.demo-testimonial,
	.demo-faq-row,
	.demo-hero-visual,
	.demo-dashboard-card,
	.demo-dashboard-sidebar,
	.demo-dashboard-activity,
	.demo-dashboard-metric,
	.demo-dashboard-nested,
	.demo-toolbar {
		border: 1px solid;
		border-radius: 28px;
	}

	.demo-hero,
	.demo-dashboard,
	.demo-workflow,
	.demo-comparison,
	.demo-social,
	.demo-faq {
		display: grid;
		gap: 22px;
	}

	.demo-hero {
		grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
		padding: 28px;
	}

	.demo-badge,
	.demo-pill,
	.demo-tab,
	.demo-step-index,
	.demo-mini-state,
	.demo-status-chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 8px 14px;
		border: 1px solid;
		border-radius: 999px;
		white-space: nowrap;
	}

	.demo-copy {
		display: grid;
		gap: 14px;
		align-content: start;
	}

	.demo-copy h1,
	.demo-copy h2,
	.demo-copy h3,
	.demo-copy h4,
	.demo-copy p,
	.demo-section-head h2,
	.demo-section-head p,
	.demo-brand-lockup p,
	.demo-faq-row p,
	.demo-faq-row strong {
		margin: 0;
	}

	.demo-copy h1 {
		font-size: clamp(2.6rem, 4vw, 4.8rem);
		line-height: 0.98;
		letter-spacing: -0.04em;
	}

	.demo-copy h2,
	.demo-section-head h2 {
		font-size: clamp(1.7rem, 2.2vw, 2.5rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
	}

	.demo-copy p,
	.demo-section-head p,
	.demo-faq-row p {
		line-height: 1.6;
	}

	.demo-button {
		padding: 11px 16px;
		border: 1px solid var(--button-border);
		border-radius: 999px;
		background: var(--button-bg);
		color: var(--button-fg);
		cursor: pointer;
		transition:
			background-color 140ms ease,
			color 140ms ease,
			border-color 140ms ease,
			transform 140ms ease;
	}

	.demo-button:hover {
		background: var(--button-hover-bg);
		color: var(--button-hover-fg);
		border-color: var(--button-hover-border);
	}

	.demo-button:active {
		background: var(--button-active-bg);
		color: var(--button-active-fg);
		border-color: var(--button-active-border);
		transform: translateY(1px);
	}

	.demo-button:focus,
	.demo-toolbar input:focus {
		outline: 2px solid var(--focus-ring);
		outline-offset: 2px;
	}

	.demo-hero-visual {
		display: grid;
		gap: 16px;
		padding: 20px;
		align-content: start;
	}

	.demo-chart {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 10px;
		align-items: end;
		min-height: 140px;
	}

	.demo-chart-bar {
		border-radius: 18px 18px 10px 10px;
		min-height: 48px;
	}

	.demo-visual-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
	}

	.demo-visual-card,
	.demo-visual-panel {
		display: grid;
		gap: 10px;
		padding: 14px;
		border: 1px solid;
		border-radius: 20px;
	}

	.demo-dashboard {
		padding: 24px;
	}

	.demo-dashboard-grid {
		display: grid;
		grid-template-columns: 250px minmax(0, 1fr);
		gap: 18px;
	}

	.demo-dashboard-sidebar,
	.demo-dashboard-card,
	.demo-dashboard-activity,
	.demo-dashboard-metric,
	.demo-dashboard-nested {
		padding: 18px;
	}

	.demo-dashboard-sidebar {
		display: grid;
		gap: 16px;
		align-content: start;
	}

	.demo-dashboard-main {
		display: grid;
		gap: 16px;
	}

	.demo-metric-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	.demo-dashboard-card {
		display: grid;
		gap: 14px;
	}

	.demo-dashboard-card-header,
	.demo-faq-row {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 16px;
	}

	.demo-dashboard-activity-list,
	.demo-compare-list,
	.demo-workflow-grid,
	.demo-feature-grid,
	.demo-testimonial-grid,
	.demo-faq-grid {
		display: grid;
		gap: 14px;
	}

	.demo-dashboard-activity-item,
	.demo-compare-item {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.demo-dot {
		inline-size: 10px;
		block-size: 10px;
		border-radius: 999px;
		flex: none;
	}

	.demo-state-board {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
	}

	.demo-state-card {
		display: grid;
		gap: 12px;
		padding: 14px;
		border: 1px solid;
		border-radius: 20px;
	}

	.demo-feature-grid,
	.demo-testimonial-grid,
	.demo-faq-grid {
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
	}

	.demo-feature-card,
	.demo-testimonial,
	.demo-faq-row,
	.demo-compare-card,
	.demo-workflow {
		padding: 22px;
	}

	.demo-feature-card,
	.demo-testimonial,
	.demo-compare-card {
		display: grid;
		gap: 14px;
	}

	.demo-feature-marker {
		inline-size: 14px;
		block-size: 14px;
		border-radius: 999px;
	}

	.demo-workflow-grid {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.demo-step {
		display: grid;
		gap: 12px;
		padding: 18px;
		border: 1px solid;
		border-radius: 22px;
	}

	.demo-comparison-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}

	.demo-testimonial-quote {
		font-size: 1.04rem;
		line-height: 1.7;
	}

	.demo-toolbar {
		position: fixed;
		left: 50%;
		bottom: 20px;
		z-index: 30;
		display: grid;
		gap: 16px;
		inline-size: min(1180px, calc(100vw - 32px));
		padding: 18px;
		transform: translateX(-50%);
		box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
	}

	.demo-toolbar-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.demo-toolbar-title {
		display: grid;
		gap: 4px;
	}

	.demo-toolbar-title strong,
	.demo-seed-control label {
		font-size: 0.76rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.demo-seed-grid {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 12px;
	}

	.demo-seed-control {
		display: grid;
		gap: 8px;
		padding: 12px;
		border: 1px solid;
		border-radius: 20px;
	}

	.demo-seed-row {
		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		gap: 8px;
	}

	.demo-seed-row input[type="color"] {
		inline-size: 48px;
		block-size: 42px;
		padding: 0;
		border: 1px solid;
		border-radius: 14px;
		background: transparent;
	}

	.demo-seed-row input[type="text"] {
		inline-size: 100%;
		padding: 10px 12px;
		border: 1px solid;
		border-radius: 14px;
		background: transparent;
		color: inherit;
	}

	.demo-toolbar button,
	.demo-toolbar input {
		border-color: var(--toolbar-border);
	}

	@media (max-width: 1024px) {
		.demo-hero,
		.demo-dashboard-grid,
		.demo-comparison-grid,
		.demo-workflow-grid {
			grid-template-columns: 1fr;
		}

		.demo-metric-grid {
			grid-template-columns: 1fr;
		}

		.demo-seed-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 720px) {
		.demo-shell {
			padding-bottom: 360px;
		}

		.demo-nav,
		.demo-main {
			padding-left: 16px;
			padding-right: 16px;
		}

		.demo-hero,
		.demo-dashboard,
		.demo-feature-card,
		.demo-workflow,
		.demo-compare-card,
		.demo-testimonial,
		.demo-faq-row {
			padding: 18px;
		}

		.demo-toolbar {
			left: 0;
			right: 0;
			bottom: 0;
			inline-size: 100%;
			transform: none;
			border-radius: 24px 24px 0 0;
		}

		.demo-toolbar-head {
			flex-direction: column;
			align-items: stretch;
		}

		.demo-seed-grid {
			grid-template-columns: 1fr;
		}
	}
`

document.head.append(style)

function randomHexColor() {
	const channels = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256))

	return `#${channels.map(channel => channel.toString(16).padStart(2, "0")).join("")}`
}

function randomizeSeedObject() {
	return Object.fromEntries(SEED_KEYS.map(key => [key, randomHexColor()]))
}

function randomizeSeeds() {
	state.seeds = randomizeSeedObject()
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

function isValidHexInput(value) {
	return /^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(value.trim())
}

function treatmentStyle(treatment) {
	return [
		`--button-bg:${treatment.bg}`,
		`--button-fg:${treatment.fg}`,
		`--button-border:${treatment.border}`,
		`--button-hover-bg:${treatment.hover.bg}`,
		`--button-hover-fg:${treatment.hover.fg}`,
		`--button-hover-border:${treatment.hover.border}`,
		`--button-active-bg:${treatment.active.bg}`,
		`--button-active-fg:${treatment.active.fg}`,
		`--button-active-border:${treatment.active.border}`
	].join(";")
}

function renderButton(label, treatment, extraClassText = "") {
	return `<button type="button" class="demo-button ${escapeHtml(extraClassText)}" style="${treatmentStyle(treatment)}">${escapeHtml(label)}</button>`
}

function renderNav(mode) {
	return `
		<nav class="demo-nav" style="background:${mode.surfaces.overlay.bg};color:${mode.surfaces.overlay.fg};border-color:${mode.surfaces.overlay.border}">
			<div class="demo-nav-inner">
				<div class="demo-brand">palette</div>
				<div class="demo-nav-links">
					<a class="demo-button" href="#generator" style="${treatmentStyle(mode.roles.neutral.ghost)}">Generator</a>
					<a class="demo-button" href="#features" style="${treatmentStyle(mode.roles.neutral.ghost)}">Features</a>
					<a class="demo-button" href="#workflow" style="${treatmentStyle(mode.roles.neutral.ghost)}">Workflow</a>
					<a class="demo-button" href="#faq" style="${treatmentStyle(mode.roles.neutral.ghost)}">FAQ</a>
				</div>
				<div class="demo-nav-actions">
					${renderButton("Try the generator", mode.roles.primary.solid)}
				</div>
			</div>
		</nav>
	`
}

function renderHero(mode) {
	return `
		<section id="generator" class="demo-hero" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg};border-color:${mode.surfaces.raised.border}">
			<div class="demo-copy">
				<span class="demo-badge" style="background:${mode.roles.accent.soft.bg};color:${mode.roles.accent.soft.fg};border-color:${mode.roles.accent.soft.border}">Contrast-aware UI palettes</span>
				<h1>Generate complete UI palettes from five seed colors.</h1>
				<p style="color:${mode.app.mutedFg}">palette turns a compact set of directional seeds into app foundations, surfaces, semantic roles, hover states, active states, and one level of nested interaction colors for realistic interfaces.</p>
				<div class="demo-hero-actions">
					${renderButton("Generate a theme", mode.roles.primary.solid)}
					${renderButton("See the workflow", mode.roles.secondary.outline)}
				</div>
			</div>
			<div class="demo-hero-visual" style="background:${mode.surfaces.overlay.bg};color:${mode.surfaces.overlay.fg};border-color:${mode.surfaces.overlay.border}">
				<div class="demo-chart">
					<div class="demo-chart-bar" style="height:48px;background:${mode.roles.info.soft.bg}"></div>
					<div class="demo-chart-bar" style="height:84px;background:${mode.roles.primary.soft.bg}"></div>
					<div class="demo-chart-bar" style="height:66px;background:${mode.roles.secondary.soft.bg}"></div>
					<div class="demo-chart-bar" style="height:108px;background:${mode.roles.accent.soft.bg}"></div>
					<div class="demo-chart-bar" style="height:92px;background:${mode.roles.success.soft.bg}"></div>
					<div class="demo-chart-bar" style="height:74px;background:${mode.roles.warning.soft.bg}"></div>
				</div>
				<div class="demo-pill-row">
					<span class="demo-pill" style="background:${mode.roles.success.soft.bg};color:${mode.roles.success.soft.fg};border-color:${mode.roles.success.soft.border}">Healthy contrast</span>
					<span class="demo-pill" style="background:${mode.roles.info.soft.bg};color:${mode.roles.info.soft.fg};border-color:${mode.roles.info.soft.border}">Stateful tokens</span>
					<span class="demo-pill" style="background:${mode.roles.danger.soft.bg};color:${mode.roles.danger.soft.fg};border-color:${mode.roles.danger.soft.border}">No fixed defaults</span>
				</div>
				<div class="demo-visual-grid">
					<div class="demo-visual-card" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
						<strong>Launch overview</strong>
						<p style="color:${mode.app.mutedFg}">App-scale tokens that keep the first layer clean and legible.</p>
						${renderButton("Open workspace", mode.roles.primary.soft)}
					</div>
					<div class="demo-visual-panel" style="background:${mode.surfaces.base.child.bg};color:${mode.surfaces.base.child.fg};border-color:${mode.surfaces.base.child.border}">
						<strong>Nested panel</strong>
						<p style="color:${mode.app.subtleFg}">Child tokens create depth without recursive color drift.</p>
						<div class="demo-pill-row">
							<span class="demo-status-chip" style="background:${mode.roles.warning.soft.bg};color:${mode.roles.warning.soft.fg};border-color:${mode.roles.warning.soft.border}">Needs review</span>
							<span class="demo-status-chip" style="background:${mode.roles.info.soft.bg};color:${mode.roles.info.soft.fg};border-color:${mode.roles.info.soft.border}">In progress</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	`
}

function renderDashboardPreview(mode) {
	return `
		<section class="demo-dashboard" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
			<div class="demo-section-head">
				<h2>Dashboard preview</h2>
				<p style="color:${mode.app.mutedFg}">A realistic interface shell showing navigation, metrics, activity, nested content, and explicit rest, hover, and active treatments.</p>
			</div>
			<div class="demo-dashboard-grid">
				<aside class="demo-dashboard-sidebar" style="background:${mode.surfaces.sunken.bg};color:${mode.surfaces.sunken.fg};border-color:${mode.surfaces.sunken.border}">
					<div class="demo-brand-lockup">
						<strong>Preview workspace</strong>
						<p style="color:${mode.app.subtleFg}">Semantic navigation states built from the generated role system.</p>
					</div>
					<div class="demo-tab-row">
						<span class="demo-tab" style="background:${mode.roles.primary.soft.bg};color:${mode.roles.primary.soft.fg};border-color:${mode.roles.primary.soft.border}">Overview</span>
						<span class="demo-tab" style="background:${mode.roles.neutral.ghost.bg};color:${mode.roles.neutral.ghost.fg};border-color:${mode.roles.neutral.ghost.border}">Signals</span>
						<span class="demo-tab" style="background:${mode.roles.neutral.ghost.hover.bg};color:${mode.roles.neutral.ghost.hover.fg};border-color:${mode.roles.neutral.ghost.hover.border}">System</span>
					</div>
					${renderButton("New palette", mode.roles.secondary.outline)}
				</aside>
				<div class="demo-dashboard-main">
					<div class="demo-metric-grid">
						<div class="demo-dashboard-metric" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg};border-color:${mode.surfaces.raised.border}">
							<strong>Theme coverage</strong>
							<h3>94%</h3>
							<p style="color:${mode.app.mutedFg}">App, surfaces, roles, and nested interactions aligned.</p>
						</div>
						<div class="demo-dashboard-metric" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg};border-color:${mode.surfaces.raised.border}">
							<strong>Contrast pass rate</strong>
							<h3>4.5+</h3>
							<p style="color:${mode.app.mutedFg}">Foreground candidates resolve against their own generated backgrounds.</p>
						</div>
						<div class="demo-dashboard-metric" style="background:${mode.surfaces.overlay.bg};color:${mode.surfaces.overlay.fg};border-color:${mode.surfaces.overlay.border}">
							<strong>Semantic roles</strong>
							<h3>8 roles</h3>
							<p style="color:${mode.app.mutedFg}">Primary, secondary, accent, neutral, and four generated statuses.</p>
						</div>
					</div>
					<div class="demo-dashboard-card" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg};border-color:${mode.surfaces.raised.border}">
						<div class="demo-dashboard-card-header">
							<div class="demo-copy">
								<h3>Activity panel</h3>
								<p style="color:${mode.app.mutedFg}">Recent palette revisions, role updates, and rollout milestones.</p>
							</div>
							${renderButton("Review changes", mode.roles.primary.solid)}
						</div>
						<div class="demo-dashboard-activity-list">
							<div class="demo-dashboard-activity-item">
								<span class="demo-dot" style="background:${mode.roles.success.soft.bg}"></span>
								<span>App foundations aligned across both modes.</span>
							</div>
							<div class="demo-dashboard-activity-item">
								<span class="demo-dot" style="background:${mode.roles.warning.soft.bg}"></span>
								<span>Nested preview surfaced a softer active state for overlay panels.</span>
							</div>
							<div class="demo-dashboard-activity-item">
								<span class="demo-dot" style="background:${mode.roles.info.soft.bg}"></span>
								<span>Primary treatment tuned to feel stronger without losing legibility.</span>
							</div>
						</div>
						<div class="demo-dashboard-nested" style="background:${mode.surfaces.raised.child.bg};color:${mode.surfaces.raised.child.fg};border-color:${mode.surfaces.raised.child.border}">
							<strong>Nested review pane</strong>
							<p style="color:${mode.app.subtleFg}">One bounded child layer is enough to preview embedded cards, filter panels, and compact settings blocks.</p>
							${renderButton("Open nested view", mode.roles.neutral.ghost)}
						</div>
					</div>
					<div class="demo-state-board">
						<div class="demo-state-card" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
							<strong>Rest</strong>
							${renderButton("Primary action", mode.roles.primary.solid)}
						</div>
						<div class="demo-state-card" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
							<strong>Hover</strong>
							<button type="button" class="demo-button" style="--button-bg:${mode.roles.primary.solid.hover.bg};--button-fg:${mode.roles.primary.solid.hover.fg};--button-border:${mode.roles.primary.solid.hover.border};--button-hover-bg:${mode.roles.primary.solid.hover.bg};--button-hover-fg:${mode.roles.primary.solid.hover.fg};--button-hover-border:${mode.roles.primary.solid.hover.border};--button-active-bg:${mode.roles.primary.solid.hover.bg};--button-active-fg:${mode.roles.primary.solid.hover.fg};--button-active-border:${mode.roles.primary.solid.hover.border}">Primary action</button>
						</div>
						<div class="demo-state-card" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
							<strong>Active</strong>
							<button type="button" class="demo-button" style="--button-bg:${mode.roles.primary.solid.active.bg};--button-fg:${mode.roles.primary.solid.active.fg};--button-border:${mode.roles.primary.solid.active.border};--button-hover-bg:${mode.roles.primary.solid.active.bg};--button-hover-fg:${mode.roles.primary.solid.active.fg};--button-hover-border:${mode.roles.primary.solid.active.border};--button-active-bg:${mode.roles.primary.solid.active.bg};--button-active-fg:${mode.roles.primary.solid.active.fg};--button-active-border:${mode.roles.primary.solid.active.border}">Primary action</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	`
}

function renderFeatures(mode) {
	const features = [
		{
			title: "App foundations",
			copy: "Use generated app tokens to establish the global canvas, foreground contrast, borders, focus rings, and selection styling.",
			treatment: mode.roles.primary.soft
		},
		{
			title: "Surface depth",
			copy: "Base, raised, sunken, and overlay surfaces provide visual layering without inventing ad hoc container colors.",
			treatment: mode.roles.secondary.soft
		},
		{
			title: "Semantic roles",
			copy: "Primary, secondary, accent, neutral, success, warning, danger, and info map directly onto realistic interaction treatments.",
			treatment: mode.roles.accent.soft
		},
		{
			title: "Nested interactions",
			copy: "One child layer keeps embedded UI deterministic, legible, and bounded across hover and active states.",
			treatment: mode.roles.info.soft
		}
	]

	return `
		<section id="features" class="demo-section demo-features">
			<div class="demo-section-head">
				<h2>Designed around real interface states.</h2>
				<p style="color:${mode.app.mutedFg}">palette does more than tint a scale. It resolves foundations, depth, roles, and nested interactions into usable interface primitives.</p>
			</div>
			<div class="demo-feature-grid">
				${features
					.map(
						feature => `
							<article class="demo-feature-card" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg};border-color:${mode.surfaces.raised.border}">
								<span class="demo-feature-marker" style="background:${feature.treatment.bg};border-color:${feature.treatment.border}"></span>
								<h3>${escapeHtml(feature.title)}</h3>
								<p style="color:${mode.app.mutedFg}">${escapeHtml(feature.copy)}</p>
							</article>
						`
					)
					.join("")}
			</div>
		</section>
	`
}

function renderWorkflow(mode) {
	const steps = [
		"Choose five seeds",
		"Build tonal ramps",
		"Resolve contrast",
		"Apply semantic recipes"
	]

	return `
		<section id="workflow" class="demo-workflow" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
			<div class="demo-section-head">
				<h2>From seeds to usable UI.</h2>
				<p style="color:${mode.app.mutedFg}">The workflow stays compact, deterministic, and aligned with interface roles instead of raw scales.</p>
			</div>
			<div class="demo-workflow-grid">
				${steps
					.map(
						(step, index) => `
							<div class="demo-step" style="background:${mode.surfaces.base.child.bg};color:${mode.surfaces.base.child.fg};border-color:${mode.surfaces.base.child.border}">
								<span class="demo-step-index" style="background:${(index + 1) % 2 === 0 ? mode.roles.secondary.soft.bg : mode.roles.primary.soft.bg};color:${(index + 1) % 2 === 0 ? mode.roles.secondary.soft.fg : mode.roles.primary.soft.fg};border-color:${(index + 1) % 2 === 0 ? mode.roles.secondary.soft.border : mode.roles.primary.soft.border}">${index + 1}</span>
								<h3>${escapeHtml(step)}</h3>
								<p style="color:${mode.app.subtleFg}">Each stage contributes finite candidates that resolve into practical semantic tokens.</p>
							</div>
						`
					)
					.join("")}
			</div>
		</section>
	`
}

function renderComparison(mode) {
	return `
		<section class="demo-comparison">
			<div class="demo-section-head">
				<h2>From raw scales to semantic UI recipes.</h2>
				<p style="color:${mode.app.mutedFg}">A usable theme needs more than numbered hues. It needs role-aware decisions that hold up in context.</p>
			</div>
			<div class="demo-comparison-grid">
				<article class="demo-compare-card" style="background:${mode.surfaces.sunken.bg};color:${mode.surfaces.sunken.fg};border-color:${mode.surfaces.sunken.border}">
					<h3>Raw color scales</h3>
					<div class="demo-compare-list">
						<div class="demo-compare-item"><span class="demo-dot" style="background:${mode.roles.neutral.soft.bg}"></span><span>Good at showing spectrum coverage.</span></div>
						<div class="demo-compare-item"><span class="demo-dot" style="background:${mode.roles.neutral.soft.bg}"></span><span>Leaves component states to manual judgment.</span></div>
						<div class="demo-compare-item"><span class="demo-dot" style="background:${mode.roles.neutral.soft.bg}"></span><span>Usually drifts when nested surfaces appear.</span></div>
					</div>
				</article>
				<article class="demo-compare-card" style="background:${mode.roles.primary.soft.bg};color:${mode.roles.primary.soft.fg};border-color:${mode.roles.primary.soft.border}">
					<h3>Semantic UI recipes</h3>
					<div class="demo-compare-list">
						<div class="demo-compare-item"><span class="demo-dot" style="background:${mode.roles.success.soft.bg}"></span><span>Resolves contrast against each generated background.</span></div>
						<div class="demo-compare-item"><span class="demo-dot" style="background:${mode.roles.success.soft.bg}"></span><span>Maps directly to app, surface, and role treatments.</span></div>
						<div class="demo-compare-item"><span class="demo-dot" style="background:${mode.roles.success.soft.bg}"></span><span>Keeps nested interaction layers bounded and predictable.</span></div>
					</div>
				</article>
			</div>
		</section>
	`
}

function renderSocialProof(mode) {
	return `
		<section class="demo-social">
			<div class="demo-section-head">
				<h2>Built for teams shipping design systems.</h2>
				<p style="color:${mode.app.mutedFg}">Designers and engineers need palettes that stay coherent across real product states, not just moodboards.</p>
			</div>
			<div class="demo-testimonial-grid">
				<article class="demo-testimonial" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg};border-color:${mode.surfaces.raised.border}">
					<p class="demo-testimonial-quote">“palette made it obvious how to turn a handful of seeds into usable app surfaces, role treatments, and interaction states without hand-curating every component.”</p>
					<strong>Design systems lead</strong>
				</article>
				<article class="demo-testimonial" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg};border-color:${mode.surfaces.raised.border}">
					<p class="demo-testimonial-quote">“The contrast-aware output helped our team move from raw scales to production-ready semantic tokens much faster, especially across light and dark modes.”</p>
					<strong>Frontend platform engineer</strong>
				</article>
			</div>
		</section>
	`
}

function renderFaq(mode) {
	const items = [
		{
			question: "Why only five seed colors?",
			answer: "A small set of directional inputs keeps the public API stable while still giving the generator enough structure to derive roles, surfaces, and states."
		},
		{
			question: "Are status colors hard-coded?",
			answer: "No. Success, warning, danger, and info are generated from transformed versions of the required seed ramps so they stay related to your chosen palette."
		},
		{
			question: "Does this generate nested interaction states too?",
			answer: "Yes. The current generator includes one bounded child layer so embedded cards and panels can remain coherent without recursive drift."
		}
	]

	return `
		<section id="faq" class="demo-faq">
			<div class="demo-section-head">
				<h2>FAQ</h2>
				<p style="color:${mode.app.mutedFg}">A few quick answers about how the generator is intended to be used.</p>
			</div>
			<div class="demo-faq-grid">
				${items
					.map(
						item => `
							<div class="demo-faq-row" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
								<div class="demo-copy">
									<strong>${escapeHtml(item.question)}</strong>
									<p style="color:${mode.app.mutedFg}">${escapeHtml(item.answer)}</p>
								</div>
								<span class="demo-pill" style="background:${mode.surfaces.base.child.bg};color:${mode.surfaces.base.child.fg};border-color:${mode.surfaces.base.child.border}">Answer</span>
							</div>
						`
					)
					.join("")}
			</div>
		</section>
	`
}

function renderToolbar(palette) {
	const mode = palette.current
	const toggleLabel = state.mode === "light" ? "Dark mode" : "Light mode"

	return `
		<div class="demo-toolbar" style="background:${mode.surfaces.overlay.bg};color:${mode.surfaces.overlay.fg};border-color:${mode.surfaces.overlay.border};--toolbar-border:${mode.surfaces.overlay.border};--focus-ring:${mode.app.focusRing}">
			<div class="demo-toolbar-head">
				<div class="demo-toolbar-title">
					<strong>Color setup</strong>
					<span>Edit the five required seeds or randomize a new palette.</span>
				</div>
				<div class="demo-toolbar-actions">
					<button type="button" class="demo-button" data-action="randomize" style="${treatmentStyle(mode.roles.accent.solid)}">Randomize</button>
					<button type="button" class="demo-button" data-action="toggle-mode" style="${treatmentStyle(mode.roles.primary.soft)}">${escapeHtml(toggleLabel)}</button>
				</div>
			</div>
			<div class="demo-seed-grid">
				${SEED_KEYS.map(
					key => `
						<div class="demo-seed-control" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg};border-color:${mode.surfaces.base.border}">
							<label for="seed-${escapeHtml(key)}">${escapeHtml(key)}</label>
							<div class="demo-seed-row">
								<input id="seed-${escapeHtml(key)}" data-seed-key="${escapeHtml(key)}" type="color" value="${escapeHtml(state.seeds[key])}" />
								<input data-seed-key="${escapeHtml(key)}" type="text" value="${escapeHtml(state.seeds[key])}" spellcheck="false" />
							</div>
						</div>
					`
				).join("")}
			</div>
		</div>
	`
}

function render() {
	const palette = getPalette()
	const mode = palette.current

	app.innerHTML = `
		<div class="demo-shell" style="--app-bg:${mode.app.bg};--app-fg:${mode.app.fg}">
			${renderNav(mode)}
			<main class="demo-main">
				${renderHero(mode)}
				${renderDashboardPreview(mode)}
				${renderFeatures(mode)}
				${renderWorkflow(mode)}
				${renderComparison(mode)}
				${renderSocialProof(mode)}
				${renderFaq(mode)}
			</main>
			${renderToolbar(palette)}
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

	if (!isValidHexInput(target.value)) {
		return
	}

	state.seeds = {
		...state.seeds,
		[target.dataset.seedKey]: target.value.trim().toLowerCase()
	}
	render()
})

app.addEventListener("click", event => {
	const button = event.target instanceof Element ? event.target.closest("button") : null

	if (!(button instanceof HTMLButtonElement)) {
		return
	}

	if (button.dataset.action === "randomize") {
		randomizeSeeds()
		return
	}

	if (button.dataset.action === "toggle-mode") {
		state.mode = state.mode === "light" ? "dark" : "light"
		render()
	}
})

render()
