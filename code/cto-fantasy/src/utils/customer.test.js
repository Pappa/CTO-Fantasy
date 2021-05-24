import { getPriorityText } from "./customer";

describe("getPriorityText()", () => {
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should return a top priority text", () => {
    const expected = getPriorityText("search", 0);
    expect(expected).toEqual(
      "The users are demanding to be able to use the search feature. We need it done."
    );
  });

  it("should return a lower priority text", () => {
    const expected = getPriorityText("search", 1);
    expect(expected).toEqual(
      "It'd be good to get the search feature deployed if we can."
    );
  });
});
