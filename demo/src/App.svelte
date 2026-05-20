<script>
	let demoColor = "#3b82f6"
	let demoScheme = "triadic"
	let wcag = true
	let isCopied = false

	let generatedPalette

	$: generatedPalette = {
		light: {
			text: "#1f1020",
			background: "#fbf3fa",
			primary: demoColor,
			secondary: "#9b5a43",
			accent: "#9c661d"
		},
		dark: {
			text: "#f5e2f0",
			background: "#10070f",
			primary: "#d993c4",
			secondary: "#c18471",
			accent: "#dfae63"
		}
	}

	const features = [
		{
			icon: "layers",
			iconClass: "w-6 h-6 text-indigo-400",
			title: "Seedable Configuration",
			desc: "Provide zero to five seed colors, and we deterministically hallucinate the rest. Like magic, if you don't understand basic math."
		},
		{
			icon: "zap",
			iconClass: "w-6 h-6 text-yellow-400",
			title: "Aggressive WCAG",
			desc: "If your input or generated colors fail minimum accessibility checks, we throw an error and crash your app. You're welcome."
		},
		{
			icon: "code",
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

	function handleCopyCode() {
		const code = `import palette from '@jacoblockett/palette';\n\nconst theme = palette({\n  primary: '${demoColor}',\n  scheme: '${demoScheme}',\n  wcag: ${wcag}\n});\nconsole.log(theme);`
		navigator.clipboard.writeText(code)
		isCopied = true
		setTimeout(() => {
			isCopied = false
		}, 2000)
	}
</script>

{#snippet paletteIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
		<circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
		<circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
		<circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
		<path
			d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
	</svg>
{/snippet}

{#snippet zapIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<path
			d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
	</svg>
{/snippet}

{#snippet codeIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<path d="m16 18 6-6-6-6" />
		<path d="m8 6-6 6 6 6" />
	</svg>
{/snippet}

{#snippet layersIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<path
			d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
		<path d="m22 12.5-9.17 4.18a2 2 0 0 1-1.66 0L2 12.5" />
		<path d="m22 17.5-9.17 4.18a2 2 0 0 1-1.66 0L2 17.5" />
	</svg>
{/snippet}

{#snippet githubIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<path
			d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
		<path d="M9 18c-4.51 2-5-2-7-2" />
	</svg>
{/snippet}

{#snippet arrowRightIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<path d="M5 12h14" />
		<path d="m12 5 7 7-7 7" />
	</svg>
{/snippet}

{#snippet checkCircleIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<circle cx="12" cy="12" r="10" />
		<path d="m9 12 2 2 4-4" />
	</svg>
{/snippet}

{#snippet copyIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
		<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
	</svg>
{/snippet}

{#snippet terminalIcon(className)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}>
		<polyline points="4 17 10 11 4 5" />
		<line x1="12" x2="20" y1="19" y2="19" />
	</svg>
{/snippet}

<div class="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
	<nav class="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16 items-center">
				<div class="flex items-center gap-2">
					<div
						class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
						{@render paletteIcon("w-5 h-5 text-white")}
					</div>
					<span class="font-bold text-xl tracking-tight">Palette</span>
				</div>
				<div class="hidden md:flex gap-8 text-sm font-medium text-slate-300">
					<a href="#features" class="hover:text-white transition-colors">Features</a>
					<a href="#features" class="hover:text-white transition-colors">Testimonials</a>
					<a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
				</div>
				<div class="flex items-center gap-4">
					<a
						href="https://github.com/jacoblockett/palette"
						target="_blank"
						rel="noreferrer"
						class="text-slate-400 hover:text-white transition-colors">
						{@render githubIcon("w-5 h-5")}
					</a>
					<div
						class="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300">
						{@render terminalIcon("w-3 h-3 text-indigo-400")}
						pnpm i palette
					</div>
				</div>
			</div>
		</div>
	</nav>

	<section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
		<div
			class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-8 border border-indigo-500/20">
			<span class="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
			A five-role, seedable color palette generator.
		</div>
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
				Read the docs {@render arrowRightIcon("w-4 h-4")}
			</button>
			<button
				class="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-full font-semibold transition-colors border border-slate-700 font-mono text-sm">
				{@render terminalIcon("w-4 h-4")} pnpm i palette
			</button>
		</div>
	</section>

	<section id="demo" class="py-20 bg-slate-900 border-y border-white/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h2 class="text-3xl font-bold mb-4">Webscale color generation.</h2>
					<p class="text-slate-400 mb-8 leading-relaxed">
						Experience the paradigm-shifting synergy of passing a single seed color to automatically calculate text,
						background, primary, secondary, and accent roles for both light and dark modes.
					</p>

					<div class="space-y-6 bg-slate-950 p-6 rounded-2xl border border-white/10">
						<div>
							<label class="block text-sm font-medium text-slate-400 mb-2">Primary Seed (Hex)</label>
							<div class="flex gap-4">
								<input
									type="color"
									bind:value={demoColor}
									class="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0" />
								<input
									type="text"
									bind:value={demoColor}
									class="bg-slate-800 border border-slate-700 rounded-lg px-4 flex-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-slate-400 mb-2">Scheme</label>
							<select
								bind:value={demoScheme}
								class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
								<option value="analogous">Analogous</option>
								<option value="triadic">Triadic</option>
								<option value="compound">Compound</option>
								<option value="enterprise">Enterprise</option>
								<option value="neon">Neon</option>
								<option value="brand-status">Brand Status</option>
							</select>
						</div>

						<div class="flex items-center gap-3 pt-2">
							<button
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

				<div class="relative group">
					<div
						class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200">
					</div>
					<div class="relative bg-[#0d1117] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
						<div class="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
							<div class="flex gap-2">
								<div class="w-3 h-3 rounded-full bg-red-500/80"></div>
								<div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
								<div class="w-3 h-3 rounded-full bg-green-500/80"></div>
							</div>
							<div class="text-sm text-slate-400">Don't worry, I don't actually use Unix</div>
							<button
								onclick={handleCopyCode}
								class="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium">
								{#if isCopied}
									{@render checkCircleIcon("w-3.5 h-3.5 text-green-400")}
								{:else}
									{@render copyIcon("w-3.5 h-3.5")}
								{/if}
								{isCopied ? "Copied" : "Copy"}
							</button>
						</div>
						<div class="p-4 sm:p-6 text-sm font-mono text-slate-300 overflow-x-auto">
							<div class="text-slate-500">// 1. Import the totally-not-already-taken-package-name</div>
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
									<span class="text-slate-300"> primary:</span> <span class="text-green-400">"{demoColor}"</span>,
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
								<div class="pl-8">"primary": "<span class="text-yellow-300">{demoColor}</span>",</div>
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
						{#if feature.icon === "layers"}
							{@render layersIcon(feature.iconClass)}
						{:else if feature.icon === "zap"}
							{@render zapIcon(feature.iconClass)}
						{:else if feature.icon === "code"}
							{@render codeIcon(feature.iconClass)}
						{/if}
					</div>
					<h3 class="text-xl font-bold mb-3">{feature.title}</h3>
					<p class="text-slate-400 leading-relaxed">{feature.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<section id="pricing" class="py-24 bg-slate-900 border-t border-white/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4">Pricing that scales with you.</h2>
				<p class="text-slate-400 text-lg">By which we mean it's literally just open source.</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				<div class="bg-slate-950 rounded-3xl p-8 border border-white/10">
					<h3 class="text-xl font-semibold mb-2">Open Source</h3>
					<div class="flex items-baseline gap-1 mb-6">
						<span class="text-4xl font-bold">$0</span>
						<span class="text-slate-400">/forever</span>
					</div>
					<p class="text-slate-400 mb-8">Perfect for developers who know how to use a package manager.</p>
					<ul class="space-y-4 mb-8">
						{#each openSourceFeatures as item, i (i)}
							<li class="flex items-center gap-3 text-sm text-slate-300">
								{@render checkCircleIcon("w-4 h-4 text-indigo-400")}
								{item}
							</li>
						{/each}
					</ul>
					<a
						href="https://github.com/jacoblockett/palette"
						class="block mt-auto text-center w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors">
						View on GitHub
					</a>
					<p class="text-slate-400 mt-4 text-xs">* If you consider a lone dev a community</p>
				</div>

				<div
					class="bg-gradient-to-b from-indigo-500/10 to-slate-950 rounded-3xl p-8 border border-indigo-500/30 relative">
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
								{@render checkCircleIcon("w-4 h-4 text-indigo-400")}
								{item}
							</li>
						{/each}
					</ul>
					<a
						href="https://github.com/jacoblockett/palette"
						class="block text-center w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-lg shadow-indigo-500/25">
						Also View on GitHub
					</a>
					<p class="text-slate-400 mt-4 text-xs">* Or at least, we'll say we did and never actually do it</p>
				</div>
			</div>
		</div>
	</section>

	<footer class="py-12 border-t border-white/10 bg-slate-950 text-center text-slate-400 text-sm">
		<div class="flex items-center justify-center gap-2 mb-4">
			{@render paletteIcon("w-5 h-5 text-indigo-400")}
			<span class="font-semibold text-white">Palette</span>
		</div>
		<div class="flex justify-center gap-6">
			<a href="https://github.com/jacoblockett/palette" class="hover:text-white transition-colors">Documentation</a>
			<a href="https://github.com/jacoblockett/palette" class="hover:text-white transition-colors">GitHub</a>
		</div>
	</footer>
</div>
