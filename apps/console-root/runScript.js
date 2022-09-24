const { spawn } = require('child_process');

const args = [
  'run',
  'nx',
  'run-many',
  '--',
  `--projects=${process.env.projects}`,
  `--target=serve`,
  `--configuration=development`,
];
spawn('npm', [...args], { stdio: 'inherit', shell: true });
