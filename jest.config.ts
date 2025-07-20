/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "./FixJSDOMEnvironment.ts",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ["/node-modules/"],
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/testing/setupTests.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
};
