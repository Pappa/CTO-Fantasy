import { generateProductFeatures } from "./features";

describe("generateProductFeatures", () => {
  it("should return product features", () => {
    const storyPointValues = [1, 2, 3, 5, 8, 13, 20];
    const { initial, rest } = generateProductFeatures(storyPointValues);
    expect(Array.isArray(initial)).toBeTruthy();
    expect(Array.isArray(rest)).toBeTruthy();
    expect(
      initial.every(
        ({ id, status, title, feature, effort, completedEffort }) =>
          typeof id === "string" &&
          status === "TODO" &&
          typeof title === "string" &&
          typeof feature === "string" &&
          typeof effort === "number" &&
          completedEffort === 0
      )
    ).toBeTruthy();
    expect(
      rest.every(
        ({ id, status, title, feature, effort, completedEffort }) =>
          typeof id === "string" &&
          status === "NOT_CREATED" &&
          typeof title === "string" &&
          typeof feature === "string" &&
          typeof effort === "number" &&
          completedEffort === 0
      )
    ).toBeTruthy();
  });
});
