module.exports = {
  displayName: 'client',
  testEnvironmentOptions: {
    url: 'https://til.test.com',
  },
  testPathIgnorePatterns: ['/node_modules/', '/utilities/'],
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
};
