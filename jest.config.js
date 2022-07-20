

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  maxWorkers: '80%',
  testEnvironment: 'node',
  moduleFileExtensions: [ "js" ],
  slowTestThreshold: 5,
  testMatch: [
    "**/__tests__/?(*.)+(spec|test).[tj]s?(x)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  moduleNameMapper: {
    "@actions/github": "<rootDir>/__tests__/module/github.js",
    "@actions/core": "<rootDir>/__tests__/module/core.js",
  },
  verbose: true
};
