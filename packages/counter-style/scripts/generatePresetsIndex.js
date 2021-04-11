const fs = require('fs/promises');
const path = require('path');

const { presetsSrcPath, getPresets } = require('./utils.js');

async function run() {
  const presets = await getPresets();
  const content = `${presets
    .map((name) => {
      const baseName = name.replace('.ts', '');
      return `export { default as ${baseName} } from './${baseName}';`;
    })
    .join('\n')}\n`;
  await fs.writeFile(path.join(presetsSrcPath, 'index.ts'), content);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
