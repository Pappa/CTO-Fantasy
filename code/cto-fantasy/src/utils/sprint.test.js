import {
  calculateNewSprintBugs,
  calculateBacklogCapacityRow,
  getBacklogEstimates,
} from "./sprint";
import { generateProductFeatures } from "./features";
import { UserStory } from "../classes/WorkItem";

describe("calculateNewSprintBugs()", () => {
  const BUGINESS_RATIO = 10;
  it("should generate no bugs when all parameters have max values", () => {
    const team = { skill: 1, qualityMindset: 1, collaboration: 1 };
    expect(calculateNewSprintBugs(team, BUGINESS_RATIO)).toBe(0);
  });

  it("should generate a small number of bugs", () => {
    const team = { skill: 0.9, qualityMindset: 1, collaboration: 1 };
    expect(calculateNewSprintBugs(team, BUGINESS_RATIO)).toBe(1);
  });

  it("should generate an average number of bugs", () => {
    const team = { skill: 0.5, qualityMindset: 0.5, collaboration: 0.5 };
    expect(calculateNewSprintBugs(team, BUGINESS_RATIO)).toBe(5);
  });

  it("should generate the maximum number of bugs", () => {
    const team = { skill: 0, qualityMindset: 0, collaboration: 0 };
    expect(calculateNewSprintBugs(team, BUGINESS_RATIO)).toBe(10);
  });
});

describe("calculateBacklogCapacityRow()", () => {
  it("should return last position when all estimates are null", () => {
    const estimates = [null, null, null, null, null];
    const velocity = 4;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(5);
  });
  it("should return last position when velocity equals total estimates", () => {
    const estimates = [1, 1, 1, null, 1];
    const velocity = 4;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(5);
  });

  it("should return last position when velocity is greater than total estimates", () => {
    const estimates = [1, 1, 1, null, 1];
    const velocity = 10;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(5);
  });

  it("should return the last position before going over the limit", () => {
    const estimates = [null, 1, 1, 1, 1];
    const velocity = 2;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(3);
  });

  it("should return the last position before going over the limit including nulls", () => {
    const estimates = [null, 1, 1, null, 1];
    const velocity = 2;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(4);
  });

  it("should return 0 if the first estimate is over", () => {
    const estimates = [100, 200, 300];
    const velocity = 2;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(0);
  });
});

describe("getBacklogEstimates()", () => {
  const storyPointValues = [1, 2, 3, 5, 8, 13, 20];
  let backlog;
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    const { initial } = generateProductFeatures(storyPointValues);
    backlog = initial;
  });
  afterEach(() => {
    rand.mockRestore();
  });

  it("should get updated estimates of the backlog", () => {
    const team = { size: 10, estimation: 0.5 };

    rand
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8);
    const estimates = getBacklogEstimates(backlog, team, storyPointValues);

    expect(estimates).toEqual([
      { id: "G0001", estimate: 3 },
      { id: "G0002", estimate: 5 },
      { id: "G0003", estimate: 1 },
      { id: "G0004", estimate: 3 },
      { id: "G0005", estimate: 5 },
      { id: "G0006", estimate: 1 },
      { id: "G0007", estimate: 3 },
      { id: "G0008", estimate: 5 },
    ]);
  });

  it("should skip estimated items", () => {
    const team = { size: 10, estimation: 0.5 };
    backlog[0].estimate = 8;
    backlog[2].estimate = 8;
    backlog[4].estimate = 8;

    rand
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8);
    const estimates = getBacklogEstimates(backlog, team, storyPointValues);

    expect(estimates).toEqual([
      { id: "G0002", estimate: 3 },
      { id: "G0004", estimate: 5 },
      { id: "G0006", estimate: 1 },
      { id: "G0007", estimate: 3 },
      { id: "G0008", estimate: 5 },
      { id: "G0009", estimate: 1 },
      { id: "G0010", estimate: 3 },
    ]);
  });

  it("should handle no items to estimate", () => {
    const team = { size: 10, estimation: 0.5 };
    const story = new UserStory({
      id: "G0001",
      title: "title",
      feature: "user login",
      status: "TODO",
      effort: 5,
    });
    story.setEstimate(5);
    const backlog = [story];

    const estimates = getBacklogEstimates(backlog, team, storyPointValues);

    expect(estimates).toEqual([]);
  });
});
