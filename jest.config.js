/** @format */

// /** @format */

// module.exports = {
//   testEnvironment: "jest-environment-jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/$1",
//   },
//   testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
// };

// /** @type {import('jest').Config} */
// const config = {
//   preset: "ts-jest",
//   testEnvironment: "jest-environment-jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1", // ✅ FIXED
//   },
//   transform: {
//     "^.+\\.(ts|tsx)$": ["ts-jest"],
//   },
//   testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
// };

// module.exports = config;

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest/presets/js-with-ts", // ✅ Use this to support JSX with TS
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^__mocks__/(.*)$": "<rootDir>/__mocks__/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // ✅ make sure transform is using ts-jest
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

module.exports = config;
