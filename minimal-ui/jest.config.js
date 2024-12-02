module.exports = {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(jest-fetch-mock|@pact-foundation)/)',
    ],
    testEnvironment: 'jsdom', // Ensure React environment
    setupFilesAfterEnv: ['src/setupTests.js'], // For fetch-mock
  };
  