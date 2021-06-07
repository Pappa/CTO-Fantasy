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
          name: "Continuous Improvement",
          value: 0,
          stats: ["qualityMindset", "agileMindset"],
        },
        CUSTOMER_ENGAGEMENT: {
          name: "Customer Engagement",
          value: 0.4,
          stats: undefined,
        },
        DAILY_SCRUM: {
          name: "Daily Scrum",
          value: 0.4,
          stats: ["agileMindset", "collaboration"],
        },
        PSYCHOLOGICAL_SAFETY: {
          name: "Psychological Safety",
          value: 0.2,
          stats: ["psychologicalSafety"],
        },
        REFINEMENT: {
          name: "Refinement",
          value: 0.4,
          stats: ["agileMindset", "collaboration"],
        },
        RETROSPECTIVE: {
          name: "Sprint Retrospective",
          value: 0.4,
          stats: ["agileMindset", "collaboration", "psychologicalSafety"],
        },
        REVIEW: {
          name: "Sprint Review",
          value: 0.4,
          stats: ["agileMindset"],
        },
        SPRINT_GOAL: {
          name: "Sprint Goal",
          value: 0,
          stats: ["agileMindset", "collaboration"],
        },
        THREE_AMIGOS: {
          name: "Three Amigos",
          value: 0,
          stats: ["qualityMindset", "agileMindset", "collaboration"],
        },
        WIP_LIMIT: {
          name: "WIP Limit",
          value: 0,
          stats: ["agileMindset", "collaboration", "flow"],
        },
      },
      QUALITY_ASSURANCE: {
        QUALITY_FIRST_APPROACH: {
          name: "Quality First Approach",
          value: 0,
          stats: ["qualityMindset"],
        },
        TEST_AUTOMATION: {
          name: "Test Automation",
          value: 0,
          stats: ["qualityMindset"],
        },
        TEST_DESIGN: {
          name: "Test Design",
          value: 0,
          stats: ["qualityMindset"],
        },
        TEST_SPECIALISATION: {
          name: "Test Specialisation",
          value: 0,
          stats: ["qualityMindset"],
        },
      },
      SOFTWARE_ENGINEERING: {
        CI_CD: {
          name: "CI/CD",
          value: 0,
          stats: ["qualityMindset", "skill"],
        },
        CLOUD_USAGE: {
          name: "Cloud Usage",
          value: 0,
          stats: ["skill"],
        },
        CODE_REVIEW: {
          name: "Code Review",
          value: 0,
          stats: ["qualityMindset", "psychologicalSafety", "collaboration"],
        },
        DEVOPS: {
          name: "Devops",
          value: 0,
          stats: ["qualityMindset", "skill", "agileMindset"],
        },
        PAIR_PROGRAMMING: {
          name: "Pair Programming",
          value: 0,
          stats: ["psychologicalSafety", "collaboration"],
        },
        SOFTWARE_DESIGN: {
          name: "Software Design",
          value: 0,
          stats: ["qualityMindset", "skill"],
        },
        TECH_TALKS: {
          name: "Tech Talks",
          value: 0,
          stats: ["skill", "psychologicalSafety", "collaboration"],
        },
        UNIT_TESTING: {
          name: "Unit Testing",
          value: 0,
          stats: ["qualityMindset", "skill"],
        },
        UNIT_TEST_COVERAGE: {
          name: "Unit Test Coverage",
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

  it("should use provided values over randomly generated values", () => {
    const currentAttributes = {
      AGILE: {
        REVIEW: { value: 0.1 },
        CUSTOMER_ENGAGEMENT: { value: 0.1 },
      },
    };
    const team = new Team([new ProductOwner({ agileMindset: 0.95 })]);
    const attributes = generateProjectAttributes(team, currentAttributes);
    expect(attributes.AGILE.REVIEW.value).toEqual(0.95);
    expect(attributes.AGILE.CUSTOMER_ENGAGEMENT.value).toEqual(0.1);
  });
});
