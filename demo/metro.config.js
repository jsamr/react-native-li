const path = require('path');
const fs = require('fs');
// We must use @expo/metro-config for icons in @expo/vector-icons to work properly.
const { getDefaultConfig } = require('@expo/metro-config');

const packagesRoot = path.resolve(__dirname, '../packages');

const localPkgs = fs.readdirSync(packagesRoot);

module.exports = (async () => {
  const { resolver, ...other } = await getDefaultConfig(__dirname);
  return {
    ...other,
    watchFolders: localPkgs.map((f) => path.join(packagesRoot, f)),
    resolver: {
      ...resolver,
      extraNodeModules: new Proxy(
        {},
        {
          get: (target, name) => path.join(__dirname, `node_modules/${name}`)
        }
      )
    }
  };
})();
