module.exports = {
  testEnvironment: "node",
  testMatch: ["**/unittests/**/*.test.[jt]s?(x)"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
