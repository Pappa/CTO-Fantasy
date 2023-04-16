import { truncate, arrayToTextList } from "./strings";

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

describe("arrayToTextList()", () => {
  it("should return an empty string if passed an empty array", () => {
    const input = [];
    expect(arrayToTextList(input)).toBe("");
  });
  it("should return a string with 2 items", () => {
    const input = [1, 4];
    expect(arrayToTextList(input)).toBe("1 and 4");
  });
  it("should return a string with 3 items", () => {
    const input = ["cats", "dogs", "goats"];
    expect(arrayToTextList(input)).toBe("cats, dogs and goats");
  });
  it("should return a string with 4 items", () => {
    const input = ["cats", "dogs", "goats", "trees"];
    expect(arrayToTextList(input)).toBe("cats, dogs, goats and trees");
  });
});
