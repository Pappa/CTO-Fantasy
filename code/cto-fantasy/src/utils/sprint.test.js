import { calculateNewSprintBugs } from "./sprint";

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
