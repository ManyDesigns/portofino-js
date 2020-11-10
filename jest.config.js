const {defaults} = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    ...defaults.testMatch,
    '**/tests/**/*.[jt]s?(x)',
  ],
  silent: true,
};