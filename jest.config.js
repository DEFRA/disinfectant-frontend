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
  collectCoverageFrom: [
    'src/**/approval-data.js',
    'src/**/sort-by-timestamp.js',
    'src/**/build-filter.js',
    'src/**/chemicalgroup-data.js',
    'src/**/table-data.js',
    'src/**/format-currency.js',
    'src/**/format-date.js',
    'src/**/get-trust-store-certs.js'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/__fixtures__',
    '<rootDir>/src/server/common/test-helpers',
    '<rootDir>/src/client',
    '<rootDir>/src/config'
  ],
  coverageDirectory: '<rootDir>/coverage'
}
