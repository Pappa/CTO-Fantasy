import { sum, average } from "./number";

describe("number", () => {
  it("should sum an array of numbers", () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });
  it("should return the average from a list of numbers", () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
  });
});
