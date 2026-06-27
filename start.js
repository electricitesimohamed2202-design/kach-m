import fs from "fs";
import { spawn } from "child_process";

const paths = [".output/server/index.mjs", "dist/server/server.js", "dist/server/index.mjs"];

let foundPath = null;
for (const p of paths) {
  if (fs.existsSync(p)) {
    foundPath = p;
    break;
  }
}

if (!foundPath) {
  console.error("No compiled server entry point found in:", paths);
  process.exit(1);
}

console.log(`Starting server using entry point: ${foundPath}`);
const child = spawn("node", [foundPath], { stdio: "inherit" });

child.on("close", (code) => {
  process.exit(code || 0);
});
