import fs from "node:fs"
import { spawn } from "node:child_process"

const usageMessage = "Usage: pnpm dev <1|2>"
const version = process.argv
	.slice(2)
	.filter(argument => argument !== "--")
	.find(argument => argument === "1" || argument === "2")
const demoPath = version === "1" ? "demo/index.html" : version === "2" ? "demo/index_v2.html" : null

if (!demoPath) {
	process.stderr.write(`${usageMessage}\n`)
	process.exit(1)
}

if (!fs.existsSync(demoPath)) {
	process.stderr.write(`Demo file not found: ${demoPath}\n`)
	process.exit(1)
}

const viteProcess = spawn("vite", ["--host", "0.0.0.0", "--open", `/${demoPath}`], {
	shell: true,
	stdio: "inherit"
})

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
