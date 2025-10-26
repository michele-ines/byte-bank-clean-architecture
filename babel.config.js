module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg'],
          alias: {
            '@': './src',
            '@assets': './assets',
            '@domain': './src/domain',
            '@application': './src/application',
            '@infrastructure': './src/infrastructure',
            '@presentation': './src/presentation',
            '@shared': './src/shared'
          }
        }
      ],
      // SEMPRE por último
      'react-native-reanimated/plugin'
    ]
  };
};
