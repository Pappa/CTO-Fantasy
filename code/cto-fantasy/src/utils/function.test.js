import { noop, id } from "./function";

describe("noop()", () => {
  it("should do nothing", () => {
    expect(noop()).toEqual(undefined);
    expect(noop(1)).toEqual(undefined);
  });
});

describe("id()", () => {
  it("should return the first parameter", () => {
    const obj = {};
    expect(id(obj)).toBe(obj);
  });
});
