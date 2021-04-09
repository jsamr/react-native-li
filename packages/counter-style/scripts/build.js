/* eslint-disable compat/compat */
/*
 * This build script spawns processes to shorten execution time.
 */
const childProcess = require('child_process');

function promiseFromChildProcess(child) {
  return new Promise(function (resolve, reject) {
    child.on('error', reject);
    child.on('exit', () => {
      resolve();
    });
  });
}

function exec(command) {
  const child = childProcess.exec(command);
  child.stdout.on('data', (data) => console.log(data));
  child.stderr.on('data', (data) => console.error(data));
  return child;
}

async function build() {
  const buildPresetProcess = exec('yarn build:presets');
  const cleanProcess = exec('yarn build:clean');
  await promiseFromChildProcess(cleanProcess);
  const buildEsProcess = exec('yarn build:es');
  const buildCjsProcess = exec('yarn build:cjs');
  await Promise.all([
    promiseFromChildProcess(buildEsProcess),
    promiseFromChildProcess(buildCjsProcess)
  ]);
  const buildDefsProcess = exec('yarn build:defs');
  await promiseFromChildProcess(buildDefsProcess);
  const buildDocProcess = exec('yarn build:doc');
  await Promise.all([
    promiseFromChildProcess(buildDocProcess),
    promiseFromChildProcess(buildPresetProcess)
  ]);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
