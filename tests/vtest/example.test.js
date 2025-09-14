// tests/vtest/example.test.js
import { describe, it, expect } from "vitest";

describe("basic math", () => {
  it("adds 2 + 3 = 5", () => {
    expect(2 + 3).toBe(5);
  });
});
