const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 🧩 Configura o transformer do SVG
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

// ⚙️ Remove "svg" de assetExts e adiciona em sourceExts
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts.push("svg");

module.exports = config;
