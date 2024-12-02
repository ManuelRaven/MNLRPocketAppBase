import { spawn } from "child_process";
import terminate from "terminate";

const runCommand = (command, args, callback) => {
  const process = spawn(command, args, { shell: true });

  process.stdout.on("data", (data) => {
    console.log(`Output of ${command}: ${data}`);
  });

  process.stderr.on("data", (data) => {
    console.error(`Error output of ${command}: ${data}`);
  });

  process.on("close", (code) => {
    if (code !== 0) {
      console.error(
        `Error executing ${command}: Process exited with code ${code}`
      );
    }
    if (callback) callback();
  });

  return process;
};

const serverProcess = runCommand("pnpm", ["run", "dev:server"]);

setTimeout(() => {
  runCommand("pnpm", ["run", "dev:gentypes"], () => {
    console.log("Killing server process, the following error is expected");
    terminate(serverProcess.pid);
  });
}, 5000);
