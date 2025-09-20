const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 웹 환경에서 import.meta 문제 해결
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// 웹 환경에서 ES 모듈 문제 해결
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

// 웹 환경에서 import.meta 사용을 위한 설정
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
