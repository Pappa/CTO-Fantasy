import { calculateNewSprintBugs, calculateBacklogCapacityRow } from "./sprint";

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
