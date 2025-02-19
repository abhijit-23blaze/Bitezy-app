module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@socket': './src/socket',
          '@components': './src/components',
          
          // Add other aliases as needed
        },
      },
    ],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
    'react-native-reanimated/plugin', // If you are using react-native-reanimated
  ],
};