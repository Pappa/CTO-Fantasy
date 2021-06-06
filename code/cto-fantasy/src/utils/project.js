import { ProductOwner } from "../classes/Employee";
import { randomStat } from "../utils/random";
import { average } from "./number";

const CATEGORIES = {
  AGILE: {
    THREE_AMIGOS: {
      name: "Three Amigos",
      value: (team) =>
        team.discoveries.includes("THREE_AMIGOS")
          ? average([
              team.qualityMindset,
              team.agileMindset,
              team.collaboration,
            ])
          : 0,
    },
    REFINEMENT: {
      name: "Refinement",
      value: (team) => average([team.agileMindset, team.collaboration]),
    },
    DAILY_SCRUM: {
      name: "Daily Scrum",
      value: (team) => average([team.agileMindset, team.collaboration]),
    },
    RETROSPECTIVE: {
      name: "Sprint Retrospective",
      value: (team) =>
        average([
          team.agileMindset,
          team.collaboration,
          team.psychologicalSafety,
        ]),
    },
    REVIEW: {
      name: "Sprint Review",
      value: (team) => {
        const po =
          team.members.find((member) => member instanceof ProductOwner) || {};
        return po.agileMindset;
      },
    },
    PSYCHOLOGICAL_SAFETY: {
      name: "Psychological Safety",
      value: (team) =>
        team.discoveries.includes("PSYCHOLOGICAL_SAFETY")
          ? team.psychologicalSafety
          : team.psychologicalSafety / 2,
    },
    WIP_LIMIT: {
      name: "WIP Limit",
      value: (team) =>
        team.discoveries.includes("WIP_LIMIT")
          ? average([team.agileMindset, team.collaboration, team.flow])
          : 0,
    },
    SPRINT_GOAL: {
      name: "Sprint Goal",
      value: (team) =>
        team.discoveries.includes("SPRINT_GOAL")
          ? average([team.agileMindset, team.collaboration])
          : 0,
    },
    CONTINUOUS_IMPROVEMENT: {
      name: "Continuous Improvement",
      value: (team) =>
        team.discoveries.includes("CONTINUOUS_IMPROVEMENT")
          ? average([team.qualityMindset, team.agileMindset])
          : 0,
    },
    CUSTOMER_ENGAGEMENT: { name: "Customer Engagement", value: () => {} }, // customer satisfaction & agile mindset?
  },
  QUALITY_ASSURANCE: {
    TEST_DESIGN: {
      name: "Test Design",
      value: (team) =>
        team.discoveries.includes("TEST_DESIGN")
          ? average(team.testers.map(({ qualityMindset }) => qualityMindset)) ||
            team.qualityMindset / 2
          : 0,
    },
    TEST_AUTOMATION: {
      name: "Test Automation",
      value: (team) =>
        team.discoveries.includes("TEST_AUTOMATION")
          ? average(team.testers.map(({ qualityMindset }) => qualityMindset)) ||
            team.qualityMindset / 2
          : 0,
    },
    SHIFT_LEFT: {
      name: "Quality First",
      value: (team) =>
        team.discoveries.includes("SHIFT_LEFT")
          ? average(team.testers.map(({ qualityMindset }) => qualityMindset)) ||
            team.qualityMindset / 2
          : 0,
    },
    // TEST_SPECIALISATION needs a better name,
    // referring to choosing the right kind of testing for the job
    TEST_SPECIALISATION: {
      name: "Test Specialisation",
      value: (team) =>
        team.discoveries.includes("TEST_SPECIALISATION")
          ? average(team.testers.map(({ qualityMindset }) => qualityMindset)) ||
            team.qualityMindset / 2
          : 0,
    },
  },
  // TODO: complete these functions
  SOFTWARE_ENGINEERING: {
    UNIT_TESTING: {
      name: "Unit Testing",
      value: (team) =>
        team.discoveries.includes("UNIT_TESTING")
          ? average([team.qualityMindset, team.skill, team.experience])
          : 0,
    },
    UNIT_TEST_COVERAGE: {
      name: "Unit Test Coverage",
      value: (team) =>
        team.discoveries.includes("UNIT_TEST_COVERAGE")
          ? average([team.qualityMindset, team.skill, team.experience])
          : 0,
    },
    CODE_REVIEW: {
      name: "Code Review",
      value: (team) =>
        team.discoveries.includes("CODE_REVIEW")
          ? average([
              team.qualityMindset,
              team.psychologicalSafety,
              team.collaboration,
            ])
          : 0,
    },
    SOFTWARE_DESIGN: {
      name: "Software Design",
      value: (team) =>
        team.discoveries.includes("SOFTWARE_DESIGN")
          ? average([team.qualityMindset, team.skill, team.experience])
          : 0,
    },
    PAIR_PROGRAMMING: {
      name: "Pair Programming",
      value: (team) =>
        team.discoveries.includes("PAIR_PROGRAMMING")
          ? average([
              team.experience,
              team.psychologicalSafety,
              team.collaboration,
            ])
          : 0,
    },
    CI_CD: {
      name: "CI/CD",
      value: (team) =>
        team.discoveries.includes("CI_CD")
          ? average([team.qualityMindset, team.skill])
          : 0,
    },
    TECH_TALKS: {
      name: "Tech Talks",
      value: (team) =>
        team.discoveries.includes("TECH_TALKS")
          ? average([
              team.experience,
              team.psychologicalSafety,
              team.collaboration,
            ])
          : 0,
    },
    DEVOPS: {
      name: "Devops",
      value: (team) =>
        team.discoveries.includes("DEVOPS")
          ? average([team.qualityMindset, team.skill, team.agileMindset])
          : 0,
    },
    CLOUD_USAGE: {
      name: "Cloud Usage",
      value: (team) =>
        team.discoveries.includes("CLOUD_USAGE")
          ? average([team.skill, team.experience])
          : 0,
    },
  },
};

export const generateProjectAttributes = (team, currentAttributes = {}) => {
  return Object.entries(CATEGORIES).reduce(
    (categories, [category, attributes]) => ({
      ...categories,
      [category]: Object.entries(attributes).reduce(
        (attributes, [attribute, { name, value }]) => {
          const currentStat =
            currentAttributes?.[category]?.[attribute]?.["value"];
          const stat = value(team);
          return {
            ...attributes,
            [attribute]: {
              name: name,
              value: stat ?? currentStat ?? randomStat(),
            },
          };
        },
        {}
      ),
    }),
    {}
  );
};
