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
        },
        CUSTOMER_ENGAGEMENT: {
          name: "Customer Engagement",
          value: 0.4,
        },
        DAILY_SCRUM: {
          name: "Daily Scrum",
          value: 0.5,
        },
        PSYCHOLOGICAL_SAFETY: {
          name: "Psychological Safety",
          value: 0.25,
        },
        REFINEMENT: {
          name: "Refinement",
          value: 0.5,
        },
        RETROSPECTIVE: {
          name: "Sprint Retrospective",
          value: 0.5,
        },
        REVIEW: {
          name: "Sprint Review",
          value: 0.4,
        },
        SPRINT_GOAL: {
          name: "Sprint Goal",
          value: 0,
        },
        THREE_AMIGOS: {
          name: "Three Amigos",
          value: 0,
        },
        WIP_LIMIT: {
          name: "WIP Limit",
          value: 0,
        },
      },
      QUALITY_ASSURANCE: {
        SHIFT_LEFT: {
          name: "Quality First",
          value: 0,
        },
        TEST_AUTOMATION: {
          name: "Test Automation",
          value: 0,
        },
        TEST_DESIGN: {
          name: "Test Design",
          value: 0,
        },
        TEST_SPECIALISATION: {
          name: "Test Specialisation",
          value: 0,
        },
      },
      SOFTWARE_ENGINEERING: {
        CI_CD: {
          name: "CI/CD",
          value: 0,
        },
        CLOUD_USAGE: {
          name: "Cloud Usage",
          value: 0,
        },
        CODE_REVIEW: {
          name: "Code Review",
          value: 0,
        },
        DEVOPS: {
          name: "Devops",
          value: 0,
        },
        PAIR_PROGRAMMING: {
          name: "Pair Programming",
          value: 0,
        },
        SOFTWARE_DESIGN: {
          name: "Software Design",
          value: 0,
        },
        TECH_TALKS: {
          name: "Tech Talks",
          value: 0,
        },
        UNIT_TESTING: {
          name: "Unit Testing",
          value: 0,
        },
        UNIT_TEST_COVERAGE: {
          name: "Unit Test Coverage",
          value: 0,
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
