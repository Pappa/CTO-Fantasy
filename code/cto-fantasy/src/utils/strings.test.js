import { truncate } from "./strings";

describe("truncate()", () => {
  it("should not truncate a string shorter than or equal to max", () => {
    const text = "12345";
    expect(truncate(text, 5)).toBe(text);
    expect(truncate(text, 6)).toBe(text);
  });
  it("should truncate a string longer than max", () => {
    const text = "123456789";
    expect(truncate(text, 5)).toBe("12...");
    expect(truncate(text, 8)).toBe("12345...");
  });
});
