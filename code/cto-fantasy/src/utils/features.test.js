import { generateProductFeatures } from "./features";

describe("generateProductFeatures", () => {
  it("should return an array of product features", () => {
    const features = generateProductFeatures();
    expect(Array.isArray(features)).toBeTruthy();
    expect(
      features.slice(0, 9).every(({ status }) => status === "TODO")
    ).toBeTruthy();
    expect(
      features.slice(10).every(({ status }) => status === "NOT_CREATED")
    ).toBeTruthy();
    expect(
      features.every(({ title }) => typeof title === "string")
    ).toBeTruthy();
  });
});
