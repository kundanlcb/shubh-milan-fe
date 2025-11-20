module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|react-native-fast-image|react-native-image-picker)/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
