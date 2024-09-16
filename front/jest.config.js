module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": ["babel-jest", { configFile: "./babel.config.jest.js" }],
    "^.+\\.tsx?$": "@swc/jest",
    "^.+\\.tsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(node-fetch)/)"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
