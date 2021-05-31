import { randomInt, pick, randomName, randomStat } from "./random";
let rand;
beforeEach(() => {
  rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
});

afterEach(() => {
  rand.mockRestore();
});

describe("randomInt()", () => {
  it("should return 3", () => {
    expect(randomInt(1, 5)).toBe(3);
  });
});

describe("pick()", () => {
  it("should return 3", () => {
    expect(pick([1, 2, 3, 4, 5])).toBe(3);
  });
});

describe("randomName()", () => {
  it("should select a male name", () => {
    expect(randomName(0)).toBe("Timothy Hanson");
  });
  it("should select a female name", () => {
    expect(randomName(1)).toBe("Joyce Hanson");
  });
});

describe("randomStat()", () => {
  it("should select weighted value between 0 and 1", () => {
    expect(randomStat()).toBe(0.4);
  });
});
