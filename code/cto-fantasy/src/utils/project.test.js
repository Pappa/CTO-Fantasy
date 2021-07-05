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
        CONTINUOUS_IMPROVEMENT: {
          value: 0,
          stats: ["agileMindset", "qualityMindset"],
        },
        CUSTOMER_ENGAGEMENT: {
          value: 0.4,
          stats: ["agileMindset"],
        },
        DAILY_SCRUM: {
          value: 0.4,
          stats: ["agileMindset", "collaboration"],
        },
        PSYCHOLOGICAL_SAFETY: {
          value: 0.2,
          stats: ["psychologicalSafety"],
        },
        REFINEMENT: {
          value: 0.4,
          stats: ["agileMindset", "estimation"],
        },
        RETROSPECTIVE: {
          value: 0.4,
          stats: ["agileMindset", "collaboration", "psychologicalSafety"],
        },
        REVIEW: {
          value: 0.2,
          stats: ["agileMindset"],
        },
        SPRINT_GOAL: {
          value: 0,
          stats: ["agileMindset", "collaboration"],
        },
        THREE_AMIGOS: {
          value: 0,
          stats: ["qualityMindset", "agileMindset", "collaboration"],
        },
        WIP_LIMIT: {
          value: 0,
          stats: ["agileMindset", "collaboration", "flow"],
        },
      },
      QUALITY_ASSURANCE: {
        QUALITY_FIRST_APPROACH: {
          value: 0,
          stats: ["qualityMindset"],
        },
        TEST_AUTOMATION: {
          value: 0,
          stats: ["qualityMindset"],
        },
        TEST_DESIGN: {
          value: 0,
          stats: ["qualityMindset"],
        },
        TEST_SPECIALISATION: {
          value: 0,
          stats: ["qualityMindset"],
        },
      },
      SOFTWARE_ENGINEERING: {
        CI_CD: {
          value: 0,
          stats: ["qualityMindset", "skill"],
        },
        CLOUD_SERVICES: {
          value: 0,
          stats: ["skill"],
        },
        CODE_REVIEW: {
          value: 0,
          stats: ["qualityMindset", "psychologicalSafety", "collaboration"],
        },
        DEVOPS: {
          value: 0,
          stats: ["qualityMindset", "skill", "agileMindset"],
        },
        PAIR_PROGRAMMING: {
          value: 0,
          stats: ["psychologicalSafety", "collaboration"],
        },
        SOFTWARE_DESIGN: {
          value: 0,
          stats: ["qualityMindset", "skill"],
        },
        TECH_TALKS: {
          value: 0,
          stats: ["skill", "psychologicalSafety", "collaboration"],
        },
        UNIT_TESTING: {
          value: 0,
          stats: ["qualityMindset", "skill"],
        },
        UNIT_TEST_COVERAGE: {
          value: 0,
          stats: ["qualityMindset", "skill"],
        },
      },
    };
    const team = createTeamFromPresets(averageTeam);
    expect(generateProjectAttributes(team)).toEqual(expected);
  });

  it("should set review based on PO's agile mindset", () => {
    const team = new Team([new ProductOwner({ agileMindset: 0.95 })]);
    const attributes = generateProjectAttributes(team);
    expect(attributes.AGILE.REVIEW.value).toEqual(0.95);
  });
});
