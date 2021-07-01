import { unique, range, intersperse, partition } from "./collection";

describe("unique", () => {
  it("should remove duplicated from an array", () => {
    const actual = unique([1, 2, 3, 4, 1, 2, 3, 4, 5]);
    expect([1, 2, 3, 4, 5]).toEqual(actual);
  });
});

describe("range", () => {
  it("should generate an array of numbers starting from 0", () => {
    const actual = range(5);
    expect([0, 1, 2, 3, 4]).toEqual(actual);
  });
  it("should generate an array of numbers starting from start", () => {
    const actual = range(5, 10);
    expect([5, 6, 7, 8, 9]).toEqual(actual);
  });
});

describe("intersperse", () => {
  it("should intersperse an array with values", () => {
    const actual = intersperse([1, 2, 3, 4, 5], "a");
    expect([1, "a", 2, "a", 3, "a", 4, "a", 5]).toEqual(actual);
  });
});

describe("partition", () => {
  it("should partition an array based on a predicate", () => {
    const actual = partition((x) => x > 3, [1, 2, 3, 4, 5]);
    expect([
      [4, 5],
      [1, 2, 3],
    ]).toEqual(actual);
  });
});
