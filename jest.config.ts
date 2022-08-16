/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
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
