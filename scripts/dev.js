import fs from "node:fs"
import { spawn } from "node:child_process"

const usageMessage = "Usage: pnpm dev -- <1|2>"

function resolveVersion(argv) {
	for (let index = 0; index < argv.length; index += 1) {
		const argument = argv[index]

		if (argument === "--version") {
			return argv[index + 1]
		}

		if (argument.startsWith("--version=")) {
			return argument.slice("--version=".length)
		}

		if (
			argument === "1" ||
			argument === "v1" ||
			argument === "index" ||
			argument === "index.html" ||
			argument === "2" ||
			argument === "v2" ||
			argument === "index_v2" ||
			argument === "index_v2.html"
		) {
			return argument
		}
	}

	return null
}

function mapDemoPath(version) {
	if (version === "1" || version === "v1" || version === "index" || version === "index.html") {
		return "demo/index.html"
	}

	if (version === "2" || version === "v2" || version === "index_v2" || version === "index_v2.html") {
		return "demo/index_v2.html"
	}

	return null
}

const version = resolveVersion(process.argv.slice(2))
const demoPath = mapDemoPath(version)

if (!demoPath) {
	process.stderr.write(`${usageMessage}\n`)
	process.exit(1)
}

if (!fs.existsSync(demoPath)) {
	process.stderr.write(`Demo file not found: ${demoPath}\n`)
	process.exit(1)
}

const viteProcess = spawn(
	"node_modules/.bin/vite",
	["--host", "0.0.0.0", "--open", `/${demoPath}`],
	{
		shell: true,
		stdio: "inherit"
	}
)

function forwardSignal(signal) {
	if (!viteProcess.killed) {
		viteProcess.kill(signal)
	}
}

process.on("SIGINT", () => forwardSignal("SIGINT"))
process.on("SIGTERM", () => forwardSignal("SIGTERM"))

viteProcess.on("exit", code => {
	process.exit(code ?? 0)
})
