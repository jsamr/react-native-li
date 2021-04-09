const fs = require('fs/promises');
const rimraf = require('rimraf');
const path = require('path');
const util = require('util');

const rimrafAsync = util.promisify(rimraf);

const presetsPath = path.join(__dirname, '../presets');
const presetsSrcPath = path.join(__dirname, '../src/presets');

async function clean() {
  try {
    await fs.lstat(presetsPath);
  } catch (e) {
    return;
  }
  try {
    await rimrafAsync(presetsPath);
  } catch (e) {
    console.info('Could not remove dir', e);
    throw e;
  }
}

async function run() {
  const presets = await fs.readdir(presetsSrcPath);
  await clean();
  await fs.mkdir(presetsPath);
  for (const counter of presets) {
    const baseName = counter.replace('.ts', '');
    const sourcePath = path.join(presetsPath, baseName);
    await fs.mkdir(sourcePath);
    await fs.writeFile(
      path.join(sourcePath, 'package.json'),
      JSON.stringify({
        module: `../../lib/es/presets/${baseName}.js`,
        main: `../../lib/cjs/presets/${baseName}.js`,
        types: `../../lib/cjs/presets/${baseName}.d.ts`
      })
    );
  }
  console.info(
    `Done. Wrote ${presets.length} modules in ${presetsPath} folder.`
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
