import { generateProductFeatures } from "./features";

describe("generateProductFeatures", () => {
  it("should return an array of product features", () => {
    const features = generateProductFeatures();
    expect(Array.isArray(features)).toBeTruthy();
    expect(
      features.every((feature) => typeof feature === "string")
    ).toBeTruthy();
  });
});
