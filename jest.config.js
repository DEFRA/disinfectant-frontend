export default {
  rootDir: '.',
  testEnvironment: 'jsdom',
  verbose: true,
  resetModules: true,
  clearMocks: true,
  silent: true,
  testMatch: ['**/src/**/*.test.js'],
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  collectCoverageFrom: ['src/**/helpers'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/__fixtures__',
    '<rootDir>/src/server/common/test-helpers',
    '<rootDir>/src/server/approved-disinfectants/helpers/fetch-data.test.js'
  ],
  coverageDirectory: '<rootDir>/coverage'
}
