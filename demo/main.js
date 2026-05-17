import { createPalette } from "../src/index.js"

const SEED_KEYS = ["primary", "secondary", "accent", "neutral", "base"]

const state = {
	mode: "light",
	seeds: createRandomSeedSet()
}

const app = document.getElementById("app")
const style = document.createElement("style")

style.textContent = `
	:root {
		--page-max: 1180px;
		--space-1: 8px;
		--space-2: 12px;
		--space-3: 16px;
		--space-4: 24px;
		--space-5: 32px;
		--space-6: 48px;
		--space-7: 72px;
		--radius-sm: 14px;
		--radius-md: 22px;
		--radius-lg: 30px;
		--shadow-sm: 0 10px 24px rgba(15, 23, 42, 0.08);
		--shadow-md: 0 20px 48px rgba(15, 23, 42, 0.12);
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	html {
		scroll-behavior: smooth;
	}

	body {
		margin: 0;
		background: #e5e7eb;
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
		background:
			radial-gradient(circle at top, var(--glow-color), transparent 42%),
			linear-gradient(180deg, var(--app-bg), var(--page-wash));
		color: var(--app-fg);
		padding-bottom: 240px;
	}

	.demo-nav {
		position: sticky;
		top: 0;
		z-index: 20;
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--nav-border);
		background: color-mix(in srgb, var(--nav-bg) 78%, transparent);
	}

	.demo-nav-inner,
	.demo-main {
		inline-size: min(var(--page-max), calc(100vw - 32px));
		margin: 0 auto;
	}

	.demo-nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding: 14px 0;
	}

	.demo-wordmark {
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: lowercase;
	}

	.demo-nav-links {
		display: flex;
		flex-wrap: wrap;
		gap: 18px;
		color: var(--nav-muted);
	}

	.demo-nav-link {
		transition: color 180ms ease;
	}

	.demo-nav-link:hover {
		color: var(--nav-fg);
	}

	.demo-main {
		display: grid;
		gap: var(--space-7);
		padding: 28px 0 0;
	}

	.demo-hero {
		display: grid;
		grid-template-columns: minmax(0, 1.02fr) minmax(340px, 0.98fr);
		gap: var(--space-5);
		align-items: center;
	}

	.demo-copy,
	.demo-feature-card,
	.demo-testimonial-card,
	.demo-faq-row,
	.demo-preview-card,
	.demo-preview-pane,
	.demo-preview-activity,
	.demo-workflow-card,
	.demo-compare-card,
	.demo-toolbar,
	.demo-product-panel {
		position: relative;
	}

	.demo-copy h1,
	.demo-copy h2,
	.demo-copy h3,
	.demo-copy p,
	.demo-section-head h2,
	.demo-section-head p,
	.demo-preview-metric p,
	.demo-preview-metric h3,
	.demo-faq-row strong,
	.demo-faq-row p {
		margin: 0;
	}

	.demo-copy {
		display: grid;
		gap: var(--space-4);
	}

	.demo-badge,
	.demo-badge-quiet,
	.demo-status,
	.demo-mini-state,
	.demo-toolbar-label {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		white-space: nowrap;
	}

	.demo-badge,
	.demo-badge-quiet,
	.demo-status,
	.demo-mini-state {
		padding: 8px 14px;
		border: 1px solid;
	}

	.demo-copy h1 {
		font-size: clamp(3rem, 6vw, 5.8rem);
		line-height: 0.94;
		letter-spacing: -0.06em;
		max-inline-size: 10ch;
	}

	.demo-copy p,
	.demo-section-head p,
	.demo-preview-activity-item,
	.demo-feature-card p,
	.demo-workflow-card p,
	.demo-compare-row,
	.demo-faq-row p {
		line-height: 1.65;
	}

	.demo-copy .demo-lead {
		max-inline-size: 60ch;
		font-size: 1.05rem;
	}

	.demo-cta-row,
	.demo-hero-meta,
	.demo-preview-tabs,
	.demo-preview-statuses,
	.demo-preview-actions,
	.demo-product-state-row,
	.demo-toolbar-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
	}

	.demo-button {
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--fg);
		padding: 11px 18px;
		border-radius: 999px;
		cursor: pointer;
		transition:
			transform 180ms ease,
			background-color 180ms ease,
			color 180ms ease,
			border-color 180ms ease,
			box-shadow 180ms ease;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06) inset;
	}

	.demo-button:hover {
		background: var(--hover-bg);
		color: var(--hover-fg);
		border-color: var(--hover-border);
		transform: translateY(-1px);
	}

	.demo-button:active {
		background: var(--active-bg);
		color: var(--active-fg);
		border-color: var(--active-border);
		transform: translateY(0);
	}

	.demo-button:focus,
	.demo-toolbar input:focus {
		outline: 2px solid var(--focus-ring);
		outline-offset: 2px;
	}

	.demo-hero-visual {
		display: grid;
		gap: var(--space-3);
		padding: var(--space-4);
		background: linear-gradient(180deg, var(--hero-card-top), var(--hero-card-bottom));
		border: 1px solid var(--hero-card-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.demo-visual-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
	}

	.demo-visual-dots {
		display: flex;
		gap: 8px;
	}

	.demo-visual-dot {
		inline-size: 10px;
		block-size: 10px;
		border-radius: 999px;
		background: currentColor;
		opacity: 0.36;
	}

	.demo-visual-grid {
		display: grid;
		grid-template-columns: 92px minmax(0, 1fr);
		gap: var(--space-3);
	}

	.demo-visual-sidebar,
	.demo-visual-main,
	.demo-preview-shell,
	.demo-preview-card,
	.demo-preview-pane,
	.demo-preview-activity,
	.demo-feature-card,
	.demo-workflow-card,
	.demo-compare-card,
	.demo-testimonial-card,
	.demo-faq-row,
	.demo-toolbar,
	.demo-product-panel,
	.demo-form-panel,
	.demo-list-panel,
	.demo-settings-panel {
		border-radius: var(--radius-md);
	}

	.demo-visual-sidebar {
		padding: 14px;
		display: grid;
		gap: 10px;
		min-height: 240px;
	}

	.demo-visual-nav-item {
		padding: 8px 10px;
		border-radius: 999px;
		font-size: 0.86rem;
	}

	.demo-visual-main {
		display: grid;
		gap: var(--space-3);
	}

	.demo-visual-metrics {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-3);
	}

	.demo-preview-metric {
		padding: 16px;
		display: grid;
		gap: 8px;
	}

	.demo-preview-metric h3 {
		font-size: 1.65rem;
		letter-spacing: -0.04em;
	}

	.demo-visual-chart {
		padding: 18px;
		display: grid;
		gap: 16px;
	}

	.demo-chart-bars {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		gap: 10px;
		align-items: end;
		min-height: 180px;
	}

	.demo-chart-bar {
		border-radius: 18px 18px 10px 10px;
		min-height: 48px;
	}

	.demo-visual-activity {
		padding: 16px;
		display: grid;
		gap: 12px;
	}

	.demo-activity-item,
	.demo-compare-row {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.demo-activity-mark,
	.demo-compare-mark,
	.demo-feature-accent {
		inline-size: 12px;
		block-size: 12px;
		border-radius: 999px;
		flex: none;
	}

	.demo-visual-nested {
		padding: 14px;
		display: grid;
		gap: 10px;
	}

	.demo-section-stack {
		display: grid;
		gap: var(--space-5);
	}

	.demo-section-head {
		display: grid;
		gap: 12px;
		max-inline-size: 60ch;
	}

	.demo-section-head h2 {
		font-size: clamp(1.8rem, 3vw, 3rem);
		line-height: 1.02;
		letter-spacing: -0.04em;
	}

	.demo-product-shell {
		display: grid;
		gap: var(--space-4);
		padding: 24px;
		background: linear-gradient(180deg, var(--product-top), var(--product-bottom));
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.demo-product-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.demo-product-grid {
		display: grid;
		grid-template-columns: 1.25fr 0.95fr;
		gap: var(--space-4);
	}

	.demo-product-column {
		display: grid;
		gap: var(--space-4);
	}

	.demo-product-panel,
	.demo-settings-panel,
	.demo-form-panel,
	.demo-list-panel {
		padding: 18px;
		box-shadow: var(--shadow-sm);
	}

	.demo-form-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.demo-field {
		display: grid;
		gap: 8px;
	}

	.demo-field span {
		font-size: 0.82rem;
	}

	.demo-input {
		padding: 11px 12px;
		border: 1px solid var(--field-border);
		border-radius: 14px;
		background: var(--field-bg);
		color: var(--field-fg);
	}

	.demo-list {
		display: grid;
		gap: 10px;
	}

	.demo-list-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 0;
		border-top: 1px solid color-mix(in srgb, var(--list-divider) 55%, transparent);
	}

	.demo-list-row:first-child {
		border-top: 0;
		padding-top: 0;
	}

	.demo-state-cluster {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
	}

	.demo-state-card {
		padding: 14px;
		display: grid;
		gap: 12px;
		border-radius: 20px;
	}

	.demo-state-card strong {
		font-size: 0.84rem;
	}

	.demo-feature-grid,
	.demo-social-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 18px;
	}

	.demo-feature-card,
	.demo-testimonial-card,
	.demo-faq-row,
	.demo-compare-card,
	.demo-workflow-card {
		padding: 22px;
		box-shadow: var(--shadow-sm);
	}

	.demo-feature-card,
	.demo-testimonial-card,
	.demo-workflow-card,
	.demo-compare-card {
		display: grid;
		gap: 14px;
	}

	.demo-workflow-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 18px;
	}

	.demo-step-mark {
		inline-size: 36px;
		block-size: 36px;
		border-radius: 14px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
	}

	.demo-compare-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18px;
	}

	.demo-social-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.demo-testimonial-card blockquote {
		margin: 0;
		font-size: 1.02rem;
		line-height: 1.8;
	}

	.demo-faq-grid {
		display: grid;
		gap: 14px;
	}

	.demo-faq-row {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 18px;
	}

	.demo-toolbar {
		position: fixed;
		left: 50%;
		bottom: 18px;
		z-index: 30;
		inline-size: min(1000px, calc(100vw - 32px));
		transform: translateX(-50%);
		padding: 16px;
		backdrop-filter: blur(22px);
		box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
		border: 1px solid var(--toolbar-border);
		background: color-mix(in srgb, var(--toolbar-bg) 88%, transparent);
	}

	.demo-toolbar-inner {
		display: grid;
		gap: 14px;
	}

	.demo-toolbar-top {
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
	.demo-seed-label {
		font-size: 0.76rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.demo-toolbar-copy {
		color: var(--toolbar-muted);
		font-size: 0.92rem;
	}

	.demo-seed-grid {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 12px;
	}

	.demo-seed-control {
		display: grid;
		gap: 8px;
	}

	.demo-seed-row {
		display: grid;
		grid-template-columns: 44px minmax(0, 1fr);
		gap: 8px;
	}

	.demo-seed-row input[type="color"],
	.demo-seed-row input[type="text"] {
		border: 1px solid var(--toolbar-input-border);
		border-radius: 14px;
		background: var(--toolbar-input-bg);
		color: var(--toolbar-fg);
		transition:
			border-color 180ms ease,
			background-color 180ms ease;
	}

	.demo-seed-row input[type="color"] {
		inline-size: 44px;
		block-size: 42px;
		padding: 0;
	}

	.demo-seed-row input[type="text"] {
		inline-size: 100%;
		padding: 10px 12px;
	}

	@media (max-width: 1080px) {
		.demo-hero,
		.demo-product-grid,
		.demo-feature-grid,
		.demo-workflow-grid,
		.demo-compare-grid,
		.demo-social-grid {
			grid-template-columns: 1fr;
		}

		.demo-visual-grid,
		.demo-state-cluster,
		.demo-visual-metrics {
			grid-template-columns: 1fr;
		}

		.demo-seed-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 760px) {
		.demo-shell {
			padding-bottom: 350px;
		}

		.demo-nav-inner,
		.demo-main {
			inline-size: calc(100vw - 24px);
		}

		.demo-nav-inner {
			padding: 12px 0;
		}

		.demo-main {
			padding-top: 18px;
		}

		.demo-nav-links {
			display: none;
		}

		.demo-toolbar {
			left: 0;
			right: 0;
			bottom: 0;
			inline-size: 100%;
			transform: none;
			border-radius: 24px 24px 0 0;
		}

		.demo-toolbar-top {
			flex-direction: column;
			align-items: start;
		}

		.demo-seed-grid,
		.demo-form-grid {
			grid-template-columns: 1fr;
		}
	}
`

document.head.append(style)

function wrapHue(value) {
	return ((value % 360) + 360) % 360
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min)
}

function hslToHex(h, s, l) {
	const hue = wrapHue(h)
	const saturation = Math.max(0, Math.min(100, s)) / 100
	const lightness = Math.max(0, Math.min(100, l)) / 100
	const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
	const segment = hue / 60
	const x = chroma * (1 - Math.abs((segment % 2) - 1))
	let red = 0
	let green = 0
	let blue = 0

	if (segment >= 0 && segment < 1) {
		red = chroma
		green = x
	} else if (segment < 2) {
		red = x
		green = chroma
	} else if (segment < 3) {
		green = chroma
		blue = x
	} else if (segment < 4) {
		green = x
		blue = chroma
	} else if (segment < 5) {
		red = x
		blue = chroma
	} else {
		red = chroma
		blue = x
	}

	const match = lightness - chroma / 2
	const toChannel = value => Math.round((value + match) * 255).toString(16).padStart(2, "0")

	return `#${toChannel(red)}${toChannel(green)}${toChannel(blue)}`
}

function randomHexColor() {
	return hslToHex(randomInRange(0, 360), randomInRange(12, 78), randomInRange(44, 62))
}

function createRandomSeedSet() {
	const anchor = randomInRange(0, 360)
	const neutralHue = wrapHue(anchor + randomInRange(-8, 8))
	const baseHue = wrapHue(anchor + randomInRange(-8, 8))

	return {
		primary: hslToHex(anchor, randomInRange(62, 78), randomInRange(42, 58)),
		secondary: hslToHex(anchor + randomInRange(32, 72), randomInRange(44, 62), randomInRange(42, 58)),
		accent: hslToHex(anchor + randomInRange(155, 215), randomInRange(60, 78), randomInRange(42, 58)),
		neutral: hslToHex(neutralHue, randomInRange(6, 16), randomInRange(46, 58)),
		base: hslToHex(baseHue, randomInRange(5, 14), randomInRange(86, 96))
	}
}

function randomizeSeedObject() {
	return {
		primary: randomHexColor(),
		secondary: randomHexColor(),
		accent: randomHexColor(),
		neutral: randomHexColor(),
		base: randomHexColor()
	}
}

function randomizeSeeds() {
	state.seeds = createRandomSeedSet()
	render()
}

function getPalette() {
	return createPalette({
		mode: state.mode,
		seeds: {
			primary: state.seeds.primary,
			secondary: state.seeds.secondary,
			accent: state.seeds.accent,
			neutral: state.seeds.neutral,
			base: state.seeds.base
		}
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

function normalizeSeedInput(value) {
	const nextValue = value.trim().toLowerCase()

	if (nextValue.length === 4) {
		return `#${nextValue[1]}${nextValue[1]}${nextValue[2]}${nextValue[2]}${nextValue[3]}${nextValue[3]}`
	}

	return nextValue
}

function treatmentVars(treatment) {
	return [
		`--bg:${treatment.bg}`,
		`--fg:${treatment.fg}`,
		`--border:${treatment.border}`,
		`--hover-bg:${treatment.hover.bg}`,
		`--hover-fg:${treatment.hover.fg}`,
		`--hover-border:${treatment.hover.border}`,
		`--active-bg:${treatment.active.bg}`,
		`--active-fg:${treatment.active.fg}`,
		`--active-border:${treatment.active.border}`
	].join(";")
}

function surfaceVars(surface) {
	return [
		`--surface-bg:${surface.bg}`,
		`--surface-fg:${surface.fg}`,
		`--surface-border:${surface.border}`,
		`--surface-child-bg:${surface.child.bg}`,
		`--surface-child-fg:${surface.child.fg}`,
		`--surface-child-border:${surface.child.border}`,
		`--surface-hover-bg:${surface.hover.bg}`,
		`--surface-active-bg:${surface.active.bg}`
	].join(";")
}

function renderButton(label, treatment, className = "") {
	return `<button type="button" class="demo-button ${escapeHtml(className)}" style="${treatmentVars(treatment)}">${escapeHtml(label)}</button>`
}

function renderBadge(label, treatment) {
	return `<span class="demo-badge" style="background:${treatment.bg};color:${treatment.fg};border-color:${treatment.border}">${escapeHtml(label)}</span>`
}

function renderCard(className, surface, content) {
	return `<article class="${escapeHtml(className)}" style="${surfaceVars(surface)}background:var(--surface-bg);color:var(--surface-fg)">${content}</article>`
}

function renderNav(mode) {
	return `
		<nav class="demo-nav" style="--nav-bg:${mode.surfaces.overlay.bg};--nav-fg:${mode.surfaces.overlay.fg};--nav-muted:${mode.app.mutedFg};--nav-border:${mode.surfaces.overlay.border}">
			<div class="demo-nav-inner">
				<div class="demo-wordmark">palette</div>
				<div class="demo-nav-links">
					<a class="demo-nav-link" href="#product">Product</a>
					<a class="demo-nav-link" href="#engine">Engine</a>
					<a class="demo-nav-link" href="#workflow">Workflow</a>
					<a class="demo-nav-link" href="#faq">FAQ</a>
				</div>
				${renderButton("Try it live", mode.roles.primary.solid)}
			</div>
		</nav>
	`
}

function renderHero(mode) {
	return `
		<section class="demo-hero">
			<div class="demo-copy">
				${renderBadge("Contrast-aware palette engine", mode.roles.accent.soft)}
				<h1>Five seed colors. A complete UI system.</h1>
				<p class="demo-lead" style="color:${mode.app.mutedFg}">palette generates app foundations, surfaces, semantic roles, state colors, and nested interaction colors from just five required seeds, then resolves them into practical UI-ready recipes.</p>
				<div class="demo-cta-row">
					${renderButton("Generate a system", mode.roles.primary.solid)}
					${renderButton("See how it works", mode.roles.secondary.outline)}
				</div>
				<div class="demo-hero-meta">
					${renderBadge("Deterministic", mode.roles.info.soft)}
					${renderBadge("Seed-derived", mode.roles.success.soft)}
					${renderBadge("State-aware", mode.roles.warning.soft)}
				</div>
			</div>
			<div class="demo-hero-visual" style="--hero-card-top:${mode.surfaces.raised.bg};--hero-card-bottom:${mode.surfaces.overlay.bg};--hero-card-border:${mode.surfaces.raised.border};color:${mode.surfaces.raised.fg}">
				<div class="demo-visual-top">
					<strong>Theme preview</strong>
					<div class="demo-visual-dots">
						<span class="demo-visual-dot"></span>
						<span class="demo-visual-dot"></span>
						<span class="demo-visual-dot"></span>
					</div>
				</div>
				<div class="demo-visual-grid">
					<div class="demo-visual-sidebar" style="background:${mode.surfaces.sunken.bg};color:${mode.surfaces.sunken.fg}">
						<div class="demo-visual-nav-item" style="background:${mode.roles.primary.soft.bg};color:${mode.roles.primary.soft.fg}">Overview</div>
						<div class="demo-visual-nav-item" style="background:${mode.roles.neutral.ghost.bg};color:${mode.roles.neutral.ghost.fg}">Signals</div>
						<div class="demo-visual-nav-item" style="background:${mode.roles.neutral.ghost.hover.bg};color:${mode.roles.neutral.ghost.hover.fg}">System</div>
					</div>
					<div class="demo-visual-main">
						<div class="demo-visual-metrics">
							<div class="demo-preview-metric" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
								<p style="color:${mode.app.subtleFg}">Palette health</p>
								<h3>94%</h3>
							</div>
							<div class="demo-preview-metric" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
								<p style="color:${mode.app.subtleFg}">Surface depth</p>
								<h3>4 layers</h3>
							</div>
							<div class="demo-preview-metric" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
								<p style="color:${mode.app.subtleFg}">Roles</p>
								<h3>8 total</h3>
							</div>
						</div>
						<div class="demo-visual-chart" style="background:${mode.surfaces.overlay.bg};color:${mode.surfaces.overlay.fg}">
							<div class="demo-chart-bars">
								<div class="demo-chart-bar" style="height:46px;background:${mode.roles.info.soft.bg}"></div>
								<div class="demo-chart-bar" style="height:86px;background:${mode.roles.primary.soft.bg}"></div>
								<div class="demo-chart-bar" style="height:70px;background:${mode.roles.secondary.soft.bg}"></div>
								<div class="demo-chart-bar" style="height:118px;background:${mode.roles.accent.soft.bg}"></div>
								<div class="demo-chart-bar" style="height:92px;background:${mode.roles.success.soft.bg}"></div>
								<div class="demo-chart-bar" style="height:76px;background:${mode.roles.warning.soft.bg}"></div>
								<div class="demo-chart-bar" style="height:60px;background:${mode.roles.danger.soft.bg}"></div>
							</div>
						</div>
						<div class="demo-visual-activity" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
							<div class="demo-preview-statuses">
								<span class="demo-status" style="background:${mode.roles.success.soft.bg};color:${mode.roles.success.soft.fg};border-color:${mode.roles.success.soft.border}">Healthy</span>
								<span class="demo-status" style="background:${mode.roles.warning.soft.bg};color:${mode.roles.warning.soft.fg};border-color:${mode.roles.warning.soft.border}">Review</span>
								<span class="demo-status" style="background:${mode.roles.info.soft.bg};color:${mode.roles.info.soft.fg};border-color:${mode.roles.info.soft.border}">Ready</span>
								<span class="demo-status" style="background:${mode.roles.danger.soft.bg};color:${mode.roles.danger.soft.fg};border-color:${mode.roles.danger.soft.border}">Blocked</span>
							</div>
							<div class="demo-visual-nested" style="background:${mode.surfaces.base.child.bg};color:${mode.surfaces.base.child.fg}">
								<strong>Nested activity panel</strong>
								<p style="color:${mode.app.subtleFg}">One bounded child layer gives embedded review flows enough depth without spiraling into custom one-off states.</p>
								<div class="demo-preview-actions">
									${renderButton("Open review", mode.roles.primary.soft)}
									${renderButton("Archive", mode.roles.neutral.ghost)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	`
}

function renderProductPreview(mode) {
	return `
		<section id="product" class="demo-section-stack">
			<div class="demo-section-head">
				<h2>See the generated system in context.</h2>
				<p style="color:${mode.app.mutedFg}">Instead of exposing raw scales, the demo applies the generated palette to a realistic product slice with tabs, forms, feedback states, nested panels, and explicit button states.</p>
			</div>
			<div class="demo-product-shell" style="--product-top:${mode.surfaces.base.bg};--product-bottom:${mode.surfaces.raised.bg};background:linear-gradient(180deg,var(--product-top),var(--product-bottom));color:${mode.surfaces.base.fg}">
				<div class="demo-product-tabs">
					<span class="demo-badge-quiet" style="background:${mode.roles.primary.solid.bg};color:${mode.roles.primary.solid.fg};border-color:${mode.roles.primary.solid.border}">Overview</span>
					<span class="demo-badge-quiet" style="background:${mode.roles.neutral.ghost.bg};color:${mode.roles.neutral.ghost.fg};border-color:${mode.roles.neutral.ghost.border}">Components</span>
					<span class="demo-badge-quiet" style="background:${mode.roles.neutral.ghost.bg};color:${mode.roles.neutral.ghost.fg};border-color:${mode.roles.neutral.ghost.border}">Docs</span>
				</div>
				<div class="demo-product-grid">
					<div class="demo-product-column">
						<div class="demo-product-panel" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg}">
							<div class="demo-copy">
								<h3>Release settings</h3>
								<p style="color:${mode.app.mutedFg}">Adjust global tone and preview semantic controls before publishing a system update.</p>
							</div>
							<div class="demo-form-grid">
								<div class="demo-field">
									<span>System name</span>
									<div class="demo-input" style="--field-bg:${mode.surfaces.raised.child.bg};--field-fg:${mode.surfaces.raised.child.fg};--field-border:${mode.surfaces.raised.child.border};background:var(--field-bg);color:var(--field-fg)">Spring rollout</div>
								</div>
								<div class="demo-field">
									<span>Audience</span>
									<div class="demo-input" style="--field-bg:${mode.surfaces.raised.child.bg};--field-fg:${mode.surfaces.raised.child.fg};--field-border:${mode.surfaces.raised.child.border};background:var(--field-bg);color:var(--field-fg)">Production apps</div>
								</div>
							</div>
							<div class="demo-preview-actions">
								${renderButton("Save draft", mode.roles.secondary.outline)}
								${renderButton("Publish", mode.roles.primary.solid)}
							</div>
						</div>
						<div class="demo-product-panel" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
							<div class="demo-copy">
								<h3>Activity feed</h3>
								<p style="color:${mode.app.mutedFg}">Recent palette decisions and rollout signals.</p>
							</div>
							<div class="demo-list">
								<div class="demo-list-row" style="--list-divider:${mode.surfaces.base.border}">
									<span>Foreground contrast resolved for app shells.</span>
									${renderBadge("Stable", mode.roles.success.soft)}
								</div>
								<div class="demo-list-row" style="--list-divider:${mode.surfaces.base.border}">
									<span>Nested interaction states applied to forms.</span>
									${renderBadge("Review", mode.roles.warning.soft)}
								</div>
								<div class="demo-list-row" style="--list-divider:${mode.surfaces.base.border}">
									<span>Accent treatments updated for key flows.</span>
									${renderBadge("Ready", mode.roles.info.soft)}
								</div>
							</div>
						</div>
					</div>
					<div class="demo-product-column">
						<div class="demo-product-panel" style="background:${mode.surfaces.overlay.bg};color:${mode.surfaces.overlay.fg}">
							<div class="demo-copy">
								<h3>Notification center</h3>
								<p style="color:${mode.app.mutedFg}">Role treatments keep feedback states distinct without leaving the palette family.</p>
							</div>
							<div class="demo-preview-statuses">
								${renderBadge("Healthy", mode.roles.success.soft)}
								${renderBadge("Watchlist", mode.roles.warning.soft)}
								${renderBadge("Incident", mode.roles.danger.soft)}
								${renderBadge("Heads up", mode.roles.info.soft)}
							</div>
						</div>
						<div class="demo-product-panel" style="background:${mode.surfaces.sunken.bg};color:${mode.surfaces.sunken.fg}">
							<div class="demo-copy">
								<h3>Button states</h3>
								<p style="color:${mode.app.mutedFg}">Rest, hover, and active examples rendered directly from generated treatments.</p>
							</div>
							<div class="demo-state-cluster">
								<div class="demo-state-card" style="background:${mode.surfaces.sunken.child.bg};color:${mode.surfaces.sunken.child.fg}">
									<strong>Rest</strong>
									${renderButton("Primary action", mode.roles.primary.solid)}
								</div>
								<div class="demo-state-card" style="background:${mode.surfaces.sunken.child.bg};color:${mode.surfaces.sunken.child.fg}">
									<strong>Hover</strong>
									<button type="button" class="demo-button" style="--bg:${mode.roles.primary.solid.hover.bg};--fg:${mode.roles.primary.solid.hover.fg};--border:${mode.roles.primary.solid.hover.border};--hover-bg:${mode.roles.primary.solid.hover.bg};--hover-fg:${mode.roles.primary.solid.hover.fg};--hover-border:${mode.roles.primary.solid.hover.border};--active-bg:${mode.roles.primary.solid.hover.bg};--active-fg:${mode.roles.primary.solid.hover.fg};--active-border:${mode.roles.primary.solid.hover.border}">Primary action</button>
								</div>
								<div class="demo-state-card" style="background:${mode.surfaces.sunken.child.bg};color:${mode.surfaces.sunken.child.fg}">
									<strong>Active</strong>
									<button type="button" class="demo-button" style="--bg:${mode.roles.primary.solid.active.bg};--fg:${mode.roles.primary.solid.active.fg};--border:${mode.roles.primary.solid.active.border};--hover-bg:${mode.roles.primary.solid.active.bg};--hover-fg:${mode.roles.primary.solid.active.fg};--hover-border:${mode.roles.primary.solid.active.border};--active-bg:${mode.roles.primary.solid.active.bg};--active-fg:${mode.roles.primary.solid.active.fg};--active-border:${mode.roles.primary.solid.active.border}">Primary action</button>
								</div>
							</div>
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
			copy: "Global canvas, text contrast, borders, focus rings, and selection states arrive already resolved.",
			treatment: mode.roles.primary.soft
		},
		{
			title: "Surface depth",
			copy: "Base, raised, sunken, and overlay surfaces create visual layering without ad hoc container color decisions.",
			treatment: mode.roles.secondary.soft
		},
		{
			title: "Semantic roles",
			copy: "Primary, secondary, accent, neutral, and generated feedback roles map cleanly onto UI treatments.",
			treatment: mode.roles.accent.soft
		},
		{
			title: "Nested interaction states",
			copy: "One bounded child layer keeps embedded cards and forms coherent across hover and active states.",
			treatment: mode.roles.info.soft
		}
	]

	return `
		<section id="engine" class="demo-section-stack">
			<div class="demo-section-head">
				<h2>Built for real UI decisions.</h2>
				<p style="color:${mode.app.mutedFg}">The engine is organized around the choices product interfaces actually need to make, not just around raw hue scales.</p>
			</div>
			<div class="demo-feature-grid">
				${features
					.map(
						feature => `
							<article class="demo-feature-card" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg}">
								<span class="demo-feature-accent" style="background:${feature.treatment.bg}"></span>
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
		"Normalize five required seeds",
		"Build perceptual ramps",
		"Resolve contrast per state",
		"Return semantic recipes"
	]

	return `
		<section id="workflow" class="demo-section-stack">
			<div class="demo-section-head">
				<h2>How the engine thinks.</h2>
				<p style="color:${mode.app.mutedFg}">Each stage keeps the output bounded, deterministic, and useful for real interface work.</p>
			</div>
			<div class="demo-workflow-grid">
				${steps
					.map(
						(step, index) => `
							<article class="demo-workflow-card" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
								<span class="demo-step-mark" style="background:${index % 2 === 0 ? mode.roles.primary.soft.bg : mode.roles.accent.soft.bg};color:${index % 2 === 0 ? mode.roles.primary.soft.fg : mode.roles.accent.soft.fg}">${index + 1}</span>
								<h3>${escapeHtml(step)}</h3>
								<p style="color:${mode.app.mutedFg}">Finite candidate selection turns directional seeds into practical interface states without open-ended adjustment loops.</p>
							</article>
						`
					)
					.join("")}
			</div>
		</section>
	`
}

function renderSocialProof(mode) {
	return `
		<section class="demo-section-stack">
			<div class="demo-section-head">
				<h2>Made for teams shaping product systems.</h2>
				<p style="color:${mode.app.mutedFg}">Contrast-aware, seed-derived palettes help design systems stay coherent across product surfaces and interaction states.</p>
			</div>
			<div class="demo-social-grid">
				<article class="demo-testimonial-card" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg}">
					<blockquote>“palette helped us move from raw scales to usable interface recipes. We could reason about app layers, hover states, and semantic roles as one system.”</blockquote>
					<strong>Design systems lead</strong>
				</article>
				<article class="demo-testimonial-card" style="background:${mode.surfaces.raised.bg};color:${mode.surfaces.raised.fg}">
					<blockquote>“The generator gives our engineers something they can apply immediately. The output feels related, intentional, and ready for real product surfaces.”</blockquote>
					<strong>Frontend platform engineer</strong>
				</article>
			</div>
		</section>
	`
}

function renderFaq(mode) {
	return `
		<section id="faq" class="demo-section-stack">
			<div class="demo-section-head">
				<h2>FAQ</h2>
				<p style="color:${mode.app.mutedFg}">A few direct answers about how the current engine behaves.</p>
			</div>
			<div class="demo-faq-grid">
				<div class="demo-faq-row" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
					<div class="demo-copy">
						<strong>Why five seed colors?</strong>
						<p style="color:${mode.app.mutedFg}">Five inputs are enough to steer brand, support, highlight, neutral structure, and environmental bias without expanding the public API.</p>
					</div>
					${renderBadge("Focused input", mode.roles.primary.soft)}
				</div>
				<div class="demo-faq-row" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
					<div class="demo-copy">
						<strong>Does randomization use fixed defaults?</strong>
						<p style="color:${mode.app.mutedFg}">No. The demo creates a fresh related seed set on reload and on demand, then feeds those five values into the public generator.</p>
					</div>
					${renderBadge("No fixed preset", mode.roles.secondary.soft)}
				</div>
				<div class="demo-faq-row" style="background:${mode.surfaces.base.bg};color:${mode.surfaces.base.fg}">
					<div class="demo-copy">
						<strong>What does nested interaction mean?</strong>
						<p style="color:${mode.app.mutedFg}">The current output includes one child layer so embedded panels and cards can inherit their own background, foreground, and state colors without recursive trees.</p>
					</div>
					${renderBadge("Bounded depth", mode.roles.info.soft)}
				</div>
			</div>
		</section>
	`
}

function renderToolbar(palette) {
	const mode = palette.current
	const toggleLabel = state.mode === "light" ? "Dark mode" : "Light mode"

	return `
		<div class="demo-toolbar" style="--toolbar-bg:${mode.surfaces.overlay.bg};--toolbar-border:${mode.surfaces.overlay.border};--toolbar-fg:${mode.surfaces.overlay.fg};--toolbar-muted:${mode.app.mutedFg};--toolbar-input-bg:${mode.surfaces.base.bg};--toolbar-input-border:${mode.surfaces.base.border};--focus-ring:${mode.app.focusRing};color:var(--toolbar-fg)">
			<div class="demo-toolbar-inner">
				<div class="demo-toolbar-top">
					<div class="demo-toolbar-title">
						<strong>Color setup</strong>
						<span class="demo-toolbar-copy">Randomized on reload. Edit any seed.</span>
					</div>
					<div class="demo-toolbar-actions">
						<button type="button" class="demo-button" data-action="randomize" style="${treatmentVars(mode.roles.accent.solid)}">Randomize</button>
						<button type="button" class="demo-button" data-action="toggle-mode" style="${treatmentVars(mode.roles.neutral.outline)}">${escapeHtml(toggleLabel)}</button>
					</div>
				</div>
				<div class="demo-seed-grid">
					${SEED_KEYS.map(
						key => `
							<label class="demo-seed-control">
								<span class="demo-seed-label">${escapeHtml(key)}</span>
								<div class="demo-seed-row">
									<input type="color" data-seed-key="${escapeHtml(key)}" value="${escapeHtml(state.seeds[key])}" />
									<input type="text" data-seed-key="${escapeHtml(key)}" value="${escapeHtml(state.seeds[key])}" spellcheck="false" />
								</div>
							</label>
						`
					).join("")}
				</div>
			</div>
		</div>
	`
}

function render() {
	const palette = getPalette()
	const mode = palette.current

	app.innerHTML = `
		<div class="demo-shell" style="--app-bg:${mode.app.bg};--app-fg:${mode.app.fg};--page-wash:${mode.surfaces.base.bg};--glow-color:${mode.roles.accent.soft.bg}">
			${renderNav(mode)}
			<main class="demo-main">
				${renderHero(mode)}
				${renderProductPreview(mode)}
				${renderFeatures(mode)}
				${renderWorkflow(mode)}
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
		[target.dataset.seedKey]: normalizeSeedInput(target.value)
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
