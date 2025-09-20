module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 웹 환경에서 import.meta 문제 해결
      [
        '@babel/plugin-syntax-import-meta',
        {
          // import.meta를 require로 변환
          module: 'commonjs'
        }
      ],
      // React Native Web 호환성
      'react-native-web/babel'
    ],
  };
};
