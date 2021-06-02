import { generateProjectAttributes } from "./project";
import averageTeam from "../presets/team/average.json";
import { createTeamFromPresets } from "../utils/team";
import { Team } from "../classes/Team";
import { ProductOwner } from "../classes/Employee";

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
        DAILY_SCRUM: 0.5,
        PSYCHOLOGICAL_SAFETY: 0.25,
        REFINEMENT: 0.5,
        REVIEW: 0.4,
        RETROSPECTIVE: 0.5,
        THREE_AMIGOS: 0,
        WIP_LIMIT: 0,
        SPRINT_GOAL: 0,
        CONTINUOUS_IMPROVEMENT: 0,
        CUSTOMER_ENGAGEMENT: 0.4,
      },
      QUALITY_ASSURANCE: {
        SHIFT_LEFT: 0,
        TEST_AUTOMATION: 0,
        TEST_SPECIALISATION: 0,
        TEST_DESIGN: 0,
      },
      SOFTWARE_ENGINEERING: {
        CI_CD: 0,
        CODE_REVIEW: 0,
        PAIR_PROGRAMMING: 0,
        SOFTWARE_DESIGN: 0,
        TECH_TALKS: 0,
        UNIT_TESTING: 0,
        UNIT_TEST_COVERAGE: 0,
        DEVOPS: 0,
        CLOUD_USAGE: 0,
      },
    };
    const team = createTeamFromPresets(averageTeam);
    expect(generateProjectAttributes(team)).toEqual(expected);
  });

  it("should set review based on PO's agile mindset", () => {
    const team = new Team([new ProductOwner({ agileMindset: 0.95 })]);
    const attributes = generateProjectAttributes(team);
    expect(attributes.AGILE.REVIEW).toEqual(0.95);
  });

  it("should use provided values over randomly generated values", () => {
    const currentAttributes = {
      AGILE: {
        REVIEW: 0.1,
        CUSTOMER_ENGAGEMENT: 0.1,
      },
    };
    const team = new Team([new ProductOwner({ agileMindset: 0.95 })]);
    const attributes = generateProjectAttributes(team, currentAttributes);
    expect(attributes.AGILE.REVIEW).toEqual(0.95);
    expect(attributes.AGILE.CUSTOMER_ENGAGEMENT).toEqual(0.1);
  });
});
