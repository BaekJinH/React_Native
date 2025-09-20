module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
        // 이미 있는 플러그인들 유지하고, 아래 라인 추가
        ['babel-plugin-transform-import-meta', { module: 'es6' }],
        // expo-router 쓰면 이 플러그인도 보통 있음
        require.resolve("expo-router/babel"),
      ],
  };
};
