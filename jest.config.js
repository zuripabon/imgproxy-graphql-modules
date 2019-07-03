module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/lib/',
    '/.cache/',
    '/.vscode/'
  ],
  coverageDirectory: 'coverage'
};
