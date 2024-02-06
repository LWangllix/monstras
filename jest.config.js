module.exports = {
  "coveragePathIgnorePatterns": [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/JSMD/JSMD/getActtiveState.test.ts",
    "<rootDir>/JSMD/**/**.test.ts",
    ".mock.ts"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],

  preset: 'ts-jest',
  testEnvironment: 'node',
};