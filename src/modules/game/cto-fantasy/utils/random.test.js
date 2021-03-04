import { randomInt, pick, randomName } from "./random";

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.5);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
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
