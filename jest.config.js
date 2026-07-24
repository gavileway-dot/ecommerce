export default {
  testEnvironment: 'node',
  transform: {},
  setupFiles: ['dotenv/config'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
};
