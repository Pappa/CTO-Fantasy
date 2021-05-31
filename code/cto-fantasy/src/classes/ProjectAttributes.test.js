import { ProjectAttributes } from "./ProjectAttributes";

describe("ProjectAttributes", () => {
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should return default attributes", () => {
    const attributes = new ProjectAttributes();
    expect(attributes).toMatchObject({
      attributes: {
        AGILE: {},
        QUALITY_ASSURANCE: {},
        SOFTWARE_ENGINEERING: {},
      },
    });
  });
});
