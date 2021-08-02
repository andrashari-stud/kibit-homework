module.exports = {
  coverageDirectory: "../coverage",
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testEnvironment: "node",
  testRegex: ".spec.ts$",
  testTimeout: 40000,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
