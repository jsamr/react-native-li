const fs = require('fs/promises');
const rimraf = require('rimraf');
const path = require('path');
const util = require('util');
const { presetsPath, getPresets } = require('./utils');

const rimrafAsync = util.promisify(rimraf);

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
  const presets = await getPresets();
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
        types: `../../lib/es/presets/${baseName}.d.ts`,
        'react-native': `../../lib/es/presets/${baseName}.js`,
        sideEffects: false
      })
    );
  }
  // Add a barrel for all presets for easy presets discoverability.
  await fs.writeFile(
    path.join(presetsPath, 'package.json'),
    JSON.stringify({
      module: '../lib/es/presets/index.js',
      main: '../lib/cjs/presets/index.js',
      types: '../lib/es/presets/index.d.ts',
      'react-native': '../lib/es/presets/index.js',
      sideEffects: false
    })
  );
  console.info(
    `Done. Wrote ${presets.length} modules in ${presetsPath} folder.`
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
