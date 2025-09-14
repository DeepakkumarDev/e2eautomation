// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/vtest/**/*.test.{js,ts}", "tests/vtest/**/*.spec.{js,ts}"],
    globals: true,
    environment: "jsdom", // or 'node' if you don't need DOM
  },
});

// "scripts": {
//     "test": "jest",
//     "test:unit": "jest",
//     "test:e2e": "playwright test",
//     "test:bdd": "cucumber-js"
// },

// {
//   "name": "e2eautomation",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     "test:jest": "jest --config jest.config.js",
//     "test:vitest": "vitest",
//     "test:vitest:run": "vitest run",
//     "test:vitest:watch": "vitest --watch",
//     "test:e2e": "npx playwright test",
//     "test:bdd": "node cucumber.js"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "type": "module",
//   "dependencies": {
//     "playwright": "^1.55.0"
//   },
//   "devDependencies": {
//     "@cucumber/cucumber": "^12.1.0",
//     "@playwright/test": "^1.55.0",
//     "@types/jest": "^30.0.0",
//     "@types/node": "^24.3.0",
//     "cucumber": "^6.0.7",
//     "jest": "^30.0.5",
//     "ts-jest": "^29.4.1",
//     "vitest": "^3.2.4"
//   },
//   "directories": {
//     "test": "tests"
//   }
// }
