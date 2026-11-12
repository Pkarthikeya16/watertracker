const { spawn } = require('child_process');
const path = require('path');

const runService = (name, cwd, command, args) => {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code !== null && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
    }
  });

  return child;
};

const backendProc = runService(
  'backend',
  path.join(__dirname, 'backend'),
  'npm',
  ['run', 'dev']
);

const frontendProc = runService(
  'frontend',
  path.join(__dirname, 'frontend'),
  'npm',
  ['run', 'dev']
);

const shutdown = () => {
  backendProc.kill();
  frontendProc.kill();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
