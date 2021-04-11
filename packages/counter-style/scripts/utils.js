const fs = require('fs/promises');
const path = require('path');
const presetsSrcPath = path.join(__dirname, '../src/presets');
const presetsPath = path.join(__dirname, '../presets');

async function getPresets() {
  return (await fs.readdir(presetsSrcPath)).filter(
    (name) => name !== 'index.ts'
  );
}

module.exports = {
  getPresets,
  presetsPath,
  presetsSrcPath
};
