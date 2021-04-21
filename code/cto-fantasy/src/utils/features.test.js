import { generateProductFeatures } from "./features";

describe("generateProductFeatures", () => {
  it("should return product features", () => {
    const { initial, rest } = generateProductFeatures();
    expect(Array.isArray(initial)).toBeTruthy();
    expect(Array.isArray(rest)).toBeTruthy();
    expect(
      initial.every(
        ({ id, status, title, feature }) =>
          typeof id === "string" &&
          status === "TODO" &&
          typeof title === "string" &&
          typeof feature === "string"
      )
    ).toBeTruthy();
    expect(
      rest.every(
        ({ id, status, title, feature }) =>
          typeof id === "string" &&
          status === "NOT_CREATED" &&
          typeof title === "string" &&
          typeof feature === "string"
      )
    ).toBeTruthy();
  });
});
