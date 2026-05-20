<script>
	import { onMount, tick } from "svelte"
	import {
		ArrowRight,
		CheckCircle2,
		ChevronDown,
		Code,
		Copy,
		Dices,
		Layers,
		Moon,
		Palette,
		Redo2,
		Terminal,
		Undo2,
		Zap
	} from "@lucide/svelte"
	import { siGithub } from "simple-icons"

	const initialSeeds = {
		text: "#1f1020",
		background: "#fbf3fa",
		primary: "#3b82f6",
		secondary: "#9b5a43",
		accent: "#9c661d"
	}

	let seeds = cloneSeeds(initialSeeds)
	let demoScheme = "triadic"
	let wcag = true
	let isCopied = false
	let copiedSeedRole = null
	let isNavInstallCopied = false
	let isHeroInstallCopied = false
	let activeColorField = null
	let isSchemeOpen = false
	let pickerHue = 218
	let pickerSaturation = 0.75
	let pickerValue = 0.96
	let colorHistory = [cloneSeeds(initialSeeds)]
	let colorHistoryIndex = 0
	let pendingHistorySnapshot = null
	let activeDragTarget = null
	let saturationValueElement
	let hueTrackElement
	let schemeTriggerElement
	let schemeMenuElement
	let schemeMenuDirection = "down"
	let schemeMenuMaxHeight = 288

	let generatedPalette

	$: generatedPalette = {
		light: {
			text: seeds.text,
			background: seeds.background,
			primary: seeds.primary,
			secondary: seeds.secondary,
			accent: seeds.accent
		},
		dark: {
			text: "#f5e2f0",
			background: "#10070f",
			primary: "#d993c4",
			secondary: "#c18471",
			accent: "#dfae63"
		}
	}

	const seedFields = [
		{ key: "text", label: "Text" },
		{ key: "background", label: "Background" },
		{ key: "primary", label: "Primary" },
		{ key: "secondary", label: "Secondary" },
		{ key: "accent", label: "Accent" }
	]

	const supportedSchemes = [
		"random",
		"monochromatic",
		"analogous",
		"complementary",
		"split-complementary",
		"triadic",
		"compound",
		"double-split-complementary",
		"neutral-complementary",
		"accented-neutral",
		"achromatic",
		"warm",
		"cool",
		"muted",
		"earth",
		"pastel",
		"neon",
		"jewel",
		"brand-status",
		"enterprise",
		"luxury"
	]
	const installCommand = "pnpm i @jacoblockett/palette"

	const features = [
		{
			icon: Layers,
			iconClass: "w-6 h-6 text-indigo-400",
			title: "Seedable Configuration",
			desc: "Provide zero to five seed colors, and we deterministically hallucinate the rest. Like magic, if you don't understand basic math."
		},
		{
			icon: Zap,
			iconClass: "w-6 h-6 text-yellow-400",
			title: "Aggressive WCAG",
			desc: "If your input or generated colors fail minimum accessibility checks, we throw an error and crash your app. You're welcome."
		},
		{
			icon: Code,
			iconClass: "w-6 h-6 text-green-400",
			title: "Bountiful Schemes",
			desc: "Whatever color scheme you want, we probably have it. Proprietary, of course. The word means something, right?"
		}
	]

	const openSourceFeatures = [
		"Light & Dark UI auto-generation",
		"Scale shades per color",
		"Throws errors on bad contrast",
		"Community support*"
	]

	const enterpriseFeatures = [
		"Everything in Open Source",
		"We can send you a professional email*",
		"You can pretend you paid for it",
		"Shiny pill at the top right that says 'Enterprise'"
	]

	const testimonials = [
		{
			quote: "Palette generated colors so confidently that I stopped asking whether they were good.",
			name: "A Frontend Developer",
			role: "Still shipping buttons"
		},
		{
			quote: "We replaced three meetings, two Figma comments, and one very tired designer with a hex code.",
			name: "A Product Manager",
			role: "Probably in another sync"
		},
		{
			quote: "The WCAG errors hurt my feelings, but the contrast was technically better.",
			name: "A Design System Lead",
			role: "Learning to vibe"
		},
		{
			quote: "I typed one color, got an entire palette back, and immediately started acting like I meant to do that.",
			name: "A Full-Stack Developer",
			role: "Deploying with confidence"
		},
		{
			quote: "Our brand meeting ended early, which frankly made everyone suspicious.",
			name: "A Startup Founder",
			role: "Optimizing runway and patience"
		},
		{
			quote: "It removed just enough creative choice to keep the project moving, which is my favorite amount.",
			name: "An Engineering Manager",
			role: "Calendar-based life form"
		}
	]

	function cloneSeeds(source) {
		return {
			text: source.text,
			background: source.background,
			primary: source.primary,
			secondary: source.secondary,
			accent: source.accent
		}
	}

	function seedsAreEqual(first, second) {
		return seedFields.every(field => first[field.key] === second[field.key])
	}

	function isValidHex(hex) {
		return typeof hex === "string" && /^#[0-9a-fA-F]{6}$/.test(hex)
	}

	function sanitizeSeedInput(value) {
		const trimmed = value.trim()

		if (trimmed === "") {
			return "#"
		}

		const prefixed = trimmed.startsWith("#") ? trimmed : `#${trimmed}`

		return prefixed.slice(0, 7)
	}

	function componentToHex(value) {
		return value.toString(16).padStart(2, "0")
	}

	function hexToRgb(hex) {
		if (!isValidHex(hex)) {
			return null
		}

		const normalized = hex.slice(1)

		return {
			r: parseInt(normalized.slice(0, 2), 16),
			g: parseInt(normalized.slice(2, 4), 16),
			b: parseInt(normalized.slice(4, 6), 16)
		}
	}

	function rgbToHex({ r, g, b }) {
		return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
	}

	function rgbToHsv({ r, g, b }) {
		const normalizedR = r / 255
		const normalizedG = g / 255
		const normalizedB = b / 255
		const max = Math.max(normalizedR, normalizedG, normalizedB)
		const min = Math.min(normalizedR, normalizedG, normalizedB)
		const delta = max - min
		let hue = 0

		if (delta !== 0) {
			if (max === normalizedR) {
				hue = 60 * (((normalizedG - normalizedB) / delta) % 6)
			} else if (max === normalizedG) {
				hue = 60 * ((normalizedB - normalizedR) / delta + 2)
			} else {
				hue = 60 * ((normalizedR - normalizedG) / delta + 4)
			}
		}

		return {
			h: hue < 0 ? hue + 360 : hue,
			s: max === 0 ? 0 : delta / max,
			v: max
		}
	}

	function hsvToRgb(h, s, v) {
		const normalizedHue = ((h % 360) + 360) % 360
		const chroma = v * s
		const segment = normalizedHue / 60
		const secondLargest = chroma * (1 - Math.abs((segment % 2) - 1))
		const match = v - chroma
		let red = 0
		let green = 0
		let blue = 0

		if (segment >= 0 && segment < 1) {
			red = chroma
			green = secondLargest
		} else if (segment < 2) {
			red = secondLargest
			green = chroma
		} else if (segment < 3) {
			green = chroma
			blue = secondLargest
		} else if (segment < 4) {
			green = secondLargest
			blue = chroma
		} else if (segment < 5) {
			red = secondLargest
			blue = chroma
		} else {
			red = chroma
			blue = secondLargest
		}

		return {
			r: Math.round((red + match) * 255),
			g: Math.round((green + match) * 255),
			b: Math.round((blue + match) * 255)
		}
	}

	function hsvToHex(h, s, v) {
		return rgbToHex(hsvToRgb(h, s, v))
	}

	function syncPickerFromHex(hex) {
		const rgb = hexToRgb(hex)

		if (!rgb) {
			return
		}

		const hsv = rgbToHsv(rgb)
		pickerHue = hsv.h
		pickerSaturation = hsv.s
		pickerValue = hsv.v
	}

	function beginColorChangeSession() {
		if (pendingHistorySnapshot === null) {
			pendingHistorySnapshot = cloneSeeds(seeds)
		}
	}

	function commitColorChangeSession() {
		if (pendingHistorySnapshot === null) {
			return
		}

		if (!seedsAreEqual(pendingHistorySnapshot, seeds)) {
			const nextHistory = colorHistory.slice(0, colorHistoryIndex + 1)
			nextHistory.push(cloneSeeds(seeds))
			colorHistory = nextHistory
			colorHistoryIndex = nextHistory.length - 1
		}

		pendingHistorySnapshot = null
	}

	function setSeedsState(nextSeeds) {
		seeds = cloneSeeds(nextSeeds)

		if (activeColorField && isValidHex(seeds[activeColorField])) {
			syncPickerFromHex(seeds[activeColorField])
		}
	}

	function updateSeed(role, value, options = {}) {
		const nextValue = options.sanitize === false ? value : sanitizeSeedInput(value)

		seeds = {
			...seeds,
			[role]: nextValue
		}

		if (role === activeColorField && !options.fromPicker && isValidHex(nextValue)) {
			syncPickerFromHex(nextValue)
		}
	}

	function activateColorField(role) {
		if (activeColorField !== role) {
			commitColorChangeSession()
		}

		activeColorField = role

		if (isValidHex(seeds[role])) {
			syncPickerFromHex(seeds[role])
		}
	}

	function handleSeedTextInput(role, value) {
		beginColorChangeSession()
		updateSeed(role, value)
	}

	function handleSeedFieldFocusOut(event) {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			closeColorPicker()
		}
	}

	async function handleCopySeed(role, value) {
		await navigator.clipboard.writeText(value)
		copiedSeedRole = role
		setTimeout(() => {
			if (copiedSeedRole === role) {
				copiedSeedRole = null
			}
		}, 1200)
	}

	async function handleCopyInstallCommand(target) {
		await navigator.clipboard.writeText(installCommand)

		if (target === "nav") {
			isNavInstallCopied = true
		}

		if (target === "hero") {
			isHeroInstallCopied = true
		}

		setTimeout(() => {
			if (target === "nav") {
				isNavInstallCopied = false
			}

			if (target === "hero") {
				isHeroInstallCopied = false
			}
		}, 1200)
	}

	function updateActiveSeedFromPicker() {
		if (!activeColorField) {
			return
		}

		updateSeed(activeColorField, hsvToHex(pickerHue, pickerSaturation, pickerValue), {
			fromPicker: true,
			sanitize: false
		})
	}

	function clamp(value, min, max) {
		return Math.min(max, Math.max(min, value))
	}

	function updateSaturationValueFromPointer(event) {
		if (!saturationValueElement) {
			return
		}

		const rect = saturationValueElement.getBoundingClientRect()
		const horizontalPosition = clamp((event.clientX - rect.left) / rect.width, 0, 1)
		const verticalPosition = clamp((event.clientY - rect.top) / rect.height, 0, 1)

		pickerSaturation = horizontalPosition
		pickerValue = 1 - verticalPosition
		updateActiveSeedFromPicker()
	}

	function updateHueFromPointer(event) {
		if (!hueTrackElement) {
			return
		}

		const rect = hueTrackElement.getBoundingClientRect()
		const horizontalPosition = clamp((event.clientX - rect.left) / rect.width, 0, 1)

		pickerHue = horizontalPosition * 360
		updateActiveSeedFromPicker()
	}

	function beginSaturationValueDrag(event) {
		if (!activeColorField) {
			return
		}

		event.preventDefault()
		beginColorChangeSession()
		activeDragTarget = "saturation-value"
		updateSaturationValueFromPointer(event)
	}

	function beginHueDrag(event) {
		if (!activeColorField) {
			return
		}

		event.preventDefault()
		beginColorChangeSession()
		activeDragTarget = "hue"
		updateHueFromPointer(event)
	}

	function handlePointerMove(event) {
		if (activeDragTarget === "saturation-value") {
			updateSaturationValueFromPointer(event)
		}

		if (activeDragTarget === "hue") {
			updateHueFromPointer(event)
		}
	}

	function handlePointerUp() {
		if (activeDragTarget === null) {
			return
		}

		commitColorChangeSession()
		activeDragTarget = null
	}

	function closeColorPicker() {
		commitColorChangeSession()
		activeColorField = null
		activeDragTarget = null
	}

	function handleColorPickerPointerDown(event) {
		event.preventDefault()
	}

	function getReadableTextColor(hex) {
		const rgb = hexToRgb(hex)

		if (!rgb) {
			return "#ffffff"
		}

		const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

		return luminance > 0.62 ? "#0f172a" : "#f8fafc"
	}

	function formatSchemeLabel(scheme) {
		return scheme
			.split("-")
			.map(part => part.charAt(0).toUpperCase() + part.slice(1))
			.join(" ")
	}

	function selectScheme(scheme) {
		demoScheme = scheme
		isSchemeOpen = false
	}

	async function updateSchemeMenuPlacement() {
		if (!isSchemeOpen || !schemeTriggerElement) {
			return
		}

		await tick()

		const triggerRect = schemeTriggerElement.getBoundingClientRect()
		const menuHeight = Math.min(schemeMenuElement?.scrollHeight ?? 288, 288)
		const spaceAbove = Math.max(triggerRect.top - 12, 0)
		const spaceBelow = Math.max(window.innerHeight - triggerRect.bottom - 12, 0)

		if (spaceBelow < menuHeight && spaceAbove >= spaceBelow) {
			schemeMenuDirection = "up"
			schemeMenuMaxHeight = Math.max(0, Math.min(288, spaceAbove))
			return
		}

		schemeMenuDirection = "down"
		schemeMenuMaxHeight = Math.max(0, Math.min(288, spaceBelow))
	}

	async function toggleSchemeMenu() {
		isSchemeOpen = !isSchemeOpen

		if (isSchemeOpen) {
			await updateSchemeMenuPlacement()
		}
	}

	function handleSchemeFocusOut(event) {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			isSchemeOpen = false
		}
	}

	function isScrollableSchemeMenuEvent(event) {
		return schemeMenuElement ? schemeMenuElement.contains(event.target) : false
	}

	function handleSchemeWheel(event) {
		if (!isSchemeOpen) {
			return
		}

		if (!isScrollableSchemeMenuEvent(event)) {
			event.preventDefault()
			return
		}

		const maxScrollTop = schemeMenuElement.scrollHeight - schemeMenuElement.clientHeight
		const isScrollingUp = event.deltaY < 0
		const isScrollingDown = event.deltaY > 0
		const isAtTop = schemeMenuElement.scrollTop <= 0
		const isAtBottom = schemeMenuElement.scrollTop >= maxScrollTop

		if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
			event.preventDefault()
		}
	}

	function handleSchemeTouchMove(event) {
		if (isSchemeOpen && !isScrollableSchemeMenuEvent(event)) {
			event.preventDefault()
		}
	}

	function handleSchemeKeydown(event) {
		if (!isSchemeOpen) {
			return
		}

		const scrollKeys = ["PageUp", "PageDown", "End", "Home", "ArrowUp", "ArrowDown"]
		const isSpaceKey = event.key === " " || event.code === "Space"

		if ((isSpaceKey || scrollKeys.includes(event.key)) && !isScrollableSchemeMenuEvent(event)) {
			event.preventDefault()
		}
	}

	function handleCopyCode() {
		const code = `import palette from '@jacoblockett/palette';\n\nconst theme = palette({\n  text: '${seeds.text}',\n  background: '${seeds.background}',\n  primary: '${seeds.primary}',\n  secondary: '${seeds.secondary}',\n  accent: '${seeds.accent}',\n  scheme: '${demoScheme}',\n  wcag: ${wcag}\n});\nconsole.log(theme);`
		navigator.clipboard.writeText(code)
		isCopied = true
		setTimeout(() => {
			isCopied = false
		}, 2000)
	}

	function createRandomHex() {
		return `#${Math.floor(Math.random() * 0xffffff)
			.toString(16)
			.padStart(6, "0")}`
	}

	function randomizeSeeds() {
		commitColorChangeSession()

		const nextSeeds = {
			text: createRandomHex(),
			background: createRandomHex(),
			primary: createRandomHex(),
			secondary: createRandomHex(),
			accent: createRandomHex()
		}

		const nextHistory = colorHistory.slice(0, colorHistoryIndex + 1)
		nextHistory.push(cloneSeeds(nextSeeds))
		colorHistory = nextHistory
		colorHistoryIndex = nextHistory.length - 1
		setSeedsState(nextSeeds)
	}

	function undoColorChange() {
		if (colorHistoryIndex === 0) {
			return
		}

		pendingHistorySnapshot = null
		colorHistoryIndex -= 1
		setSeedsState(colorHistory[colorHistoryIndex])
	}

	function redoColorChange() {
		if (colorHistoryIndex >= colorHistory.length - 1) {
			return
		}

		pendingHistorySnapshot = null
		colorHistoryIndex += 1
		setSeedsState(colorHistory[colorHistoryIndex])
	}

	$: pickerHueColor = `hsl(${pickerHue} 100% 50%)`

	onMount(() => {
		window.addEventListener("wheel", handleSchemeWheel, { passive: false })
		window.addEventListener("touchmove", handleSchemeTouchMove, { passive: false })
		window.addEventListener("keydown", handleSchemeKeydown)

		return () => {
			window.removeEventListener("wheel", handleSchemeWheel)
			window.removeEventListener("touchmove", handleSchemeTouchMove)
			window.removeEventListener("keydown", handleSchemeKeydown)
		}
	})
</script>

<svelte:window
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onresize={() => isSchemeOpen && updateSchemeMenuPlacement()}
	onscroll={() => isSchemeOpen && updateSchemeMenuPlacement()} />

<div class="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
	<nav class="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16 items-center">
				<div class="flex items-center gap-8">
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
							<Palette class="w-5 h-5 text-white" />
						</div>
						<span class="font-bold text-xl tracking-tight">Palette</span>
					</div>
					<div class="hidden md:flex gap-8 text-sm font-medium text-slate-300">
						<a href="#playground" class="hover:text-white transition-colors">Playground</a>
						<a href="#features" class="hover:text-white transition-colors">Features</a>
						<a href="#testimonials" class="hover:text-white transition-colors">Testimonials</a>
						<a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<button
						aria-label="Toggle color mode"
						class="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition-colors hover:bg-slate-800">
						<Moon class="w-5 h-5" />
					</button>
					<a
						href="https://github.com/jacoblockett/palette"
						target="_blank"
						rel="noreferrer"
						class="inline-flex h-10 w-10 items-center justify-center text-slate-400 transition-colors hover:text-white">
						<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 fill-current" role="img">
							<path d={siGithub.path}></path>
						</svg>
					</a>
					<button
						type="button"
						aria-label="Copy install command"
						onclick={() => handleCopyInstallCommand("nav")}
						class="relative hidden h-10 sm:inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-4 text-xs font-mono text-slate-300 transition-colors hover:bg-slate-800">
						<span
							class={`pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-950 px-3 py-1.5 text-sm font-semibold text-slate-100 shadow-xl transition-all duration-150 ${isNavInstallCopied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}>
							Copied!
						</span>
						<span class="flex items-center gap-2">
							<Terminal class="w-3 h-3 text-indigo-400" />
							{installCommand}
						</span>
					</button>
				</div>
			</div>
		</div>
	</nav>

	<section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
		<h1
			class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
			Enterprise-grade colors. <br class="hidden md:block" />
			Zero cost.
		</h1>
		<p class="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
			Why pick light and dark mode colors manually when you can install a dependency that mathematically generates all 5
			roles and 20 shades automatically? Welcome to the future.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
			<button
				class="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)]">
				Read the docs <ArrowRight class="w-4 h-4" />
			</button>
			<button
				type="button"
				onclick={() => handleCopyInstallCommand("hero")}
				class="relative flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-full font-semibold transition-colors border border-slate-700 font-mono text-sm">
				<span
					class={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-white/10 bg-slate-950 px-3 py-1.5 text-sm font-semibold text-slate-100 shadow-xl transition-all duration-150 ${isHeroInstallCopied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
					Copied!
				</span>
				<Terminal class="w-4 h-4" />
				{installCommand}
			</button>
		</div>
	</section>

	<section id="playground" class="py-20 bg-slate-900 border-y border-white/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mb-8">
				<h2 class="text-3xl font-bold mb-4">Playground</h2>
				<p class="text-slate-400 leading-relaxed">Go ahead. Change the colors. I dare you.</p>
			</div>
			<div class="grid gap-8 items-start lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-12">
				<div>
					<div class="space-y-6 bg-slate-950 p-6 rounded-2xl border border-white/10">
						<div class="flex items-center justify-center gap-4">
							<div class="flex items-center gap-2">
								<button
									type="button"
									aria-label="Randomize colors"
									onclick={randomizeSeeds}
									class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition-colors hover:bg-slate-800">
									<Dices class="w-4 h-4" />
								</button>
								<button
									type="button"
									aria-label="Undo color change"
									onclick={undoColorChange}
									disabled={colorHistoryIndex === 0}
									class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
									<Undo2 class="w-4 h-4" />
								</button>
								<button
									type="button"
									aria-label="Redo color change"
									onclick={redoColorChange}
									disabled={colorHistoryIndex >= colorHistory.length - 1}
									class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
									<Redo2 class="w-4 h-4" />
								</button>
								<button
									type="button"
									aria-label="Toggle color mode"
									class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition-colors hover:bg-slate-800">
									<Moon class="w-4 h-4" />
								</button>
							</div>
						</div>

						<div class="grid gap-4 sm:grid-cols-2">
							{#each seedFields as field, index}
								<div class="relative" onfocusout={handleSeedFieldFocusOut}>
									<label class="mb-2 block text-sm font-medium text-slate-400">{field.label}</label>
									<div class="relative">
										<input
											type="text"
											value={seeds[field.key]}
											onfocus={() => activateColorField(field.key)}
											onclick={() => activateColorField(field.key)}
											oninput={event => handleSeedTextInput(field.key, event.currentTarget.value)}
											class="h-12 w-full rounded-xl border border-white/10 px-4 pr-12 font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
											style={`background-color: ${seeds[field.key]}; color: ${getReadableTextColor(seeds[field.key])};`} />
										<button
											type="button"
											aria-label={`Copy ${field.label} hex`}
											onclick={() => handleCopySeed(field.key, seeds[field.key])}
											class="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-950 text-slate-200 transition-colors hover:bg-slate-900">
											{#if copiedSeedRole === field.key}
												<CheckCircle2 class="w-3.5 h-3.5" />
											{:else}
												<Copy class="w-3.5 h-3.5" />
											{/if}
										</button>
									</div>
									{#if activeColorField === field.key}
										<div
											class={`absolute top-[calc(100%+0.75rem)] z-30 w-[min(20rem,calc(100vw-2.5rem))] ${index % 2 === 0 ? "left-0" : "right-0"}`}>
											<div
												onpointerdown={handleColorPickerPointerDown}
												class="rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.95)]">
												<div class="space-y-4">
													<div
														bind:this={saturationValueElement}
														onpointerdown={beginSaturationValueDrag}
														class="relative h-48 w-full border border-white/10 touch-none">
														<div
															class="absolute inset-px overflow-hidden"
															style={`background:
																linear-gradient(to top, rgb(0 0 0), transparent),
																linear-gradient(to right, rgb(255 255 255), ${pickerHueColor});`}>
														</div>
														<div
															class="pointer-events-none absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-transparent shadow-[0_0_0_1px_rgba(15,23,42,0.9)]"
															style={`left: ${pickerSaturation * 100}%; top: ${(1 - pickerValue) * 100}%;`}>
														</div>
													</div>
													<div class="space-y-2">
														<div class="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Hue</div>
														<div
															bind:this={hueTrackElement}
															onpointerdown={beginHueDrag}
															class="relative h-4 w-full overflow-visible touch-none">
															<div class="absolute inset-0 overflow-hidden rounded-full border border-white/10">
																<div
																	class="absolute inset-px rounded-full"
																	style="background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);">
																</div>
															</div>
															<div
																class="pointer-events-none absolute top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-transparent shadow-[0_0_0_1px_rgba(15,23,42,0.85)]"
																style={`left: ${(pickerHue / 360) * 100}%;`}>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>

						<div class="relative" tabindex="-1" onfocusout={handleSchemeFocusOut}>
							<label class="block text-sm font-medium text-slate-400 mb-2">Scheme</label>
							<button
								bind:this={schemeTriggerElement}
								type="button"
								onclick={toggleSchemeMenu}
								class="flex h-12 w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 text-sm text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
								<span>{formatSchemeLabel(demoScheme)}</span>
								<ChevronDown
									class={`w-4 h-4 text-slate-400 transition-transform ${isSchemeOpen ? "rotate-180" : ""}`} />
							</button>
							{#if isSchemeOpen}
								<div
									class={`absolute left-0 right-0 z-20 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] ${schemeMenuDirection === "up" ? "bottom-[calc(100%+0.5rem)]" : "top-[calc(100%+0.5rem)]"}`}>
									<div
										bind:this={schemeMenuElement}
										class="scheme-menu-scrollbar overflow-y-auto p-2"
										style={`max-height: ${schemeMenuMaxHeight}px;`}>
										{#each supportedSchemes as scheme}
											<button
												type="button"
												onclick={() => selectScheme(scheme)}
												class={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
													demoScheme === scheme
														? "bg-slate-700 text-white"
														: "text-slate-300 hover:bg-slate-700/80 hover:text-white"
												}`}>
												{formatSchemeLabel(scheme)}
											</button>
										{/each}
									</div>
								</div>
							{/if}
						</div>

						<div class="flex items-center gap-3 pt-2">
							<button
								type="button"
								onclick={() => (wcag = !wcag)}
								class={`w-12 h-6 rounded-full transition-colors relative ${wcag ? "bg-indigo-500" : "bg-slate-700"}`}>
								<div
									class={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${wcag ? "translate-x-7" : "translate-x-1"}`}>
								</div>
							</button>
							<label class="text-sm font-medium text-slate-400">Strict WCAG Checks</label>
						</div>
					</div>
				</div>

				<div class="relative">
					<div
						class="pointer-events-none absolute -inset-2 bg-gradient-to-br from-indigo-500/25 via-purple-500/15 to-blue-500/10 blur-3xl">
					</div>
					<div class="relative bg-[#0d1117] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
						<div class="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
							<div class="flex gap-2">
								<div class="w-3 h-3 rounded-full bg-red-500/80"></div>
								<div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
								<div class="w-3 h-3 rounded-full bg-green-500/80"></div>
							</div>
							<div class="text-sm text-slate-400">Don't worry, I don't actually use Unix</div>
							<button onclick={handleCopyCode} class="text-slate-400 flex items-center gap-1.5 text-xs font-medium">
								{#if isCopied}
									<CheckCircle2 class="w-3.5 h-3.5 text-green-400" />
								{:else}
									<Copy class="w-3.5 h-3.5" />
								{/if}
								{isCopied ? "Copied" : "Copy"}
							</button>
						</div>
						<div class="p-4 sm:p-6 text-sm font-mono text-slate-300 overflow-x-auto">
							<div class="text-slate-500">// 1. Import the totally-not-already-taken package name</div>
							<div class="mb-4 text-purple-400">
								import <span class="text-white">palette</span> from
								<span class="text-green-400">"@jacoblockett/palette"</span>
								<div class="text-slate-500">// const palette = require("@jacoblockett/palette")</div>
								<div class="text-slate-500 mb-2">// for those of you who can't let go</div>
							</div>
							<div class="text-slate-500">// 2. Do the thang</div>
							<div class="mb-6 text-indigo-300">
								const <span class="text-white">theme</span> = <span class="text-blue-300">palette</span>(&#123;
								<div class="pl-4">
									<span class="text-slate-300"> text:</span> <span class="text-green-400">"{seeds.text}"</span>,
								</div>
								<div class="pl-4">
									<span class="text-slate-300"> background:</span>
									<span class="text-green-400">"{seeds.background}"</span>,
								</div>
								<div class="pl-4">
									<span class="text-slate-300"> primary:</span> <span class="text-green-400">"{seeds.primary}"</span>,
								</div>
								<div class="pl-4">
									<span class="text-slate-300"> secondary:</span>
									<span class="text-green-400">"{seeds.secondary}"</span>,
								</div>
								<div class="pl-4">
									<span class="text-slate-300"> accent:</span> <span class="text-green-400">"{seeds.accent}"</span>,
								</div>
								<div class="pl-4">
									<span class="text-slate-300"> scheme:</span> <span class="text-green-400">"{demoScheme}"</span>,
								</div>
								<div class="pl-4">
									<span class="text-slate-300"> wcag:</span>
									<span class="text-yellow-400">{wcag ? "true" : "false"}</span>
								</div>
								&#125;)
							</div>
							<div class="text-slate-500">// 3. Stare in awe</div>
							<div class="flex flex-col gap-1">
								&#123;
								<div class="pl-4">"light": &#123;</div>
								<div class="pl-8">"text": "<span class="text-yellow-300">{generatedPalette.light.text}</span>",</div>
								<div class="pl-8">
									"background": "<span class="text-yellow-300">{generatedPalette.light.background}</span>",
								</div>
								<div class="pl-8">
									"primary": "<span class="text-yellow-300">{generatedPalette.light.primary}</span>",
								</div>
								<div class="pl-8">
									"secondary": "<span class="text-yellow-300">{generatedPalette.light.secondary}</span>",
								</div>
								<div class="pl-8">
									"accent": "<span class="text-yellow-300">{generatedPalette.light.accent}</span>",
								</div>
								<div class="pl-8">"shades": &#123; <span class="text-slate-500">/* 10 to 200 */</span> &#125;</div>
								<div class="pl-4">&#125;,</div>
								<div class="pl-4">"dark": &#123;</div>
								<div class="pl-8">
									"background": "<span class="text-yellow-300">{generatedPalette.dark.background}</span>",
								</div>
								<div class="pl-8 text-slate-500">...</div>
								<div class="pl-4">&#125;</div>
								&#125;
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="features" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Features that sound cool.</h2>
			<p class="text-slate-400 text-lg">This section has never been useful... like, ever.</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			{#each features as feature, idx (idx)}
				<div class="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:bg-slate-800/80 transition-colors">
					<div class="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-white/5 mb-6">
						<svelte:component this={feature.icon} class={feature.iconClass} />
					</div>
					<h3 class="text-xl font-bold mb-3">{feature.title}</h3>
					<p class="text-slate-400 leading-relaxed">{feature.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<section id="testimonials" class="py-24 bg-slate-900 border-y border-white/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4">Testimonials from real-ish people.</h2>
				<p class="text-slate-400 text-lg">Social proof, because apparently software needs witnesses now.</p>
			</div>

			<div class="testimonials-carousel relative overflow-hidden">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-900 to-transparent">
				</div>
				<div
					class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-900 to-transparent">
				</div>
				<div class="testimonials-track flex w-max gap-8">
					{#each [...testimonials, ...testimonials] as testimonial, idx (idx)}
						<div class="w-[20rem] shrink-0 rounded-2xl border border-white/10 bg-slate-950 p-8 md:w-[24rem]">
							<p class="mb-6 text-slate-300 leading-relaxed">"{testimonial.quote}"</p>
							<div>
								<div class="font-semibold text-white">{testimonial.name}</div>
								<div class="text-sm text-slate-500">{testimonial.role}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section id="pricing" class="py-24 bg-slate-900 border-t border-white/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4">Pricing that scales with you.</h2>
				<p class="text-slate-400 text-lg">By which we mean it's literally just open source.</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				<div class="flex flex-col bg-slate-950 rounded-3xl p-8 border border-white/10">
					<h3 class="text-xl font-semibold mb-2">Open Source</h3>
					<div class="flex items-baseline gap-1 mb-6">
						<span class="text-4xl font-bold">$0</span>
						<span class="text-slate-400">/forever</span>
					</div>
					<p class="text-slate-400 mb-8">Perfect for developers who know how to use a package manager.</p>
					<ul class="space-y-4 mb-8">
						{#each openSourceFeatures as item, i (i)}
							<li class="flex items-center gap-3 text-sm text-slate-300">
								<CheckCircle2 class="w-4 h-4 text-indigo-400" />
								{item}
							</li>
						{/each}
					</ul>
					<div class="mt-auto">
						<a
							href="https://github.com/jacoblockett/palette"
							class="block text-center w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors">
							View on GitHub
						</a>
						<p class="text-slate-400 mt-4 text-xs">* If you consider a lone dev a community</p>
					</div>
				</div>

				<div
					class="relative flex flex-col bg-gradient-to-b from-indigo-500/10 to-slate-950 rounded-3xl p-8 border border-indigo-500/30">
					<div class="absolute top-0 right-8 transform -translate-y-1/2">
						<span class="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
							Enterprise
						</span>
					</div>
					<h3 class="text-xl font-semibold mb-2">Enterprise</h3>
					<div class="flex items-baseline gap-1 mb-6">
						<span class="text-4xl font-bold">$0</span>
						<span class="text-slate-400">/forever</span>
					</div>
					<p class="text-slate-400 mb-8">
						The exact same code, but you wear a suit while running it. Or maybe not. Idk what your dresscode looks like.
					</p>
					<ul class="space-y-4 mb-8">
						{#each enterpriseFeatures as item, i (i)}
							<li class="flex items-center gap-3 text-sm text-slate-300">
								<CheckCircle2 class="w-4 h-4 text-indigo-400" />
								{item}
							</li>
						{/each}
					</ul>
					<div class="mt-auto">
						<a
							href="https://github.com/jacoblockett/palette"
							class="block text-center w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-lg shadow-indigo-500/25">
							Also View on GitHub
						</a>
						<p class="text-slate-400 mt-4 text-xs">* Or at least, we'll say we did and never actually do it</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<footer class="py-12 border-t border-white/10 bg-slate-950 text-center text-slate-400 text-sm">
		<div class="flex items-center justify-center gap-2 mb-4">
			<Palette class="w-5 h-5 text-indigo-400" />
			<span class="font-semibold text-white">Palette</span>
		</div>
		<div class="flex justify-center gap-6">
			<a href="https://github.com/jacoblockett/palette" class="hover:text-white transition-colors">Documentation</a>
			<a href="https://github.com/jacoblockett/palette" class="hover:text-white transition-colors">GitHub</a>
		</div>
	</footer>
</div>

<style>
	.scheme-menu-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: #475569 #1e293b;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar {
		width: 10px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-track {
		background: #1e293b;
		border-radius: 9999px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-thumb {
		background: #475569;
		border: 2px solid #1e293b;
		border-radius: 9999px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #64748b;
	}

	.testimonials-track {
		animation: testimonials-scroll 36s linear infinite;
	}

	.testimonials-carousel:hover .testimonials-track {
		animation-play-state: paused;
	}

	@keyframes testimonials-scroll {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(calc(-50% - 1rem));
		}
	}
</style>
