// import {InitialOptionsTsJest} from 'ts-jest/dist/types'

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  // preset: "ts-jest",
  // testEnvironment: "jsdom",
  // extensionsToTreatAsEsm: [".ts"],
  // globals: {
  //   "ts-jest": {
  //     useESM: true,
  //   },
  // },
  // moduleNameMapper: {
  //   "^(\\.{1,2}/.*)\\.js$": "$1",
  // },
  // transform: {},
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ["/node-modules/"],
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
