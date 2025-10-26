// // babel.config.js
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       [
//         "module-resolver",
//         {
//           extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
//           alias: {
//             "@domain": "./src/domain",
//             "@application": "./src/application",
//             "@infrastructure": "./src/infrastructure",
//             "@presentation": "./src/presentation",
//             "@shared": "./src/shared"
//           }
//         }
//       ],
//       // mantenha por último
//       "react-native-reanimated/plugin"
//     ]
//   };
// };
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      ['module-resolver', {
        root: ['./'],
        // inclua .svg aqui também
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg'],
        alias: {
          '@': './',                    // permite "@/..."
          '@assets': './assets',        // permite "@assets/..."
          '@domain': './src/domain',
          '@application': './src/application',
          '@infrastructure': './src/infrastructure',
          '@presentation': './src/presentation',
          '@shared': './src/shared'
        }
      }],
      'react-native-reanimated/plugin', // sempre por último
    ],
  };
};

