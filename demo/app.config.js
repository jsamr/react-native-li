export default {
  name: 'Demo',
  displayName: 'Demo',
  expo: {
    name: 'Demo',
    slug: 'demo',
    version: '0.0.0',
    orientation: 'default',
    description: '*',
    icon: './assets/icon.png',
    splash: {
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    web: {
      favicon: './assets/favicon.png'
    }
  }
};
