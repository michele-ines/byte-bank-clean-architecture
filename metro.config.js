// // metro.config.js
// // Learn more: https://docs.expo.dev/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// // Config para usar SVGs com react-native-svg-transformer
// config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
// config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
// config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// module.exports = config;

// metro.config.js
// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Garante objetos iniciais
config.transformer = config.transformer || {};
config.resolver = config.resolver || {};
config.resolver.assetExts = config.resolver.assetExts || [];
config.resolver.sourceExts = config.resolver.sourceExts || [];

// Usar SVGs como componentes React via react-native-svg-transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Tratar .svg como source (e não asset)
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...new Set([...config.resolver.sourceExts, 'svg'])];

module.exports = config;
