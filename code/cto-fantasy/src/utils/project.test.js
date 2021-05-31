import { generateProjectAttributes } from "./project";
let rand;
beforeEach(() => {
  rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
});

afterEach(() => {
  rand.mockRestore();
});

describe("generateProjectAttributes()", () => {
  it("should return the project attribute set", () => {
    const expected = {
      AGILE: {
        DAILY_SCRUM: 0.4,
        PSYCHOLOGICAL_SAFETY: 0.4,
        REFINEMENT: 0.4,
        REVIEW: 0.4,
        RETROSPECTIVE: 0.4,
        THREE_AMIGOS: 0.4,
        WIP_LIMIT: 0.4,
        SPRINT_GOAL: 0.4,
        CONTINUOUS_IMPROVEMENT: 0.4,
      },
      QUALITY_ASSURANCE: {
        SHIFT_LEFT: 0.4,
        TEST_AUTOMATION: 0.4,
        TEST_SPECIALISATION: 0.4,
        TEST_DESIGN: 0.4,
      },
      SOFTWARE_ENGINEERING: {
        CI_CD: 0.4,
        CODE_REVIEW: 0.4,
        PAIR_PROGRAMMING: 0.4,
        SOFTWARE_DESIGN: 0.4,
        TECH_TALKS: 0.4,
        UNIT_TESTING: 0.4,
        UNIT_TEST_COVERAGE: 0.4,
        DEVOPS: 0.4,
        CLOUD_USAGE: 0.4,
      },
    };
    expect(generateProjectAttributes()).toEqual(expected);
  });
});
