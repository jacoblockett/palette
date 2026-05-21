<script>
	import { onMount, tick } from "svelte"
	import palette from "../../src/index.js"
	import {
		ArrowRight,
		CheckCircle2,
		ChevronDown,
		Code,
		Copy,
		Dices,
		Layers,
		Lock,
		Moon,
		Palette,
		Redo2,
		Terminal,
		Unlock,
		Undo2,
		Zap
	} from "@lucide/svelte"
	import { siGithub } from "simple-icons"

	let activeColorMode = "dark"
	let theme = palette()
	let demoScheme = "random"
	let wcag = false
	let isCopied = false
	let copiedSeedRole = null
	let lockedSeedRoles = {}
	let isNavInstallCopied = false
	let isHeroInstallCopied = false
	let isLightPreviewShadesExpanded = false
	let isDarkPreviewShadesExpanded = false
	let activeColorField = null
	let lastGeneratedPalette = theme
	let paletteErrorMessage = null
	let paletteErrorRoles = []
	let isSchemeOpen = false
	let pickerHue = 218
	let pickerSaturation = 0.75
	let pickerValue = 0.96
	let activeDragTarget = null
	let appElement
	let colorPickerPopoverElement
	let saturationValueElement
	let hueTrackElement
	let schemeTriggerElement
	let schemeMenuElement
	let schemeMenuDirection = "down"
	let schemeMenuMaxHeight = 288
	let colorHistory = [createPlaygroundSnapshot()]
	let colorHistoryIndex = 0
	let pendingHistorySnapshot = null

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
	const fixedNavbarHeight = 64
	const colorPickerViewportBuffer = 24
	const previewShadeSteps = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "130", "140", "150", "160", "170", "180", "190", "200"]
	const themeShadeStops = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
	const previewShadeControlGutterClass = "inline-flex w-16 shrink-0 justify-end pr-2"
	const previewShadeCodeColumnClass = "min-w-0"
	const previewShadeButtonClass =
		"inline-flex items-center rounded-full border border-[var(--theme-background-140)] bg-[var(--theme-background-30)] px-2 py-0.5 text-xs font-medium normal-case tracking-normal text-[var(--theme-text-160)]"

	const features = [
		{
			icon: Layers,
			iconClass: "w-6 h-6",
			title: "Seedable Configuration",
			desc: "Provide zero to five seed colors, and we deterministically hallucinate the rest. Like magic, if you don't understand basic math."
		},
		{
			icon: Zap,
			iconClass: "w-6 h-6",
			title: "Aggressive WCAG",
			desc: "If your input or generated colors fail minimum accessibility checks, we throw an error and crash your app. You're welcome."
		},
		{
			icon: Code,
			iconClass: "w-6 h-6",
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

	function updateTheme(newTheme) {
		if (newTheme.light && newTheme.dark) {
			theme = newTheme
			applyThemeVariables()
			return
		}

		const colors = theme[activeColorMode]
		const [role, value] = Object.entries(newTheme)[0]
		const nextModeTheme = {
			...colors,
			[role]: value,
			shades: {
				text: { ...colors.shades.text },
				background: { ...colors.shades.background },
				primary: { ...colors.shades.primary },
				secondary: { ...colors.shades.secondary },
				accent: { ...colors.shades.accent }
			}
		}

		if (role === "background") {
			if (seedFields.every(field => isValidHex(nextModeTheme[field.key]))) {
				nextModeTheme.shades = palette.shades({
					background: nextModeTheme.background,
					colors: {
						text: nextModeTheme.text,
						background: nextModeTheme.background,
						primary: nextModeTheme.primary,
						secondary: nextModeTheme.secondary,
						accent: nextModeTheme.accent
					},
					wcag: false
				})
			}
		} else if (isValidHex(nextModeTheme.background) && isValidHex(value)) {
			const nextRoleShades = palette.shades({
				background: nextModeTheme.background,
				colors: {
					[role]: value
				},
				wcag: false
			})

			nextModeTheme.shades[role] = nextRoleShades[role]
		}

		theme = {
			...theme,
			[activeColorMode]: nextModeTheme
		}
		applyThemeVariables()
	}

	function applyThemeVariables() {
		if (!appElement) {
			return
		}

		const activeTheme = theme[activeColorMode]
		appElement.style.setProperty("--theme-text", activeTheme.text)
		appElement.style.setProperty("--theme-background", activeTheme.background)
		appElement.style.setProperty("--theme-primary", activeTheme.primary)
		appElement.style.setProperty("--theme-secondary", activeTheme.secondary)
		appElement.style.setProperty("--theme-accent", activeTheme.accent)

		for (const role of ["text", "background", "primary", "secondary", "accent"]) {
			for (const stop of themeShadeStops) {
				appElement.style.setProperty(`--theme-${role}-${stop}`, activeTheme.shades[role][stop])
			}
		}
	}

	function cloneGeneratedPalette(source) {
		return {
			light: {
				text: source.light.text,
				background: source.light.background,
				primary: source.light.primary,
				secondary: source.light.secondary,
				accent: source.light.accent,
				shades: {
					text: { ...source.light.shades.text },
					background: { ...source.light.shades.background },
					primary: { ...source.light.shades.primary },
					secondary: { ...source.light.shades.secondary },
					accent: { ...source.light.shades.accent }
				}
			},
			dark: {
				text: source.dark.text,
				background: source.dark.background,
				primary: source.dark.primary,
				secondary: source.dark.secondary,
				accent: source.dark.accent,
				shades: {
					text: { ...source.dark.shades.text },
					background: { ...source.dark.shades.background },
					primary: { ...source.dark.shades.primary },
					secondary: { ...source.dark.shades.secondary },
					accent: { ...source.dark.shades.accent }
				}
			}
		}
	}

	function cloneTheme(source) {
		return cloneGeneratedPalette(source)
	}

	function createPlaygroundSnapshot() {
		return {
			theme: cloneTheme(theme),
			lockedSeedRoles: { ...lockedSeedRoles },
			activeColorMode,
			demoScheme,
			wcag,
			lastGeneratedPalette: cloneGeneratedPalette(lastGeneratedPalette),
			paletteErrorMessage,
			paletteErrorRoles: [...paletteErrorRoles]
		}
	}

	function applyPlaygroundSnapshot(snapshot) {
		theme = cloneTheme(snapshot.theme)
		lockedSeedRoles = { ...snapshot.lockedSeedRoles }
		activeColorMode = snapshot.activeColorMode
		demoScheme = snapshot.demoScheme
		wcag = snapshot.wcag
		lastGeneratedPalette = cloneGeneratedPalette(snapshot.lastGeneratedPalette)
		paletteErrorMessage = snapshot.paletteErrorMessage ?? null
		paletteErrorRoles = [...(snapshot.paletteErrorRoles ?? [])]

		if (activeColorField && isValidHex(theme[activeColorMode][activeColorField])) {
			syncPickerFromHex(theme[activeColorMode][activeColorField])
		}
	}

	function playgroundSnapshotsAreEqual(first, second) {
		return JSON.stringify(first) === JSON.stringify(second)
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
			pendingHistorySnapshot = createPlaygroundSnapshot()
		}
	}

	function commitColorChangeSession() {
		if (pendingHistorySnapshot === null) {
			return
		}

		const nextSnapshot = createPlaygroundSnapshot()

		if (!playgroundSnapshotsAreEqual(pendingHistorySnapshot, nextSnapshot)) {
			const nextHistory = colorHistory.slice(0, colorHistoryIndex + 1)
			nextHistory.push(nextSnapshot)
			colorHistory = nextHistory
			colorHistoryIndex = nextHistory.length - 1
		}

		pendingHistorySnapshot = null
	}

	function updateSeed(role, value, options = {}) {
		const nextValue = options.sanitize === false ? value : sanitizeSeedInput(value)

		updateTheme({ [role]: nextValue })

		if (role === activeColorField && !options.fromPicker && isValidHex(nextValue)) {
			syncPickerFromHex(nextValue)
		}
	}

	async function scrollActiveColorPickerIntoView() {
		await tick()

		if (!colorPickerPopoverElement) {
			return
		}

		const rect = colorPickerPopoverElement.getBoundingClientRect()
		const usableViewportTop = fixedNavbarHeight + colorPickerViewportBuffer
		const overflowTop = rect.top - usableViewportTop

		if (overflowTop < 0) {
			window.scrollBy({
				top: overflowTop,
				behavior: "smooth"
			})
		}
	}

	async function activateColorField(role) {
		if (activeColorField !== role) {
			commitColorChangeSession()
		}

		activeColorField = role

		if (isValidHex(theme[activeColorMode][role])) {
			syncPickerFromHex(theme[activeColorMode][role])
		}

		await scrollActiveColorPickerIntoView()
	}

	async function handleSeedInputFocus(role, event) {
		await activateColorField(role)
		event.currentTarget.select()
	}

	function handleSeedTextInput(role, value) {
		beginColorChangeSession()
		clearPaletteError()
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

		clearPaletteError()
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

	function clearPaletteError() {
		paletteErrorMessage = null
		paletteErrorRoles = []
	}

	function getPaletteErrorRoles(errorMessage) {
		if (errorMessage === "palette text and background cannot be the same color.") {
			return ["text", "background"]
		}

		const contrastMatch = errorMessage.match(
			/^palette ([a-z]+) seed #[0-9a-f]{6} must meet 4\.5 contrast against background #[0-9a-f]{6}\.$/
		)

		if (contrastMatch) {
			return [contrastMatch[1], "background"]
		}

		if (errorMessage === "palette seed values must be 6-digit hex colors.") {
			return seedFields
				.filter(field => lockedSeedRoles[field.key] && !isValidHex(theme[activeColorMode][field.key]))
				.map(field => field.key)
		}

		return []
	}

	function setPaletteGenerationError(error) {
		paletteErrorMessage = error.message
		paletteErrorRoles = getPaletteErrorRoles(error.message)
	}

	function hasPaletteError(role) {
		return paletteErrorRoles.includes(role)
	}

	function toggleSeedLock(role) {
		lockedSeedRoles = {
			...lockedSeedRoles,
			[role]: !lockedSeedRoles[role]
		}
		clearPaletteError()

		const nextHistory = colorHistory.slice(0, colorHistoryIndex + 1)
		nextHistory.push(createPlaygroundSnapshot())
		colorHistory = nextHistory
		colorHistoryIndex = nextHistory.length - 1
	}

	function getReadableTextColor(hex) {
		const rgb = hexToRgb(hex)

		if (!rgb) {
			return "#ffffff"
		}

		const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

		return luminance > 0.62 ? "#0f172a" : "#f8fafc"
	}

	function getSeedActionHoverColor(hex) {
		const rgb = hexToRgb(hex)

		if (!rgb) {
			return "rgba(248, 250, 252, 0.18)"
		}

		const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

		return luminance > 0.62 ? "rgba(15, 23, 42, 0.16)" : "rgba(248, 250, 252, 0.18)"
	}

	function getThemeShade(role, step) {
		return theme[activeColorMode].shades[role][step]
	}

	function getThemeRole(role) {
		return theme[activeColorMode][role]
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
		clearPaletteError()

		const nextHistory = colorHistory.slice(0, colorHistoryIndex + 1)
		nextHistory.push(createPlaygroundSnapshot())
		colorHistory = nextHistory
		colorHistoryIndex = nextHistory.length - 1
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

	function buildPaletteOptions() {
		const options = {}

		for (const field of seedFields) {
			if (lockedSeedRoles[field.key] && isValidHex(theme[activeColorMode][field.key])) {
				options[field.key] = theme[activeColorMode][field.key]
			}
		}

		if (demoScheme !== "random") {
			options.scheme = demoScheme
		}

		if (wcag) {
			options.wcag = true
		}

		return options
	}

	function buildPaletteCode() {
		const options = buildPaletteOptions()
		const entries = Object.entries(options)

		if (entries.length === 0) {
			return "import palette from '@jacoblockett/palette'\n\nconst theme = palette()"
		}

		const optionLines = entries.map(([key, value], index) => {
			const formattedValue = typeof value === "string" ? `"${value}"` : value ? "true" : "false"
			const comma = index === entries.length - 1 ? "" : ","

			return `\t${key}: ${formattedValue}${comma}`
		})

		return `import palette from '@jacoblockett/palette'\n\nconst theme = palette({\n${optionLines.join("\n")}\n})`
	}

	function createCodeSegmentsForText(text) {
		return {
			text,
			className: "text-slate-300"
		}
	}

	function buildCodePreviewLines() {
		return buildPaletteCode()
			.split("\n")
			.map(line => {
				const indent = line.match(/^\t*/)?.[0].length ?? 0
				const trimmedLine = line.slice(indent)

				if (trimmedLine === "") {
					return { indent, segments: [] }
				}

				if (trimmedLine.startsWith("import ")) {
					return {
						indent,
						segments: [
							{ text: "import ", className: "text-purple-400" },
							{ text: "palette", className: "text-white" },
							{ text: " from ", className: "text-purple-400" },
							{ text: trimmedLine.slice("import palette from ".length), className: "text-green-400" }
						]
					}
				}

				if (trimmedLine === "const theme = palette()") {
					return {
						indent,
						segments: [
							{ text: "const ", className: "text-purple-400" },
							{ text: "theme", className: "text-white" },
							{ text: " = ", className: "text-purple-400" },
							{ text: "palette", className: "text-blue-300" },
							{ text: "()", className: "text-purple-400" }
						]
					}
				}

				if (trimmedLine === "const theme = palette({") {
					return {
						indent,
						segments: [
							{ text: "const ", className: "text-purple-400" },
							{ text: "theme", className: "text-white" },
							{ text: " = ", className: "text-purple-400" },
							{ text: "palette", className: "text-blue-300" },
							{ text: "({", className: "text-purple-400" }
						]
					}
				}

				if (trimmedLine === "})") {
					return {
						indent,
						segments: [{ text: "})", className: "text-purple-400" }]
					}
				}

				const optionMatch = trimmedLine.match(/^([a-z]+): (.+?)(,?)$/)

				if (optionMatch) {
					const [, key, value, comma] = optionMatch
					const valueClassName = value === "true" || value === "false" ? "text-yellow-400" : "text-green-400"
					const segments = [createCodeSegmentsForText(`${key}: `), { text: value, className: valueClassName }]

					if (comma) {
						segments.push(createCodeSegmentsForText(comma))
					}

					return { indent, segments }
				}

				return {
					indent,
					segments: [createCodeSegmentsForText(trimmedLine)]
				}
			})
	}

	$: codePreviewLines = buildCodePreviewLines()

	function handleCopyCode() {
		navigator.clipboard.writeText(buildPaletteCode())
		isCopied = true
		setTimeout(() => {
			isCopied = false
		}, 2000)
	}

	function togglePreviewShades(mode) {
		if (mode === "light") {
			isLightPreviewShadesExpanded = !isLightPreviewShadesExpanded
		}

		if (mode === "dark") {
			isDarkPreviewShadesExpanded = !isDarkPreviewShadesExpanded
		}
	}

	function hidePreviewShades(mode) {
		if (mode === "light") {
			isLightPreviewShadesExpanded = false
		}

		if (mode === "dark") {
			isDarkPreviewShadesExpanded = false
		}
	}

	function getPreviewShadeValue(mode, role, step) {
		return lastGeneratedPalette[mode]?.shades?.[role]?.[step] ?? lastGeneratedPalette[mode]?.[role] ?? "#000000"
	}

	function getActivePreviewShadeValue(role, step) {
		return theme[activeColorMode].shades[role][step]
	}

	function createRandomHex() {
		return `#${Math.floor(Math.random() * 0xffffff)
			.toString(16)
			.padStart(6, "0")}`
	}

	function randomizeSeeds() {
		commitColorChangeSession()

		try {
			const nextGeneratedPalette = palette(buildPaletteOptions())
			lastGeneratedPalette = nextGeneratedPalette
			updateTheme(nextGeneratedPalette)

			if (activeColorField && isValidHex(nextGeneratedPalette[activeColorMode][activeColorField])) {
				syncPickerFromHex(nextGeneratedPalette[activeColorMode][activeColorField])
			}

			clearPaletteError()

			const nextHistory = colorHistory.slice(0, colorHistoryIndex + 1)
			nextHistory.push(createPlaygroundSnapshot())
			colorHistory = nextHistory
			colorHistoryIndex = nextHistory.length - 1
		} catch (error) {
			setPaletteGenerationError(error)
		}
	}

	function toggleActiveColorMode() {
		const nextMode = activeColorMode === "light" ? "dark" : "light"

		activeColorMode = nextMode

		if (activeColorField && isValidHex(theme[nextMode][activeColorField])) {
			syncPickerFromHex(theme[nextMode][activeColorField])
		}

		clearPaletteError()

		const nextHistory = colorHistory.slice(0, colorHistoryIndex + 1)
		nextHistory.push(createPlaygroundSnapshot())
		colorHistory = nextHistory
		colorHistoryIndex = nextHistory.length - 1
	}

	function toggleWcag() {
		wcag = !wcag
		clearPaletteError()

		const nextHistory = colorHistory.slice(0, colorHistoryIndex + 1)
		nextHistory.push(createPlaygroundSnapshot())
		colorHistory = nextHistory
		colorHistoryIndex = nextHistory.length - 1
	}

	function undoColorChange() {
		if (colorHistoryIndex === 0) {
			return
		}

		pendingHistorySnapshot = null
		colorHistoryIndex -= 1
		applyPlaygroundSnapshot(colorHistory[colorHistoryIndex])
	}

	function redoColorChange() {
		if (colorHistoryIndex >= colorHistory.length - 1) {
			return
		}

		pendingHistorySnapshot = null
		colorHistoryIndex += 1
		applyPlaygroundSnapshot(colorHistory[colorHistoryIndex])
	}

	$: pickerHueColor = `hsl(${pickerHue} 100% 50%)`

	onMount(() => {
		updateTheme(theme)
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

<div
	bind:this={appElement}
	data-theme={activeColorMode}
	class="min-h-screen bg-[var(--theme-background)] font-sans text-[var(--theme-text)] selection:bg-[var(--theme-primary-120)]">
	<nav
		class="fixed top-0 z-50 w-full border-b backdrop-blur-md"
		style="background-color: var(--theme-background-20); border-color: var(--theme-background-140);">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16 items-center">
				<div class="flex items-center gap-8">
					<div class="flex items-center gap-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg"
							style="background-image: linear-gradient(to bottom right, var(--theme-primary), var(--theme-accent));">
							<Palette class="w-5 h-5" style="color: var(--theme-background);" />
						</div>
						<span class="font-bold text-xl tracking-tight">Palette</span>
					</div>
					<div class="hidden gap-8 text-sm font-medium text-[var(--theme-text-150)] md:flex">
						<a href="#playground" class="transition-colors hover:text-[var(--theme-primary)]">Playground</a>
						<a href="#features" class="transition-colors hover:text-[var(--theme-primary)]">Features</a>
						<a href="#testimonials" class="transition-colors hover:text-[var(--theme-primary)]">Testimonials</a>
						<a href="#pricing" class="transition-colors hover:text-[var(--theme-primary)]">Pricing</a>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<button
						aria-label={`Switch to ${activeColorMode === "light" ? "dark" : "light"} mode`}
						onclick={toggleActiveColorMode}
						class="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-background-20)] md:inline-flex">
						<Moon />
					</button>
					<a
						href="https://github.com/jacoblockett/palette"
						target="_blank"
						rel="noreferrer"
						class="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-background-20)] md:inline-flex">
						<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 fill-current" role="img">
							<path d={siGithub.path}></path>
						</svg>
					</a>
					<button
						type="button"
						aria-label="Copy install command"
						onclick={() => handleCopyInstallCommand("nav")}
						class="relative ml-2 hidden h-10 items-center justify-center rounded-full border border-[var(--theme-background-140)] bg-[var(--theme-background-20)] px-4 font-mono text-[var(--theme-text)] text-xs transition-colors hover:bg-[var(--theme-background-40)] sm:inline-flex">
						<span
							class={`pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--theme-background-140)] bg-[var(--theme-background-200)] px-3 py-1.5 text-sm font-semibold text-[var(--theme-text)] shadow-xl transition-all duration-150 ${isNavInstallCopied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}>
							Copied!
						</span>
						<span class="flex items-center gap-2">
							<Terminal class="w-3 h-3" style="color: var(--theme-primary);" />
							{installCommand}
						</span>
					</button>
				</div>
			</div>
		</div>
	</nav>

	<section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
		<h1
			class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent"
			style="background-image: linear-gradient(to right, var(--theme-text), var(--theme-primary), var(--theme-accent));">
			Enterprise-grade colors. <br class="hidden md:block" />
			Zero cost.
		</h1>
		<p
			class="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
			style="color: var(--theme-text-150);">
			Why pick light and dark mode colors manually when you can install a dependency that mathematically generates all 5
			roles and 20 shades automatically? Welcome to the future.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
			<button
				class="flex items-center justify-center gap-2 rounded-full bg-[var(--theme-primary)] px-8 py-3.5 font-semibold text-[var(--theme-background)] transition-all shadow-[0_0_40px_-10px_var(--theme-primary-140)] hover:shadow-[0_0_60px_-15px_var(--theme-primary-170)]">
				Read the docs <ArrowRight class="w-4 h-4" />
			</button>
			<button
				type="button"
				onclick={() => handleCopyInstallCommand("hero")}
				class="relative flex items-center justify-center gap-2 rounded-full border border-[var(--theme-background-140)] bg-[var(--theme-background-20)] px-8 py-3.5 font-mono text-[var(--theme-text)] text-sm font-semibold transition-colors hover:bg-[var(--theme-background-40)]">
				<span
					class={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-[var(--theme-background-140)] bg-[var(--theme-background-200)] px-3 py-1.5 text-sm font-semibold text-[var(--theme-text)] shadow-xl transition-all duration-150 ${isHeroInstallCopied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
					Copied!
				</span>
				<Terminal class="w-4 h-4" />
				{installCommand}
			</button>
		</div>
	</section>

	<section
		id="playground"
		class="border-y border-[var(--theme-background-140)] bg-[var(--theme-background-20)] py-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="mb-8">
				<h2 class="text-3xl font-bold mb-4">Playground</h2>
				<p class="leading-relaxed text-[var(--theme-text-150)]">
					Go ahead. Change the colors. I dare you.
				</p>
			</div>
			<div class="grid gap-8 items-start lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-12">
				<div>
					<div class="space-y-6 rounded-2xl border border-[var(--theme-background-140)] bg-[var(--theme-background-30)] p-6">
						<div class="flex items-center justify-center gap-4">
							<div class="flex items-center gap-2">
								<button
									type="button"
									aria-label="Randomize colors"
									onclick={randomizeSeeds}
									class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--theme-background-140)] bg-[var(--theme-background-40)] text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-background-60)]">
									<Dices class="w-4 h-4" />
								</button>
								<button
									type="button"
									aria-label="Undo color change"
									onclick={undoColorChange}
									disabled={colorHistoryIndex === 0}
									class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--theme-background-140)] bg-[var(--theme-background-40)] text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-background-60)] disabled:cursor-not-allowed disabled:opacity-40">
									<Undo2 class="w-4 h-4" />
								</button>
								<button
									type="button"
									aria-label="Redo color change"
									onclick={redoColorChange}
									disabled={colorHistoryIndex >= colorHistory.length - 1}
									class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--theme-background-140)] bg-[var(--theme-background-40)] text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-background-60)] disabled:cursor-not-allowed disabled:opacity-40">
									<Redo2 class="w-4 h-4" />
								</button>
								<button
									type="button"
									aria-label={`Switch to ${activeColorMode === "light" ? "dark" : "light"} mode`}
									onclick={toggleActiveColorMode}
									class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--theme-background-140)] bg-[var(--theme-background-40)] text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-background-60)]">
									<Moon class="w-4 h-4" />
								</button>
							</div>
						</div>

						<div class="grid gap-4 sm:grid-cols-2">
							{#each seedFields as field, index}
								<div class="relative" onfocusout={handleSeedFieldFocusOut}>
									<label
										class="mb-2 block text-sm font-medium"
										style="color: var(--theme-text-150);">
										{field.label}
									</label>
									<div class="relative group">
										<input
											type="text"
											value={theme[activeColorMode][field.key]}
											onfocus={event => handleSeedInputFocus(field.key, event)}
											onclick={() => activateColorField(field.key)}
											oninput={event => handleSeedTextInput(field.key, event.currentTarget.value)}
											class={`h-12 w-full rounded-xl border px-4 pr-20 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] ${
												hasPaletteError(field.key) ? "border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent)]" : "border-[var(--theme-background-140)]"
											}`}
											style={`background-color: ${theme[activeColorMode][field.key]}; color: ${getReadableTextColor(theme[activeColorMode][field.key])};`} />
										<div class="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center">
											<button
												type="button"
												aria-label={`${lockedSeedRoles[field.key] ? "Unlock" : "Lock"} ${field.label} hex`}
												onclick={() => toggleSeedLock(field.key)}
												class={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-[var(--seed-action-color)] transition-colors opacity-0 group-hover:opacity-100 hover:bg-[var(--seed-action-hover)] ${lockedSeedRoles[field.key] ? "opacity-100" : ""}`}
												style={`--seed-action-color: ${getReadableTextColor(theme[activeColorMode][field.key])}; --seed-action-hover: ${getSeedActionHoverColor(theme[activeColorMode][field.key])};`}>
												{#if lockedSeedRoles[field.key]}
													<Lock class="w-3.5 h-3.5" />
												{:else}
													<Unlock class="w-3.5 h-3.5" />
												{/if}
											</button>
											<button
												type="button"
												aria-label={`Copy ${field.label} hex`}
												onclick={() => handleCopySeed(field.key, theme[activeColorMode][field.key])}
												class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-[var(--seed-action-color)] transition-colors opacity-0 group-hover:opacity-100 hover:bg-[var(--seed-action-hover)]"
												style={`--seed-action-color: ${getReadableTextColor(theme[activeColorMode][field.key])}; --seed-action-hover: ${getSeedActionHoverColor(theme[activeColorMode][field.key])};`}>
												{#if copiedSeedRole === field.key}
													<CheckCircle2 class="w-3.5 h-3.5" />
												{:else}
													<Copy class="w-3.5 h-3.5" />
												{/if}
											</button>
										</div>
									</div>
									{#if activeColorField === field.key}
										<div
											bind:this={colorPickerPopoverElement}
											class={`absolute bottom-[calc(100%+0.75rem)] z-30 w-[min(20rem,calc(100vw-2.5rem))] ${index % 2 === 0 ? "left-0" : "right-0"}`}>
											<div
												onpointerdown={handleColorPickerPointerDown}
												class="rounded-2xl border border-[var(--theme-background-140)] bg-[var(--theme-background-30)] p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.95)]">
												<div class="space-y-4">
														<div
															bind:this={saturationValueElement}
															onpointerdown={beginSaturationValueDrag}
															class="relative h-48 w-full border border-[var(--theme-background-140)] touch-none">
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
														<div
															class="text-xs font-medium uppercase tracking-[0.18em]"
															style="color: var(--theme-text-170);">
															Hue
														</div>
														<div
															bind:this={hueTrackElement}
															onpointerdown={beginHueDrag}
															class="relative h-4 w-full overflow-visible touch-none">
															<div class="absolute inset-0 overflow-hidden rounded-full border border-[var(--theme-background-140)]">
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
						{#if paletteErrorMessage}
							<div
								class="mr-auto rounded-xl border px-3 py-2 text-sm"
								style="color: var(--theme-accent); border-color: var(--theme-accent); background-color: var(--theme-accent-20);">
								{paletteErrorMessage}
							</div>
						{/if}

						<div class="relative" tabindex="-1" onfocusout={handleSchemeFocusOut}>
							<label
								class="block text-sm font-medium mb-2"
								style="color: var(--theme-text-150);">
								Scheme
							</label>
							<button
								bind:this={schemeTriggerElement}
								type="button"
								onclick={toggleSchemeMenu}
								class="flex h-12 w-full items-center justify-between rounded-xl border border-[var(--theme-background-140)] bg-[var(--theme-background-40)] px-4 text-[var(--theme-text)] text-sm transition-colors hover:bg-[var(--theme-background-60)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]">
								<span>{formatSchemeLabel(demoScheme)}</span>
								<ChevronDown
									class={`w-4 h-4 transition-transform ${isSchemeOpen ? "rotate-180" : ""}`}
									style="color: var(--theme-text-170);" />
							</button>
							{#if isSchemeOpen}
								<div
									class={`absolute left-0 right-0 z-20 overflow-hidden rounded-xl border border-[var(--theme-background-140)] bg-[var(--theme-background-30)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] ${schemeMenuDirection === "up" ? "bottom-[calc(100%+0.5rem)]" : "top-[calc(100%+0.5rem)]"}`}>
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
														? "bg-[var(--theme-primary-40)] text-[var(--theme-primary)]"
														: "hover:bg-[var(--theme-background-60)] hover:text-[var(--theme-text)]"
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
								onclick={toggleWcag}
								class={`relative h-6 w-12 rounded-full transition-colors ${wcag ? "bg-[var(--theme-primary)]" : "bg-[var(--theme-background-60)]"}`}>
								<div
									class={`w-4 h-4 rounded-full bg-[var(--theme-background)] absolute top-1 transition-transform ${wcag ? "translate-x-7" : "translate-x-1"}`}>
								</div>
							</button>
							<label class="text-sm font-medium" style="color: var(--theme-text-150);">
								Strict WCAG Checks
							</label>
						</div>
					</div>
				</div>

				<div class="relative">
					<div
						class="pointer-events-none absolute -inset-2 blur-3xl"
						style={`background-image: linear-gradient(to bottom right, ${getActivePreviewShadeValue("primary", activeColorMode === "light" ? "20" : "160")}, ${getActivePreviewShadeValue("secondary", activeColorMode === "light" ? "20" : "160")}, ${getActivePreviewShadeValue("accent", activeColorMode === "light" ? "20" : "160")});`}>
					</div>
					<div
						class="relative overflow-hidden rounded-2xl border border-[var(--theme-background-140)] bg-[var(--theme-background-20)] shadow-2xl">
						<div
							class="relative flex items-center border-b border-[var(--theme-background-140)] bg-[var(--theme-background-30)] px-4 py-3">
							<div class="relative z-10 flex gap-2">
								<div class="h-3 w-3 rounded-full bg-[var(--theme-accent)]"></div>
								<div class="h-3 w-3 rounded-full bg-[var(--theme-secondary)]"></div>
								<div class="h-3 w-3 rounded-full bg-[var(--theme-primary)]"></div>
							</div>
							<div
								class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm"
								style="color: var(--theme-text-160);">
								Don't worry, I don't actually use Unix
							</div>
							<button
								onclick={handleCopyCode}
								class="relative z-10 ml-auto flex w-16 items-center gap-1.5 rounded-full border border-[var(--theme-background-140)] bg-[var(--theme-background-40)] px-3 py-1.5 text-xs font-medium text-[var(--theme-primary)] transition-colors hover:bg-[var(--theme-background-60)]">
								{#if isCopied}
									<CheckCircle2 class="h-3.5 w-3.5 text-[var(--theme-primary)]" />
								{:else}
									<Copy class="w-3.5 h-3.5" />
								{/if}
								{isCopied ? "Copied" : "Copy"}
							</button>
						</div>
						<div
							class="overflow-x-auto overflow-y-auto px-4 py-4 text-sm font-mono sm:px-6 sm:py-6"
							style="color: var(--theme-text-140);">
							<div class="flex min-w-max flex-col">
								{#each codePreviewLines as line, index}
									<div class="grid grid-cols-[2rem_minmax(0,1fr)] leading-6">
										<div class=" pr-4 text-right text-[var(--theme-text-180)] tabular-nums">
											{index + 1}
										</div>
										<div class="whitespace-pre" style={`padding-left: ${line.indent * 2}rem;`}>
											{#if line.segments.length === 0}
												&nbsp;
											{:else}
												{#each line.segments as segment}
													<span class={segment.className}>{segment.text}</span>
												{/each}
											{/if}
										</div>
									</div>
								{/each}
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
			<p class="text-lg text-[var(--theme-text-150)]">
				This section has never been useful... like, ever.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			{#each features as feature, idx (idx)}
				<div
					class="rounded-2xl border border-[var(--theme-background-140)] bg-[var(--theme-background-30)] p-8 transition-colors hover:bg-[var(--theme-background-40)]">
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border"
						style={`background-color: ${idx === 0 ? "var(--theme-primary-30)" : idx === 1 ? "var(--theme-secondary-30)" : "var(--theme-accent-30)"}; border-color: ${idx === 0 ? "var(--theme-primary-120)" : idx === 1 ? "var(--theme-secondary-120)" : "var(--theme-accent-120)"};`}>
						<svelte:component
							this={feature.icon}
							class={feature.iconClass}
							style={`color: ${idx === 0 ? "var(--theme-primary)" : idx === 1 ? "var(--theme-secondary)" : "var(--theme-accent)"}`} />
					</div>
					<h3 class="text-xl font-bold mb-3">{feature.title}</h3>
					<p class="leading-relaxed text-[var(--theme-text-150)]">
						{feature.desc}
					</p>
				</div>
			{/each}
		</div>
	</section>

	<section
		id="testimonials"
		class="border-y border-[var(--theme-background-140)] bg-[var(--theme-background-20)] py-24">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4">Testimonials from real-ish people.</h2>
				<p class="text-lg text-[var(--theme-text-150)]">
					Social proof, because apparently software needs witnesses now.
				</p>
			</div>

			<div class="testimonials-carousel relative overflow-hidden">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
					style="background-image: linear-gradient(to right, var(--theme-background-20), transparent);">
				</div>
				<div
					class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
					style="background-image: linear-gradient(to left, var(--theme-background-20), transparent);">
				</div>
				<div class="testimonials-track flex w-max gap-8">
					{#each [...testimonials, ...testimonials] as testimonial, idx (idx)}
						<div
							class="w-[20rem] shrink-0 rounded-2xl border border-[var(--theme-background-140)] bg-[var(--theme-background-30)] p-8 md:w-[24rem]">
							<p class="mb-6 leading-relaxed text-[var(--theme-text-140)]">
								"{testimonial.quote}"
							</p>
							<div>
								<div class="font-semibold">{testimonial.name}</div>
								<div class="text-sm text-[var(--theme-text-170)]">
									{testimonial.role}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section
		id="pricing"
		class="border-t border-[var(--theme-background-140)] bg-[var(--theme-background-20)] py-24">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4">Pricing that scales with you.</h2>
				<p class="text-lg text-[var(--theme-text-150)]">
					By which we mean it's literally just open source.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				<div
					class="flex flex-col rounded-3xl border border-[var(--theme-background-140)] bg-[var(--theme-background-30)] p-8">
					<h3 class="text-xl font-semibold mb-2">Open Source</h3>
					<div class="flex items-baseline gap-1 mb-6">
						<span class="text-4xl font-bold">$0</span>
						<span class="text-[var(--theme-text-160)]">/forever</span>
					</div>
					<p class="mb-8 text-[var(--theme-text-150)]">
						Perfect for developers who know how to use a package manager.
					</p>
					<ul class="space-y-4 mb-8">
						{#each openSourceFeatures as item, i (i)}
							<li
								class="flex items-center gap-3 text-sm"
								style="color: var(--theme-text-140);">
								<CheckCircle2 class="w-4 h-4" style="color: var(--theme-primary);" />
								{item}
							</li>
						{/each}
					</ul>
					<div class="mt-auto">
						<a
							href="https://github.com/jacoblockett/palette"
							class="block w-full rounded-xl bg-[var(--theme-primary)] py-3 text-center font-medium text-[var(--theme-background)] transition-colors hover:bg-[var(--theme-primary-140)]">
							View on GitHub
						</a>
						<p class="mt-4 text-xs text-[var(--theme-text-160)]">
							* If you consider a lone dev a community
						</p>
					</div>
				</div>

				<div
					class="relative flex flex-col rounded-3xl border p-8"
					style="background: linear-gradient(to bottom, var(--theme-primary-20), var(--theme-background-30)); border-color: var(--theme-background-140);">
					<div class="absolute top-0 right-8 transform -translate-y-1/2">
						<span
							class="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
							style="background-color: var(--theme-primary); color: var(--theme-background);">
							Enterprise
						</span>
					</div>
					<h3 class="text-xl font-semibold mb-2">Enterprise</h3>
					<div class="flex items-baseline gap-1 mb-6">
						<span class="text-4xl font-bold">$0</span>
						<span class="text-[var(--theme-text-160)]">/forever</span>
					</div>
					<p class="mb-8 text-[var(--theme-text-150)]">
						The exact same code, but you wear a suit while running it. Or maybe not. Idk what your dresscode looks like.
					</p>
					<ul class="space-y-4 mb-8">
						{#each enterpriseFeatures as item, i (i)}
							<li
								class="flex items-center gap-3 text-sm"
								style="color: var(--theme-text-140);">
								<CheckCircle2 class="w-4 h-4" style="color: var(--theme-secondary);" />
								{item}
							</li>
						{/each}
					</ul>
					<div class="mt-auto">
						<a
							href="https://github.com/jacoblockett/palette"
							class="block w-full rounded-xl bg-[var(--theme-primary)] py-3 text-center font-medium text-[var(--theme-background)] transition-colors shadow-lg shadow-[0_0_32px_-12px_var(--theme-primary-140)] hover:bg-[var(--theme-primary-140)]">
							Also View on GitHub
						</a>
						<p class="mt-4 text-xs text-[var(--theme-text-160)]">
							* Or at least, we'll say we did and never actually do it
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<footer
		class="border-t border-[var(--theme-background-140)] bg-[var(--theme-background-30)] py-12 text-center text-sm text-[var(--theme-text-150)]">
		<div class="flex items-center justify-center gap-2 mb-4">
			<Palette class="w-5 h-5" style="color: var(--theme-accent);" />
			<span class="font-semibold" style="color: var(--theme-text);">Palette</span>
		</div>
		<div class="flex justify-center gap-6">
			<a href="https://github.com/jacoblockett/palette" class="transition-colors hover:text-[var(--theme-primary)]">Documentation</a>
			<a href="https://github.com/jacoblockett/palette" class="transition-colors hover:text-[var(--theme-primary)]">GitHub</a>
		</div>
	</footer>
</div>

<style>
	.scheme-menu-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: var(--theme-background-140) var(--theme-background-30);
	}

	.scheme-menu-scrollbar::-webkit-scrollbar {
		width: 10px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-track {
		background: var(--theme-background-30);
		border-radius: 9999px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-thumb {
		background: var(--theme-background-140);
		border: 2px solid var(--theme-background-30);
		border-radius: 9999px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-thumb:hover {
		background: var(--theme-primary);
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
