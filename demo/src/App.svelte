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
	const previewShadeSteps = [
		"10",
		"20",
		"30",
		"40",
		"50",
		"60",
		"70",
		"80",
		"90",
		"100",
		"110",
		"120",
		"130",
		"140",
		"150",
		"160",
		"170",
		"180",
		"190",
		"200"
	]
	const themeShadeStops = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
	const features = [
		{
			icon: Layers,
			iconClass: "feature-icon-svg",
			title: "Seedable Configuration",
			desc: "Provide zero to five seed colors, and we deterministically hallucinate the rest. Like magic, if you don't understand basic math."
		},
		{
			icon: Zap,
			iconClass: "feature-icon-svg",
			title: "Aggressive WCAG",
			desc: "If your input or generated colors fail minimum accessibility checks, we throw an error and crash your app. You're welcome."
		},
		{
			icon: Code,
			iconClass: "feature-icon-svg",
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
		} else {
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
		}

		if (!appElement) {
			return
		}

		const darkTheme = theme.dark
		appElement.style.setProperty("--theme-dark-text", darkTheme.text)
		appElement.style.setProperty("--theme-dark-background", darkTheme.background)
		appElement.style.setProperty("--theme-dark-primary", darkTheme.primary)
		appElement.style.setProperty("--theme-dark-secondary", darkTheme.secondary)
		appElement.style.setProperty("--theme-dark-accent", darkTheme.accent)

		for (const role of ["text", "background", "primary", "secondary", "accent"]) {
			for (const stop of themeShadeStops) {
				appElement.style.setProperty(`--theme-dark-${role}-${stop}`, darkTheme.shades[role][stop])
			}
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
		lockedSeedRoles = { ...snapshot.lockedSeedRoles }
		activeColorMode = snapshot.activeColorMode
		updateTheme(cloneTheme(snapshot.theme))
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
			className: "token-text"
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
							{ text: "import ", className: "token-keyword" },
							{ text: "palette", className: "token-identifier" },
							{ text: " from ", className: "token-keyword" },
							{ text: trimmedLine.slice("import palette from ".length), className: "token-string" }
						]
					}
				}

				if (trimmedLine === "const theme = palette()") {
					return {
						indent,
						segments: [
							{ text: "const ", className: "token-keyword" },
							{ text: "theme", className: "token-identifier" },
							{ text: " = ", className: "token-keyword" },
							{ text: "palette", className: "token-identifier" },
							{ text: "()", className: "token-punctuation" }
						]
					}
				}

				if (trimmedLine === "const theme = palette({") {
					return {
						indent,
						segments: [
							{ text: "const ", className: "token-keyword" },
							{ text: "theme", className: "token-identifier" },
							{ text: " = ", className: "token-keyword" },
							{ text: "palette", className: "token-identifier" },
							{ text: "({", className: "token-punctuation" }
						]
					}
				}

				if (trimmedLine === "})") {
					return {
						indent,
						segments: [{ text: "})", className: "token-punctuation" }]
					}
				}

				const optionMatch = trimmedLine.match(/^([a-z]+): (.+?)(,?)$/)

				if (optionMatch) {
					const [, key, value, comma] = optionMatch
					const valueClassName = value === "true" || value === "false" ? "token-boolean" : "token-string"
					const segments = [
						{ text: `${key}: `, className: "token-identifier" },
						{ text: value, className: valueClassName }
					]

					if (comma) {
						segments.push({ text: comma, className: "token-punctuation" })
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

<div bind:this={appElement} data-theme={activeColorMode} class="app-shell">
	<nav class="app-nav">
		<div class="page-shell nav-inner">
			<div class="nav-brand-row">
				<div class="nav-brand">
					<div class="nav-brand-mark">
						<Palette class="nav-brand-icon" />
					</div>
					<span class="nav-brand-text">Palette</span>
				</div>
				<div class="nav-link-list">
					<a href="#playground" class="nav-link">Playground</a>
					<a href="#features" class="nav-link">Features</a>
					<a href="#testimonials" class="nav-link">Testimonials</a>
					<a href="#pricing" class="nav-link">Pricing</a>
				</div>
			</div>
			<div class="nav-actions">
				<button
					aria-label={`Switch to ${activeColorMode === "light" ? "dark" : "light"} mode`}
					onclick={toggleActiveColorMode}
					class="icon-button nav-action-button">
					<Moon class="nav-action-icon" />
				</button>
				<a
					href="https://github.com/jacoblockett/palette"
					target="_blank"
					rel="noreferrer"
					class="icon-button nav-action-button">
					<svg viewBox="0 0 24 24" aria-hidden="true" class="github-icon" role="img">
						<path d={siGithub.path}></path>
					</svg>
				</a>
				<button
					type="button"
					aria-label="Copy install command"
					onclick={() => handleCopyInstallCommand("nav")}
					class="install-pill nav-install-pill">
					<span class={`copy-tooltip nav-copy-tooltip ${isNavInstallCopied ? "is-visible" : ""}`}>Copied!</span>
					<span class="install-pill-content">
						<Terminal class="install-pill-icon" />
						{installCommand}
					</span>
				</button>
			</div>
		</div>
	</nav>

	<section class="hero page-shell">
		<h1 class="hero-title">
			Enterprise-grade colors. <br class="hero-break" />
			Zero cost.
		</h1>
		<p class="hero-copy">
			Why pick light and dark mode colors manually when you can install a dependency that mathematically generates all 5
			roles and 20 shades automatically? Welcome to the future.
		</p>
		<div class="hero-actions">
			<button class="primary-cta">
				Read the docs <ArrowRight class="cta-icon" />
			</button>
			<button type="button" onclick={() => handleCopyInstallCommand("hero")} class="secondary-cta">
				<span class={`copy-tooltip hero-copy-tooltip ${isHeroInstallCopied ? "is-visible" : ""}`}>Copied!</span>
				<Terminal class="cta-icon" />
				{installCommand}
			</button>
		</div>
	</section>

	<section id="playground" class="playground">
		<div class="page-shell">
			<div class="section-intro">
				<h2 class="section-title">Playground</h2>
				<p class="section-copy">Go ahead. Change the colors. I dare you.</p>
			</div>
			<div class="playground-grid">
				<div class="playground-panel">
					<div class="toolbar">
						<div class="toolbar-group">
							<button type="button" aria-label="Randomize colors" onclick={randomizeSeeds} class="toolbar-button">
								<Dices class="toolbar-icon" />
							</button>
							<button
								type="button"
								aria-label="Undo color change"
								onclick={undoColorChange}
								disabled={colorHistoryIndex === 0}
								class="toolbar-button">
								<Undo2 class="toolbar-icon" />
							</button>
							<button
								type="button"
								aria-label="Redo color change"
								onclick={redoColorChange}
								disabled={colorHistoryIndex >= colorHistory.length - 1}
								class="toolbar-button">
								<Redo2 class="toolbar-icon" />
							</button>
							<button
								type="button"
								aria-label={`Switch to ${activeColorMode === "light" ? "dark" : "light"} mode`}
								onclick={toggleActiveColorMode}
								class="toolbar-button">
								<Moon class="toolbar-icon" />
							</button>
						</div>
					</div>

					<div class="seed-grid">
						{#each seedFields as field, index}
							<div class="seed-field" onfocusout={handleSeedFieldFocusOut}>
								<label class="seed-label">{field.label}</label>
								<div class="seed-input-wrap">
									<input
										type="text"
										value={theme[activeColorMode][field.key]}
										onfocus={event => handleSeedInputFocus(field.key, event)}
										onclick={() => activateColorField(field.key)}
										oninput={event => handleSeedTextInput(field.key, event.currentTarget.value)}
										class={`seed-input ${hasPaletteError(field.key) ? "is-error" : ""}`}
										style={`background-color: ${theme[activeColorMode][field.key]}; color: ${getReadableTextColor(theme[activeColorMode][field.key])};`} />
									<div class="seed-action-row">
										<button
											type="button"
											aria-label={`${lockedSeedRoles[field.key] ? "Unlock" : "Lock"} ${field.label} hex`}
											onclick={() => toggleSeedLock(field.key)}
											class={`seed-action-button lock-button ${lockedSeedRoles[field.key] ? "is-locked" : ""}`}
											tabindex={lockedSeedRoles[field.key] || activeColorField === field.key ? 0 : -1}
											style={`--seed-action-color: ${getReadableTextColor(theme[activeColorMode][field.key])}; --seed-action-hover: ${getSeedActionHoverColor(theme[activeColorMode][field.key])};`}>
											{#if lockedSeedRoles[field.key]}
												<Lock class="seed-action-icon" />
											{:else}
												<Unlock class="seed-action-icon" />
											{/if}
										</button>
										<button
											type="button"
											aria-label={`Copy ${field.label} hex`}
											onclick={() => handleCopySeed(field.key, theme[activeColorMode][field.key])}
											class="seed-action-button copy-button"
											tabindex={activeColorField === field.key ? 0 : -1}
											style={`--seed-action-color: ${getReadableTextColor(theme[activeColorMode][field.key])}; --seed-action-hover: ${getSeedActionHoverColor(theme[activeColorMode][field.key])};`}>
											{#if copiedSeedRole === field.key}
												<CheckCircle2 class="seed-action-icon" />
											{:else}
												<Copy class="seed-action-icon" />
											{/if}
										</button>
									</div>
								</div>
								{#if activeColorField === field.key}
									<div
										bind:this={colorPickerPopoverElement}
										class={`color-picker-wrap ${index % 2 === 0 ? "align-left" : "align-right"}`}>
										<div onpointerdown={handleColorPickerPointerDown} class="color-picker">
											<div class="color-picker-surface">
												<div
													bind:this={saturationValueElement}
													onpointerdown={beginSaturationValueDrag}
													class="color-picker-canvas">
													<div
														class="color-picker-canvas-fill"
														style={`background:
															linear-gradient(to top, rgb(0 0 0), transparent),
															linear-gradient(to right, rgb(255 255 255), ${pickerHueColor});`}>
													</div>
													<div
														class="color-picker-thumb"
														style={`left: ${pickerSaturation * 100}%; top: ${(1 - pickerValue) * 100}%;`}>
													</div>
												</div>
												<div class="color-picker-group">
													<div class="color-picker-label">Hue</div>
													<div bind:this={hueTrackElement} onpointerdown={beginHueDrag} class="color-picker-hue">
														<div class="color-picker-hue-track">
															<div class="color-picker-hue-fill"></div>
														</div>
														<div class="color-picker-hue-thumb" style={`left: ${(pickerHue / 360) * 100}%;`}></div>
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
							class="palette-error"
							style="color: var(--theme-accent); border-color: var(--theme-accent); background-color: var(--theme-accent-20);">
							{paletteErrorMessage}
						</div>
					{/if}

					<div class="scheme-field" tabindex="-1" onfocusout={handleSchemeFocusOut}>
						<label class="scheme-label">Scheme</label>
						<div class={`scheme-control ${isSchemeOpen ? "is-open" : ""} ${isSchemeOpen && schemeMenuDirection === "up" ? "opens-up" : ""} ${isSchemeOpen && schemeMenuDirection === "down" ? "opens-down" : ""}`}>
							<button
								bind:this={schemeTriggerElement}
								type="button"
								onclick={toggleSchemeMenu}
								class={`scheme-trigger ${isSchemeOpen ? "is-open" : ""} ${isSchemeOpen && schemeMenuDirection === "up" ? "opens-up" : ""} ${isSchemeOpen && schemeMenuDirection === "down" ? "opens-down" : ""}`}>
								<span>{formatSchemeLabel(demoScheme)}</span>
								<ChevronDown class={`scheme-chevron ${isSchemeOpen ? "is-open" : ""}`} />
							</button>
							{#if isSchemeOpen}
								<div class={`scheme-menu-wrap ${schemeMenuDirection === "up" ? "direction-up" : "direction-down"}`}>
									<div
										bind:this={schemeMenuElement}
										class="scheme-menu scheme-menu-scrollbar"
										style={`max-height: ${schemeMenuMaxHeight}px;`}>
										{#each supportedSchemes as scheme}
											<button
												type="button"
												onclick={() => selectScheme(scheme)}
												class={`scheme-option ${demoScheme === scheme ? "is-active" : ""}`}>
												{formatSchemeLabel(scheme)}
											</button>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>

					<div class="wcag-row">
						<button type="button" onclick={toggleWcag} class={`wcag-toggle ${wcag ? "is-active" : ""}`}>
							<div class={`wcag-toggle-thumb ${wcag ? "is-active" : ""}`}></div>
						</button>
						<label class="wcag-label">Strict WCAG Checks</label>
					</div>
				</div>

				<div class="code-preview-wrap">
					<div class="code-preview-glow"></div>
					<div class="code-preview">
						<div class="code-preview-header">
							<div class="code-preview-dots">
								<div class="code-preview-dot" style="background-color: #ff5f57;"></div>
								<div class="code-preview-dot" style="background-color: #febc2e;"></div>
								<div class="code-preview-dot" style="background-color: #28c840;"></div>
							</div>
							<div class="code-preview-title">Don't worry, I don't actually use Unix</div>
							<button onclick={handleCopyCode} class="code-preview-copy">
								{#if isCopied}
									<CheckCircle2 class="code-preview-copy-icon" size={14} strokeWidth={2.25} aria-hidden="true" />
								{:else}
									<Copy class="code-preview-copy-icon" size={14} strokeWidth={2.25} aria-hidden="true" />
								{/if}
								{isCopied ? "Copied" : "Copy"}
							</button>
						</div>
						<div class="code-preview-body">
							<div class="code-preview-lines">
								{#each codePreviewLines as line, index}
									<div class="code-preview-line">
										<div class="code-preview-line-number">{index + 1}</div>
										<div class="code-preview-line-content" style={`padding-left: ${line.indent * 2}rem;`}>
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

	<section id="features" class="feature-section page-shell">
		<div class="section-intro section-intro-centered">
			<h2 class="section-title">Features that sound cool.</h2>
			<p class="section-copy">This section has never been useful... like, ever.</p>
		</div>

		<div class="feature-grid">
			{#each features as feature, idx (idx)}
				<div class="feature-card">
					<div class={`feature-icon-shell ${idx === 0 ? "is-primary" : idx === 1 ? "is-secondary" : "is-accent"}`}>
						<svelte:component this={feature.icon} class={feature.iconClass} />
					</div>
					<h3 class="feature-card-title">{feature.title}</h3>
					<p class="feature-card-copy">{feature.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<section id="testimonials" class="testimonial-section">
		<div class="page-shell">
			<div class="section-intro section-intro-centered">
				<h2 class="section-title">Testimonials from real-ish people.</h2>
				<p class="section-copy">Social proof, because apparently software needs witnesses now.</p>
			</div>

			<div class="testimonials-carousel">
				<div class="testimonial-fade testimonial-fade-left"></div>
				<div class="testimonial-fade testimonial-fade-right"></div>
				<div class="testimonials-track">
					{#each [...testimonials, ...testimonials] as testimonial, idx (idx)}
						<div class="testimonial-card">
							<p class="testimonial-quote">"{testimonial.quote}"</p>
							<div class="testimonial-person">
								<div class="testimonial-name">{testimonial.name}</div>
								<div class="testimonial-role">{testimonial.role}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section id="pricing" class="pricing-section">
		<div class="page-shell">
			<div class="section-intro section-intro-centered">
				<h2 class="section-title">Pricing that scales with you.</h2>
				<p class="section-copy">By which we mean it's literally just open source.</p>
			</div>

			<div class="pricing-grid">
				<div class="pricing-card">
					<h3 class="pricing-card-title">Open Source</h3>
					<div class="pricing-price-row">
						<span class="pricing-price">$0</span>
						<span class="pricing-period">/forever</span>
					</div>
					<p class="pricing-copy">Perfect for developers who know how to use a package manager.</p>
					<ul class="pricing-feature-list">
						{#each openSourceFeatures as item, i (i)}
							<li class="pricing-feature">
								<CheckCircle2 class="pricing-check-icon" />
								{item}
							</li>
						{/each}
					</ul>
					<div class="pricing-card-footer">
						<a href="https://github.com/jacoblockett/palette" class="pricing-cta">View on GitHub</a>
						<p class="pricing-note">* If you consider a lone dev a community</p>
					</div>
				</div>

				<div class="pricing-card pricing-card-featured">
					<div class="pricing-badge">Enterprise</div>
					<h3 class="pricing-card-title">Enterprise</h3>
					<div class="pricing-price-row">
						<span class="pricing-price">$0</span>
						<span class="pricing-period">/forever</span>
					</div>
					<p class="pricing-copy">
						The exact same code, but you wear a suit while running it. Or maybe not. Idk what your dresscode looks like.
					</p>
					<ul class="pricing-feature-list">
						{#each enterpriseFeatures as item, i (i)}
							<li class="pricing-feature">
								<CheckCircle2 class="pricing-check-icon" />
								{item}
							</li>
						{/each}
					</ul>
					<div class="pricing-card-footer">
						<a href="https://github.com/jacoblockett/palette" class="pricing-cta">Also View on GitHub</a>
						<p class="pricing-note">* Or at least, we'll say we did and never actually do it</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<footer class="app-footer">
		<div class="footer-brand">
			<Palette class="footer-brand-icon" />
			<span class="footer-brand-text">Palette</span>
		</div>
		<div class="footer-links">
			<a href="https://github.com/jacoblockett/palette" class="footer-link">Documentation</a>
			<a href="https://github.com/jacoblockett/palette" class="footer-link">GitHub</a>
		</div>
	</footer>
</div>

<style>
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
	}

	:global(button),
	:global(input) {
		font: inherit;
	}

	:global(button) {
		cursor: pointer;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	.app-shell {
		min-height: 100vh;
		background: var(--theme-background);
		color: var(--theme-text);
		font-family: "Inter", sans-serif;
	}

	.app-shell ::selection {
		background: var(--theme-primary-120);
	}

	.page-shell {
		width: min(100%, 80rem);
		margin-left: auto;
		margin-right: auto;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.app-nav {
		position: fixed;
		top: 0;
		z-index: 50;
		width: 100%;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: var(--theme-primary-50);
		backdrop-filter: blur(12px);
		background: var(--theme-background);
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 4rem;
	}

	.nav-brand-row {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.nav-brand {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.install-pill-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-brand-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background-image: linear-gradient(to bottom right, var(--theme-primary-90), var(--theme-accent-90));
	}

	.nav-brand-icon,
	.footer-brand-icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.nav-brand-icon {
		color: var(--theme-text);
	}

	.nav-brand-text,
	.footer-brand-text {
		font-weight: 700;
	}

	.nav-brand-text {
		font-size: 1.25rem;
		letter-spacing: -0.025em;
	}

	.footer-brand-text {
		color: var(--theme-text);
		font-weight: 600;
	}

	.nav-link-list {
		display: none;
		gap: 2rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--theme-text-90);
	}

	.nav-link,
	.footer-link {
		line-height: 1.4;
	}

	.nav-link:hover,
	.footer-link:hover {
		color: var(--theme-primary);
	}

	.icon-button,
	.toolbar-button,
	.seed-action-button,
	.wcag-toggle,
	.scheme-trigger,
	.code-preview-copy,
	.primary-cta,
	.secondary-cta,
	.install-pill,
	.pricing-cta {
		border: 0;
		outline: 0;
	}

	.icon-button,
	.toolbar-button,
	.seed-action-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.nav-action-button {
		display: none;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		color: var(--theme-text);
		background: transparent;
	}

	.nav-action-button:hover,
	.nav-action-button:focus-visible {
		background: var(--theme-primary-80);
	}

	.nav-action-icon {
		width: 1.5rem;
		height: 1.5rem;
	}

	.github-icon {
		width: 1.5rem;
		height: 1.5rem;
		fill: currentColor;
	}

	.install-pill {
		position: relative;
		display: none;
		align-items: center;
		justify-content: center;
		height: 2.5rem;
		margin-left: 0.5rem;
		padding-left: 1rem;
		padding-right: 1rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-60);
		border-radius: 9999px;
		background: var(--theme-background-20);
		color: var(--theme-text);
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.75rem;
	}

	.install-pill:hover,
	.install-pill:focus-visible,
	.secondary-cta:hover,
	.secondary-cta:focus-visible {
		background: var(--theme-background-40);
	}

	.install-pill-icon {
		width: 0.75rem;
		height: 0.75rem;
		color: var(--theme-primary);
	}

	.cta-icon {
		width: 1rem;
		height: 1rem;
	}

	.copy-tooltip {
		position: absolute;
		pointer-events: none;
		white-space: nowrap;
		padding: 0.375rem 0.75rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-140);
		border-radius: 0.5rem;
		background: var(--theme-background-200);
		color: var(--theme-text);
		font-size: 0.875rem;
		font-weight: 600;
		box-shadow:
			0 20px 25px -5px rgb(0 0 0 / 0.1),
			0 8px 10px -6px rgb(0 0 0 / 0.1);
		opacity: 0;
	}

	.copy-tooltip.is-visible {
		opacity: 1;
	}

	.nav-copy-tooltip {
		left: 50%;
		top: 100%;
		margin-top: 0.5rem;
		transform: translateX(-50%);
	}

	.nav-copy-tooltip:not(.is-visible) {
		transform: translateX(-50%) translateY(-0.25rem);
	}

	.nav-copy-tooltip.is-visible {
		transform: translateX(-50%) translateY(0);
	}

	.hero-copy-tooltip {
		left: 50%;
		top: -0.5rem;
		bottom: auto;
		margin-bottom: 0;
		transform: translateX(-50%) translateY(-100%);
	}

	.hero-copy-tooltip:not(.is-visible) {
		transform: translateX(-50%) translateY(calc(-100% + 0.25rem));
	}

	.hero-copy-tooltip.is-visible {
		transform: translateX(-50%) translateY(-100%);
	}

	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding-top: 8rem;
		padding-bottom: 5rem;
	}

	.hero-title {
		margin-top: 0;
		margin-right: 0;
		margin-bottom: 1.5rem;
		margin-left: 0;
		font-size: 3rem;
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.025em;
		color: transparent;
		background-image: linear-gradient(to right, var(--theme-text), var(--theme-primary-110), var(--theme-accent-110));
		background-clip: text;
		-webkit-background-clip: text;
	}

	.hero-break {
		display: none;
	}

	.hero-copy,
	.section-copy,
	.feature-card-copy,
	.testimonial-quote,
	.pricing-copy {
		line-height: 1.625;
	}

	.hero-copy {
		max-width: 42rem;
		margin-top: 0;
		margin-right: 0;
		margin-bottom: 2.5rem;
		margin-left: 0;
		font-size: 1.125rem;
		color: var(--theme-text-100);
	}

	.hero-actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	.hero-actions .primary-cta,
	.hero-actions .secondary-cta {
		width: 100%;
	}

	.primary-cta,
	.secondary-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-radius: 9999px;
		font-weight: 600;
		padding: 0.875rem 2rem;
	}

	.primary-cta {
		background: var(--theme-primary);
		color: var(--theme-background);
		box-shadow: 0 0 40px -10px var(--theme-primary-100);
	}

	.primary-cta:hover,
	.primary-cta:focus-visible {
		background: var(--theme-primary-110);
		box-shadow: 0 0 60px -15px var(--theme-primary-120);
	}

	.secondary-cta {
		position: relative;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-60);
		background: var(--theme-background-20);
		color: var(--theme-text);
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.875rem;
	}

	.playground {
		padding-top: 5rem;
		padding-bottom: 5rem;
		border-top: 1px solid var(--theme-background-60);
		border-bottom: 1px solid var(--theme-background-60);
		background: var(--theme-background-10);
	}

	.testimonial-section {
		padding-top: 6rem;
		padding-bottom: 6rem;
		border-top: 1px solid var(--theme-background-60);
		border-bottom: 1px solid var(--theme-background-60);
		background: var(--theme-background-10);
	}

	.pricing-section {
		padding-top: 6rem;
		padding-bottom: 6rem;
		border-top: 1px solid var(--theme-background-60);
		background: var(--theme-background-10);
	}

	.feature-section {
		padding-top: 6rem;
		padding-bottom: 6rem;
	}

	.section-intro {
		margin-bottom: 2rem;
	}

	.section-intro-centered {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 4rem;
		text-align: center;
	}

	.section-title {
		margin-top: 0;
		margin-right: 0;
		margin-bottom: 1rem;
		margin-left: 0;
		font-size: 1.875rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.section-copy {
		margin: 0;
		color: var(--theme-text-100);
	}

	.section-intro-centered .section-copy {
		font-size: 1.125rem;
	}

	.playground-grid,
	.feature-grid,
	.pricing-grid {
		display: grid;
	}

	.playground-grid {
		gap: 2rem;
		align-items: start;
	}

	.feature-grid {
		gap: 2rem;
	}

	.pricing-grid {
		gap: 2rem;
		width: 100%;
		max-width: 56rem;
		margin-left: auto;
		margin-right: auto;
		align-items: stretch;
	}

	.playground-panel,
	.code-preview,
	.feature-card,
	.testimonial-card,
	.pricing-card {
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-60);
		background: var(--theme-background-20);
	}

	.playground-panel {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1.5rem;
		border-radius: 1rem;
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toolbar-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.toolbar-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-70);
		border-radius: 9999px;
		background: var(--theme-background-30);
		color: var(--theme-text);
	}

	.toolbar-button:hover,
	.toolbar-button:focus-visible,
	.code-preview-copy:hover,
	.code-preview-copy:focus-visible {
		background: var(--theme-background-50);
	}

	.toolbar-button:disabled {
		cursor: not-allowed;
		opacity: 0.4;
	}

	.toolbar-icon {
		width: 1rem;
		height: 1rem;
	}

	.seed-grid {
		display: grid;
		gap: 1rem;
	}

	.seed-field {
		position: relative;
	}

	.seed-label,
	.scheme-label,
	.wcag-label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--theme-text-100);
	}

	.seed-label,
	.scheme-label {
		margin-bottom: 0.5rem;
	}

	.seed-input-wrap {
		position: relative;
	}

	.seed-input {
		width: 100%;
		height: 3rem;
		padding-left: 1rem;
		padding-right: 5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-70);
		border-radius: 0.75rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.875rem;
	}

	.seed-input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--theme-primary);
	}

	.seed-input.is-error {
		border-color: var(--theme-accent);
		box-shadow: 0 0 0 2px var(--theme-accent);
	}

	.seed-action-row {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		display: inline-flex;
		align-items: center;
		transform: translateY(-50%);
	}

	.seed-action-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 9999px;
		background: transparent;
		color: var(--seed-action-color);
		opacity: 0;
	}

	.seed-input-wrap:hover .seed-action-button,
	.seed-input-wrap:focus-within .seed-action-button,
	.seed-action-button.is-locked {
		opacity: 1;
	}

	.seed-action-button:hover,
	.seed-action-button:focus-visible {
		background: var(--seed-action-hover);
		outline: none;
	}

	.seed-action-icon {
		width: 0.875rem;
		height: 0.875rem;
	}

	.color-picker-wrap {
		position: absolute;
		bottom: calc(100% + 0.75rem);
		z-index: 30;
		width: min(20rem, calc(100vw - 2.5rem));
	}

	.color-picker-wrap.align-left {
		left: 0;
	}

	.color-picker-wrap.align-right {
		right: 0;
	}

	.color-picker {
		padding: 1rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-70);
		border-radius: 1rem;
		background: var(--theme-background-20);
		box-shadow: 0 20px 50px -24px rgb(0 0 0 / 0.95);
	}

	.color-picker-surface,
	.color-picker-group {
		display: grid;
		gap: 1rem;
	}

	.color-picker-canvas {
		position: relative;
		height: 12rem;
		width: 100%;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-70);
		touch-action: none;
	}

	.color-picker-canvas-fill {
		position: absolute;
		inset: 1px;
		overflow: hidden;
	}

	.color-picker-thumb,
	.color-picker-hue-thumb {
		position: absolute;
		pointer-events: none;
		width: 1rem;
		height: 1rem;
		border-width: 2px;
		border-style: solid;
		border-color: #fff;
		border-radius: 9999px;
		background: transparent;
		box-shadow: 0 0 0 1px rgb(15 23 42 / 0.9);
		transform: translate(-50%, -50%);
	}

	.color-picker-label {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--theme-text-120);
	}

	.color-picker-hue {
		position: relative;
		height: 1rem;
		touch-action: none;
	}

	.color-picker-hue-track {
		position: absolute;
		inset: 0;
		overflow: hidden;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-70);
		border-radius: 9999px;
	}

	.color-picker-hue-fill {
		position: absolute;
		inset: 1px;
		border-radius: 9999px;
		background: linear-gradient(
			to right,
			#ff0000 0%,
			#ffff00 17%,
			#00ff00 33%,
			#00ffff 50%,
			#0000ff 67%,
			#ff00ff 83%,
			#ff0000 100%
		);
	}

	.color-picker-hue-thumb {
		top: 50%;
		box-shadow: 0 0 0 1px rgb(15 23 42 / 0.85);
	}

	.palette-error {
		margin-top: 0;
		margin-right: auto;
		padding: 0.5rem 0.75rem;
		border-width: 1px;
		border-style: solid;
		border-radius: 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.scheme-control {
		position: relative;
		width: 100%;
		--scheme-control-border: var(--theme-background-70);
		--scheme-control-border-width: 1px;
	}

	.scheme-control:focus-within {
		outline: none;
		--scheme-control-border-width: 2px;
	}

	.scheme-control.is-open {
		--scheme-control-border: var(--theme-primary);
		--scheme-control-border-width: 2px;
	}

	.scheme-trigger {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 3rem;
		padding-left: 1rem;
		padding-right: 1rem;
		border-width: var(--scheme-control-border-width);
		border-style: solid;
		border-color: var(--scheme-control-border);
		border-radius: 0.75rem;
		background: var(--theme-background-30);
		color: var(--theme-text);
		font-size: 0.875rem;
	}

	.scheme-trigger.is-open {
		background: var(--theme-background-30);
		z-index: 21;
	}

	.scheme-trigger.is-open.opens-down {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.scheme-trigger.is-open.opens-up {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.scheme-trigger:hover,
	.scheme-trigger:focus-visible {
		background: var(--theme-background-40);
	}

	.scheme-chevron {
		width: 1rem;
		height: 1rem;
		color: var(--theme-text-120);
	}

	.scheme-chevron.is-open {
		transform: rotate(180deg);
	}

	.scheme-menu-wrap {
		position: absolute;
		left: 0;
		right: 0;
		z-index: 20;
		overflow: hidden;
		border-width: var(--scheme-control-border-width);
		border-style: solid;
		border-color: var(--scheme-control-border);
		border-radius: 0.75rem;
		background: var(--theme-background-30);
		box-shadow: 0 16px 32px -28px rgb(0 0 0 / 0.9);
	}

	.scheme-menu-wrap.direction-up {
		bottom: calc(100% - var(--scheme-control-border-width));
		border-bottom-width: 0;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.scheme-menu-wrap.direction-down {
		top: calc(100% - var(--scheme-control-border-width));
		border-top-width: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.scheme-menu {
		overflow-y: auto;
		padding: 0.5rem;
	}

	.scheme-option {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: 0;
		border-radius: 0.5rem;
		background: transparent;
		color: var(--theme-text);
		font-size: 0.875rem;
		text-align: left;
	}

	.scheme-option:hover,
	.scheme-option:focus-visible {
		background: var(--theme-background-40);
	}

	.scheme-option.is-active {
		background: var(--theme-primary-20);
		color: var(--theme-primary-110);
	}

	.wcag-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.wcag-toggle {
		position: relative;
		width: 3rem;
		height: 1.5rem;
		border-radius: 9999px;
		background: var(--theme-background-50);
	}

	.wcag-toggle.is-active {
		background: var(--theme-primary);
	}

	.wcag-toggle-thumb {
		position: absolute;
		top: 0.25rem;
		left: 0.25rem;
		width: 1rem;
		height: 1rem;
		border-radius: 9999px;
		background: var(--theme-background);
	}

	.wcag-toggle-thumb.is-active {
		transform: translateX(1.75rem);
	}

	.code-preview-wrap {
		position: relative;
	}

	.code-preview-glow {
		position: absolute;
		inset: -0.25rem;
		border-radius: 1.5rem;
		background: var(--theme-accent);
		opacity: 0.14;
		filter: blur(40px);
		pointer-events: none;
	}

	.code-preview {
		position: relative;
		overflow: hidden;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-60);
		border-radius: 1rem;
		box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
	}

	.code-preview-header {
		position: relative;
		display: flex;
		align-items: center;
		padding: 0.75rem 1rem;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: var(--theme-background-70);
		background: var(--theme-background-30);
	}

	.code-preview-dots {
		position: relative;
		z-index: 10;
		display: flex;
		gap: 0.5rem;
	}

	.code-preview-dot {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 9999px;
	}

	.code-preview-title {
		position: absolute;
		left: 50%;
		top: 50%;
		max-width: none;
		overflow: visible;
		font-size: 0.875rem;
		color: var(--theme-text-120);
		white-space: nowrap;
		transform: translate(-50%, -50%);
	}

	.code-preview-copy {
		position: relative;
		z-index: 10;
		margin-left: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;
		width: 4rem;
		padding: 0.375rem 0.75rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--theme-background-70);
		border-radius: 9999px;
		background: var(--theme-background-30);
		color: var(--theme-primary);
		font-size: 0.75rem;
		font-weight: 500;
	}

	.code-preview-copy-icon {
		width: 0.875rem;
		height: 0.875rem;
		flex-shrink: 0;
		display: block;
		stroke: currentColor;
		color: currentColor;
	}

	.code-preview-copy :global(svg) {
		width: 0.875rem;
		height: 0.875rem;
		flex-shrink: 0;
		display: block;
		stroke: currentColor;
	}

	.code-preview-body {
		overflow-x: auto;
		overflow-y: auto;
		padding: 1rem;
		color: var(--theme-text);
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.875rem;
	}

	.code-preview-lines {
		display: flex;
		flex-direction: column;
		min-width: max-content;
	}

	.code-preview-line {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr);
		line-height: 1.5rem;
	}

	.code-preview-line-number {
		padding-right: 1rem;
		color: var(--theme-text-130);
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	.code-preview-line-content {
		white-space: pre;
	}

	.token-text,
	.token-identifier {
		color: var(--theme-text);
	}

	.token-keyword {
		color: var(--theme-primary-110);
	}

	.token-string {
		color: var(--theme-accent-110);
	}

	.token-boolean {
		color: var(--theme-secondary-110);
	}

	.token-punctuation {
		color: var(--theme-text-120);
	}

	.feature-card:hover {
		background: var(--theme-background-30);
	}

	.pricing-card {
		display: flex;
		flex-direction: column;
	}

	.feature-card {
		padding: 2rem;
		border-radius: 1rem;
	}

	.testimonial-card {
		width: 20rem;
		flex-shrink: 0;
		padding: 2rem;
		border-radius: 1rem;
	}

	.pricing-card {
		padding: 2rem;
		border-radius: 1.5rem;
	}

	.feature-icon-shell {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		margin-bottom: 1.5rem;
		border-width: 1px;
		border-style: solid;
		border-radius: 0.75rem;
	}

	.feature-icon-shell.is-primary {
		border-color: var(--theme-primary-60);
		background: var(--theme-primary-20);
		color: var(--theme-primary-110);
	}

	.feature-icon-shell.is-secondary {
		border-color: var(--theme-secondary-60);
		background: var(--theme-secondary-20);
		color: var(--theme-secondary-110);
	}

	.feature-icon-shell.is-accent {
		border-color: var(--theme-accent-60);
		background: var(--theme-accent-20);
		color: var(--theme-accent-110);
	}

	.feature-icon-svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.feature-card-title {
		margin: 0 0 0.75rem;
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.75rem;
	}

	.feature-card-copy,
	.testimonial-role,
	.pricing-note,
	.pricing-period {
		color: var(--theme-text-100);
	}

	.feature-card-copy {
		margin: 0;
	}

	.testimonials-carousel {
		position: relative;
		overflow: hidden;
	}

	.testimonial-fade {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 10;
		width: 4rem;
		pointer-events: none;
	}

	.testimonial-fade-left {
		left: 0;
		background-image: linear-gradient(to right, var(--theme-background-10), transparent);
	}

	.testimonial-fade-right {
		right: 0;
		background-image: linear-gradient(to left, var(--theme-background-10), transparent);
	}

	.testimonials-track {
		display: flex;
		gap: 2rem;
		width: max-content;
		animation: testimonials-scroll 36s linear infinite;
	}

	.testimonials-carousel:hover .testimonials-track {
		animation-play-state: paused;
	}

	.testimonial-card {
		width: 20rem;
	}

	.testimonial-quote {
		margin-top: 0;
		margin-right: 0;
		margin-bottom: 1.5rem;
		margin-left: 0;
		color: var(--theme-text-100);
	}

	.testimonial-name {
		font-weight: 600;
	}

	.testimonial-role {
		font-size: 0.875rem;
	}

	.pricing-card-featured {
		position: relative;
		border-color: var(--theme-background-60);
		background: linear-gradient(to bottom, var(--theme-primary-20), var(--theme-background-20));
	}

	.pricing-badge {
		position: absolute;
		top: 0;
		right: 2rem;
		padding: 0.25rem 0.75rem;
		border: 1px solid var(--theme-primary-60);
		border-radius: 9999px;
		background: var(--theme-primary-20);
		color: var(--theme-primary-110);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.025em;
		text-transform: uppercase;
		transform: translateY(-50%);
	}

	.pricing-card-title {
		margin-top: 0;
		margin-right: 0;
		margin-bottom: 0.5rem;
		margin-left: 0;
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.75rem;
	}

	.pricing-price-row {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		margin-bottom: 1.5rem;
	}

	.pricing-price {
		font-size: 2.25rem;
		font-weight: 700;
		line-height: 2.5rem;
	}

	.pricing-copy {
		margin-top: 0;
		margin-right: 0;
		margin-bottom: 2rem;
		margin-left: 0;
		color: var(--theme-text-100);
	}

	.pricing-feature-list {
		display: grid;
		gap: 1rem;
		margin-top: 0;
		margin-right: 0;
		margin-bottom: 2rem;
		margin-left: 0;
		padding: 0;
		list-style: none;
	}

	.pricing-feature {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--theme-text-100);
		font-size: 0.875rem;
	}

	.pricing-check-icon {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		color: var(--theme-primary-110);
	}

	.pricing-card-footer {
		margin-top: auto;
	}

	.pricing-cta {
		display: block;
		width: 100%;
		padding-top: 0.75rem;
		padding-right: 1rem;
		padding-bottom: 0.75rem;
		padding-left: 1rem;
		border-radius: 0.75rem;
		background: var(--theme-primary);
		color: var(--theme-background);
		font-weight: 500;
		text-align: center;
	}

	.pricing-cta:hover,
	.pricing-cta:focus-visible {
		background: var(--theme-primary-110);
	}

	.pricing-note {
		margin-top: 1rem;
		margin-right: 0;
		margin-bottom: 0;
		margin-left: 0;
		font-size: 0.75rem;
	}

	.app-footer {
		padding-top: 3rem;
		padding-right: 1rem;
		padding-bottom: 3rem;
		padding-left: 1rem;
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: var(--theme-background-60);
		background: var(--theme-background-20);
		color: var(--theme-text-100);
		font-size: 0.875rem;
		text-align: center;
	}

	.footer-brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.footer-brand-icon {
		color: var(--theme-accent);
	}

	.footer-brand-text {
		color: var(--theme-text);
	}

	.footer-links {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}

	.scheme-menu-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: var(--theme-background-70) var(--theme-background-20);
	}

	.scheme-menu-scrollbar::-webkit-scrollbar {
		width: 10px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-track {
		background: var(--theme-background-20);
		border-radius: 9999px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-thumb {
		background: var(--theme-background-70);
		border: 2px solid var(--theme-background-20);
		border-radius: 9999px;
	}

	.scheme-menu-scrollbar::-webkit-scrollbar-thumb:hover {
		background: var(--theme-primary-90);
	}

	.app-shell[data-theme="dark"] {
		background: var(--theme-dark-background);
		color: var(--theme-dark-text);
	}

	.app-shell[data-theme="dark"] ::selection {
		background: var(--theme-dark-primary-120);
		color: var(--theme-dark-background-20);
	}

	.app-shell[data-theme="dark"] .app-nav {
		border-bottom: 1px solid var(--theme-dark-background-160);
		background: var(--theme-dark-background-120);
	}

	.app-shell[data-theme="dark"] .nav-brand-mark {
		background-image: linear-gradient(to bottom right, var(--theme-dark-primary-110), var(--theme-dark-accent-110));
	}

	.app-shell[data-theme="dark"] .nav-brand-icon,
	.app-shell[data-theme="dark"] .nav-brand-text,
	.app-shell[data-theme="dark"] .footer-brand-text {
		color: var(--theme-dark-text);
	}

	.app-shell[data-theme="dark"] .nav-link,
	.app-shell[data-theme="dark"] .footer-link,
	.app-shell[data-theme="dark"] .section-title,
	.app-shell[data-theme="dark"] .feature-card-title,
	.app-shell[data-theme="dark"] .testimonial-name,
	.app-shell[data-theme="dark"] .pricing-card-title,
	.app-shell[data-theme="dark"] .pricing-price,
	.app-shell[data-theme="dark"] .code-preview-wrap {
		color: var(--theme-dark-text);
	}

	.app-shell[data-theme="dark"] .nav-link-list,
	.app-shell[data-theme="dark"] .hero-copy,
	.app-shell[data-theme="dark"] .section-copy,
	.app-shell[data-theme="dark"] .feature-card-copy,
	.app-shell[data-theme="dark"] .testimonial-quote,
	.app-shell[data-theme="dark"] .pricing-copy,
	.app-shell[data-theme="dark"] .pricing-feature,
	.app-shell[data-theme="dark"] .app-footer,
	.app-shell[data-theme="dark"] .seed-label,
	.app-shell[data-theme="dark"] .scheme-label,
	.app-shell[data-theme="dark"] .wcag-label {
		color: var(--theme-dark-text-100);
	}

	.app-shell[data-theme="dark"] .testimonial-role,
	.app-shell[data-theme="dark"] .pricing-period,
	.app-shell[data-theme="dark"] .pricing-note,
	.app-shell[data-theme="dark"] .code-preview-line-number,
	.app-shell[data-theme="dark"] .code-preview-title,
	.app-shell[data-theme="dark"] .color-picker-label,
	.app-shell[data-theme="dark"] .scheme-chevron {
		color: var(--theme-dark-text-100);
	}

	.app-shell[data-theme="dark"] .nav-link:hover,
	.app-shell[data-theme="dark"] .footer-link:hover {
		color: var(--theme-dark-primary-130);
	}

	.app-shell[data-theme="dark"] .nav-action-button,
	.app-shell[data-theme="dark"] .toolbar-button {
		color: var(--theme-dark-text);
	}

	.app-shell[data-theme="dark"] .nav-action-button:hover,
	.app-shell[data-theme="dark"] .nav-action-button:focus-visible,
	.app-shell[data-theme="dark"] .toolbar-button:hover,
	.app-shell[data-theme="dark"] .toolbar-button:focus-visible,
	.app-shell[data-theme="dark"] .code-preview-copy:hover,
	.app-shell[data-theme="dark"] .code-preview-copy:focus-visible,
	.app-shell[data-theme="dark"] .scheme-trigger:hover,
	.app-shell[data-theme="dark"] .scheme-trigger:focus-visible,
	.app-shell[data-theme="dark"] .scheme-option:hover,
	.app-shell[data-theme="dark"] .scheme-option:focus-visible {
		background: var(--theme-dark-background-170);
	}

	.app-shell[data-theme="dark"] .feature-card:hover {
		background: var(--theme-dark-background-160);
	}

	.app-shell[data-theme="dark"] .install-pill,
	.app-shell[data-theme="dark"] .secondary-cta,
	.app-shell[data-theme="dark"] .playground-panel,
	.app-shell[data-theme="dark"] .code-preview,
	.app-shell[data-theme="dark"] .feature-card,
	.app-shell[data-theme="dark"] .testimonial-card,
	.app-shell[data-theme="dark"] .pricing-card,
	.app-shell[data-theme="dark"] .color-picker,
	.app-shell[data-theme="dark"] .scheme-menu-wrap,
	.app-shell[data-theme="dark"] .app-footer {
		border-color: var(--theme-dark-background-170);
		background: var(--theme-dark-background-140);
	}

	.app-shell[data-theme="dark"] .scheme-control {
		--scheme-control-border: var(--theme-dark-background-180);
	}

	.app-shell[data-theme="dark"] .scheme-control.is-open {
		--scheme-control-border: var(--theme-dark-primary-130);
	}

	.app-shell[data-theme="dark"] .install-pill,
	.app-shell[data-theme="dark"] .secondary-cta,
	.app-shell[data-theme="dark"] .scheme-trigger,
	.app-shell[data-theme="dark"] .scheme-option,
	.app-shell[data-theme="dark"] .code-preview-copy,
	.app-shell[data-theme="dark"] .seed-input {
		color: var(--theme-dark-text);
	}

	.app-shell[data-theme="dark"] .install-pill:hover,
	.app-shell[data-theme="dark"] .install-pill:focus-visible,
	.app-shell[data-theme="dark"] .secondary-cta:hover,
	.app-shell[data-theme="dark"] .secondary-cta:focus-visible {
		background: var(--theme-dark-background-170);
	}

	.app-shell[data-theme="dark"] .install-pill-icon,
	.app-shell[data-theme="dark"] .code-preview-copy,
	.app-shell[data-theme="dark"] .pricing-check-icon {
		color: var(--theme-dark-primary-130);
	}

	.app-shell[data-theme="dark"] .copy-tooltip {
		border-color: var(--theme-dark-background-180);
		background: var(--theme-dark-background-170);
		color: var(--theme-dark-text);
	}

	.app-shell[data-theme="dark"] .hero-title {
		background-image: linear-gradient(
			to right,
			var(--theme-dark-text),
			var(--theme-dark-primary-130),
			var(--theme-dark-accent-140)
		);
	}

	.app-shell[data-theme="dark"] .primary-cta,
	.app-shell[data-theme="dark"] .pricing-cta,
	.app-shell[data-theme="dark"] .wcag-toggle.is-active {
		background: var(--theme-dark-primary-120);
		color: var(--theme-dark-background-10);
	}

	.app-shell[data-theme="dark"] .primary-cta {
		box-shadow: 0 0 40px -10px var(--theme-dark-primary-100);
	}

	.app-shell[data-theme="dark"] .primary-cta:hover,
	.app-shell[data-theme="dark"] .primary-cta:focus-visible,
	.app-shell[data-theme="dark"] .pricing-cta:hover,
	.app-shell[data-theme="dark"] .pricing-cta:focus-visible {
		background: var(--theme-dark-primary-140);
	}

	.app-shell[data-theme="dark"] .primary-cta:hover {
		box-shadow: 0 0 60px -15px var(--theme-dark-primary-130);
	}

	.app-shell[data-theme="dark"] .playground,
	.app-shell[data-theme="dark"] .testimonial-section,
	.app-shell[data-theme="dark"] .pricing-section {
		background: var(--theme-dark-background-120);
	}

	.app-shell[data-theme="dark"] .playground,
	.app-shell[data-theme="dark"] .testimonial-section,
	.app-shell[data-theme="dark"] .pricing-section,
	.app-shell[data-theme="dark"] .app-footer {
		border-top-color: var(--theme-dark-background-160);
	}

	.app-shell[data-theme="dark"] .playground,
	.app-shell[data-theme="dark"] .testimonial-section {
		border-bottom-color: var(--theme-dark-background-160);
	}

	.app-shell[data-theme="dark"] .toolbar-button,
	.app-shell[data-theme="dark"] .code-preview-copy,
	.app-shell[data-theme="dark"] .seed-input,
	.app-shell[data-theme="dark"] .color-picker-canvas,
	.app-shell[data-theme="dark"] .color-picker-hue-track,
	.app-shell[data-theme="dark"] .code-preview-header {
		border-color: var(--theme-dark-background-180);
	}

	.app-shell[data-theme="dark"] .toolbar-button,
	.app-shell[data-theme="dark"] .scheme-trigger,
	.app-shell[data-theme="dark"] .code-preview-copy {
		background: var(--theme-dark-background-150);
	}

	.app-shell[data-theme="dark"] .scheme-menu-wrap {
		background: var(--theme-dark-background-150);
	}

	.app-shell[data-theme="dark"] .scheme-trigger,
	.app-shell[data-theme="dark"] .scheme-menu-wrap {
		border-color: var(--scheme-control-border);
	}

	.app-shell[data-theme="dark"] .seed-input {
		background: var(--theme-dark-background-150);
	}

	.app-shell[data-theme="dark"] .seed-input:focus {
		box-shadow: 0 0 0 2px var(--theme-dark-primary);
	}

	.app-shell[data-theme="dark"] .seed-input.is-error {
		border-color: var(--theme-dark-accent);
		box-shadow: 0 0 0 2px var(--theme-dark-accent);
	}

	.app-shell[data-theme="dark"] .seed-action-button:hover {
		background: var(--seed-action-hover);
	}

	.app-shell[data-theme="dark"] .color-picker {
		box-shadow: 0 20px 50px -24px rgb(0 0 0 / 0.95);
	}

	.app-shell[data-theme="dark"] .scheme-option.is-active {
		background: var(--theme-dark-primary-130);
		color: var(--theme-dark-background-10);
	}

	.app-shell[data-theme="dark"] .wcag-toggle {
		background: var(--theme-dark-background-150);
	}

	.app-shell[data-theme="dark"] .wcag-toggle-thumb {
		background: var(--theme-dark-background-20);
	}

	.app-shell[data-theme="dark"] .code-preview-glow {
		background: var(--theme-dark-accent-140);
	}

	.app-shell[data-theme="dark"] .code-preview-header {
		background: var(--theme-dark-background-150);
	}

	.app-shell[data-theme="dark"] .code-preview-body {
		background: var(--theme-dark-background-130);
		color: var(--theme-dark-text);
	}

	.app-shell[data-theme="dark"] .token-text,
	.app-shell[data-theme="dark"] .token-identifier {
		color: var(--theme-dark-text);
	}

	.app-shell[data-theme="dark"] .token-keyword {
		color: var(--theme-dark-primary-140);
	}

	.app-shell[data-theme="dark"] .token-string {
		color: var(--theme-dark-accent-140);
	}

	.app-shell[data-theme="dark"] .token-boolean {
		color: var(--theme-dark-secondary-140);
	}

	.app-shell[data-theme="dark"] .token-punctuation {
		color: var(--theme-dark-text-100);
	}

	.app-shell[data-theme="dark"] .feature-icon-shell.is-primary {
		border-color: var(--theme-dark-primary-150);
		background: var(--theme-dark-primary-40);
		color: var(--theme-dark-primary-130);
	}

	.app-shell[data-theme="dark"] .feature-icon-shell.is-secondary {
		border-color: var(--theme-dark-secondary-150);
		background: var(--theme-dark-secondary-40);
		color: var(--theme-dark-secondary-130);
	}

	.app-shell[data-theme="dark"] .feature-icon-shell.is-accent {
		border-color: var(--theme-dark-accent-150);
		background: var(--theme-dark-accent-40);
		color: var(--theme-dark-accent-130);
	}

	.app-shell[data-theme="dark"] .testimonial-fade-left {
		background-image: linear-gradient(to right, var(--theme-dark-background-120), transparent);
	}

	.app-shell[data-theme="dark"] .testimonial-fade-right {
		background-image: linear-gradient(to left, var(--theme-dark-background-120), transparent);
	}

	.app-shell[data-theme="dark"] .pricing-card-featured {
		border-color: var(--theme-dark-primary-150);
		background: linear-gradient(to bottom, var(--theme-dark-primary-50), var(--theme-dark-background-140));
	}

	.app-shell[data-theme="dark"] .pricing-badge {
		border-color: var(--theme-dark-primary-150);
		background: var(--theme-dark-primary-50);
		color: var(--theme-dark-primary-130);
	}

	.app-shell[data-theme="dark"] .footer-brand-icon {
		color: var(--theme-dark-accent-130);
	}

	.app-shell[data-theme="dark"] .scheme-menu-scrollbar {
		scrollbar-color: var(--theme-dark-background-170) var(--theme-dark-background-150);
	}

	.app-shell[data-theme="dark"] .scheme-menu-scrollbar::-webkit-scrollbar-track {
		background: var(--theme-dark-background-150);
	}

	.app-shell[data-theme="dark"] .scheme-menu-scrollbar::-webkit-scrollbar-thumb {
		background: var(--theme-dark-background-170);
		border-color: var(--theme-dark-background-150);
	}

	.app-shell[data-theme="dark"] .scheme-menu-scrollbar::-webkit-scrollbar-thumb:hover {
		background: var(--theme-dark-primary-130);
	}

	@media (min-width: 640px) {
		.page-shell {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}

		.install-pill {
			display: inline-flex;
		}

		.hero-actions {
			flex-direction: row;
			width: auto;
		}

		.hero-actions .primary-cta,
		.hero-actions .secondary-cta {
			width: auto;
		}

		.seed-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.code-preview-body {
			padding: 1.5rem;
		}
	}

	@media (min-width: 768px) {
		.nav-link-list {
			display: flex;
		}

		.nav-action-button {
			display: inline-flex;
		}

		.hero-title {
			font-size: 4.5rem;
		}

		.hero-copy {
			font-size: 1.25rem;
		}

		.hero-break {
			display: block;
		}

		.section-intro-centered .section-title {
			font-size: 2.25rem;
			line-height: 2.5rem;
		}

		.feature-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.pricing-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.testimonial-card {
			width: 24rem;
		}
	}

	@media (min-width: 1024px) {
		.page-shell {
			padding-left: 2rem;
			padding-right: 2rem;
		}

		.playground-grid {
			grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
		}
	}

	@media (min-width: 1280px) {
		.playground-grid {
			gap: 3rem;
		}
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
