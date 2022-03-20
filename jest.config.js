module.exports = {
  // other properties...
  setupFilesAfterEnv: ['./jest.setup.redis-mock.js'],
  moduleDirectories: ['node_modules', 'app'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  testMatch: ['<rootDir>/tests/**'],
  transform: {
    '\\.m?jsx?$': 'jest-esm-transformer'
  },
};
