
/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',

  setupFiles: [
    './__mocks__/@react-native-async-storage/async-storage.js',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  collectCoverage: true,

  collectCoverageFrom: [
    'src/domain/use-cases/**/*.{ts,tsx}',
    'src/shared/utils/**/*.{ts,tsx}',
    'src/presentation/components/**/*.{ts,tsx}',

    '!**/*.styles.ts',
    '!**/*.mock.ts',
    '!**/*.d.ts',
    '!**/index.ts',

    '!src/presentation/layout/**/*',
    '!src/presentation/providers/**/*',
    '!src/presentation/hooks/**/*',
    '!src/presentation/screens/Auth/Signup/**/*',
    '!src/presentation/screens/OtherServices/**/*',
    '!src/presentation/components/LoadingFallback**/*',
    '!src/presentation/components/ErrorBoundary/**/*',
    '!src/shared/interfaces/**/*',
    '!src/shared/components/**/*',
  ],

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/app/',
    '/assets/',
    '/dist/',
    '/coverage/',
    '/.expo/',
  ],

  coverageReporters: ['text', 'lcov'],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],

  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|' +
      '@react-native(-community)?|' +
      'expo(nent)?|' +
      '@expo(nent)?/.*|' +
      'expo-.*|' +
      '@expo-google-fonts/.*|' +
      'react-navigation|' +
      '@react-navigation/.*|' +
      '@unimodules/.*|' +
      'unimodules|' +
      'sentry-expo|' +
      'native-base|' +
      'react-native-svg|' +
      'firebase)/)',
  ],
};
