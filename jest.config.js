/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  silent: true, // @important this disabled console log from within the process, make false if you want to see them
  testTimeout: 100000, // very high timeout, maybe there is a better way
  passWithNoTests: true,
};
