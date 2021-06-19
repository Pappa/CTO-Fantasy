import { ProductOwner } from "../classes/Employee";
import { randomStat } from "../utils/random";
import { average } from "./number";

const CATEGORIES = {
  AGILE: {
    THREE_AMIGOS: {
      stats: ["qualityMindset", "agileMindset", "collaboration"],
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
      stats: ["agileMindset", "collaboration"],
      value: (team) => average([team.agileMindset, team.collaboration]),
    },
    DAILY_SCRUM: {
      stats: ["agileMindset", "collaboration"],
      value: (team) => average([team.agileMindset, team.collaboration]),
    },
    RETROSPECTIVE: {
      stats: ["agileMindset", "collaboration", "psychologicalSafety"],
      value: (team) =>
        average([
          team.agileMindset,
          team.collaboration,
          team.psychologicalSafety,
        ]),
    },
    REVIEW: {
      stats: ["agileMindset"],
      value: (team) => {
        const po =
          team.members.find((member) => member instanceof ProductOwner) || {};
        return average([po.agileMindset || 0, team.agileMindset]);
      },
    },
    PSYCHOLOGICAL_SAFETY: {
      stats: ["psychologicalSafety"],
      value: (team) =>
        team.discoveries.includes("PSYCHOLOGICAL_SAFETY")
          ? team.psychologicalSafety
          : team.psychologicalSafety / 2,
    },
    WIP_LIMIT: {
      stats: ["agileMindset", "collaboration", "flow"],
      value: (team) =>
        team.discoveries.includes("WIP_LIMIT")
          ? average([team.agileMindset, team.collaboration, team.flow])
          : 0,
    },
    SPRINT_GOAL: {
      stats: ["agileMindset", "collaboration"],
      value: (team) =>
        team.discoveries.includes("SPRINT_GOAL")
          ? average([team.agileMindset, team.collaboration])
          : 0,
    },
    CONTINUOUS_IMPROVEMENT: {
      stats: ["agileMindset", "qualityMindset"],
      value: (team) =>
        team.discoveries.includes("CONTINUOUS_IMPROVEMENT")
          ? average([team.qualityMindset, team.agileMindset])
          : 0,
    },
    CUSTOMER_ENGAGEMENT: {
      stats: ["agileMindset"],
      // TODO: add in customer satisfaction here
      value: (team) => average([team.agileMindset]),
    },
  },
  QUALITY_ASSURANCE: {
    TEST_DESIGN: {
      stats: ["qualityMindset"],
      value: (team) =>
        team.discoveries.includes("TEST_DESIGN")
          ? average(team.testers.map(({ qualityMindset }) => qualityMindset)) ||
            team.qualityMindset / 2
          : 0,
    },
    TEST_AUTOMATION: {
      stats: ["qualityMindset"],
      value: (team) =>
        team.discoveries.includes("TEST_AUTOMATION")
          ? average(team.testers.map(({ qualityMindset }) => qualityMindset)) ||
            team.qualityMindset / 2
          : 0,
    },
    QUALITY_FIRST_APPROACH: {
      stats: ["qualityMindset"],
      value: (team) =>
        team.discoveries.includes("QUALITY_FIRST_APPROACH")
          ? average(team.testers.map(({ qualityMindset }) => qualityMindset)) ||
            team.qualityMindset / 2
          : 0,
    },
    // TEST_SPECIALISATION needs a better name,
    // referring to choosing the right kind of testing for the job
    TEST_SPECIALISATION: {
      stats: ["qualityMindset"],
      value: (team) =>
        team.discoveries.includes("TEST_SPECIALISATION")
          ? average(team.testers.map(({ qualityMindset }) => qualityMindset)) ||
            team.qualityMindset / 2
          : 0,
    },
  },
  SOFTWARE_ENGINEERING: {
    UNIT_TESTING: {
      stats: ["qualityMindset", "skill"],
      value: (team) =>
        team.discoveries.includes("UNIT_TESTING")
          ? average([team.qualityMindset, team.skill, team.experience])
          : 0,
    },
    UNIT_TEST_COVERAGE: {
      stats: ["qualityMindset", "skill"],
      value: (team) =>
        team.discoveries.includes("UNIT_TEST_COVERAGE")
          ? average([team.qualityMindset, team.skill, team.experience])
          : 0,
    },
    CODE_REVIEW: {
      stats: ["qualityMindset", "psychologicalSafety", "collaboration"],
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
      stats: ["qualityMindset", "skill"],
      value: (team) =>
        team.discoveries.includes("SOFTWARE_DESIGN")
          ? average([team.qualityMindset, team.skill, team.experience])
          : 0,
    },
    PAIR_PROGRAMMING: {
      stats: ["psychologicalSafety", "collaboration"],
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
      stats: ["qualityMindset", "skill"],
      value: (team) =>
        team.discoveries.includes("CI_CD")
          ? average([team.qualityMindset, team.skill])
          : 0,
    },
    TECH_TALKS: {
      stats: ["skill", "psychologicalSafety", "collaboration"],
      value: (team) =>
        team.discoveries.includes("TECH_TALKS")
          ? average([
              team.skill,
              team.experience,
              team.psychologicalSafety,
              team.collaboration,
            ])
          : 0,
    },
    DEVOPS: {
      stats: ["qualityMindset", "skill", "agileMindset"],
      value: (team) =>
        team.discoveries.includes("DEVOPS")
          ? average([team.qualityMindset, team.skill, team.agileMindset])
          : 0,
    },
    CLOUD_SERVICES: {
      stats: ["skill"],
      value: (team) =>
        team.discoveries.includes("CLOUD_SERVICES")
          ? average([team.skill, team.experience])
          : 0,
    },
  },
};

export const PROJECT_ATTRIBUTES_TEXT = {
  THREE_AMIGOS: {
    name: "Three Amigos",
    description:
      "The 3 Amigos is an efficient technique used to super-charge the process of refining user stories and bugs. During a 3 Amigos, a handful of the team will drive out and document assumptions, clarify meaning and define acceptance criteria.",
  },
  REFINEMENT: {
    name: "Refinement",
    description:
      "Product Backlog refinement is the act of breaking down and improving Product Backlog items into smaller more precise items. This is an ongoing activity to add details, such as a description, technical information or acceptance criteria.",
  },
  DAILY_SCRUM: {
    name: "Daily Scrum",
    description:
      "The Daily Scrum is a planning meeting for the team to inspect their progress toward the Sprint Goal and adapt, producing an actionable plan for the next day of work. It is often, incorrectly, used as a status update.",
  },
  RETROSPECTIVE: {
    name: "Sprint Retrospective",
    description:
      "The purpose of the Retrospective is to identify and plan ways to increase quality and effectiveness. It happens at the end of every sprint and is one of the ways a Scrum team uses inspection and adaption to improve over time.",
  },
  REVIEW: {
    name: "Sprint Review",
    description: "Sprint Review is a.....",
  },
  PSYCHOLOGICAL_SAFETY: {
    name: "Psychological Safety",
    description: "Psychological Safety is a.....",
  },
  WIP_LIMIT: {
    name: "WIP Limit",
    description: "WIP Limit is a.....",
  },
  SPRINT_GOAL: {
    name: "Sprint Goal",
    description: "Sprint Goal is a.....",
  },
  CONTINUOUS_IMPROVEMENT: {
    name: "Continuous Improvement",
    description: "Continuous Improvement is a.....",
  },
  CUSTOMER_ENGAGEMENT: {
    name: "Customer Engagement",
    description: "Customer Engagement is a.....",
  },
  TEST_DESIGN: {
    name: "Test Design",
    description: "Test Design is a.....",
  },
  TEST_AUTOMATION: {
    name: "Test Automation",
    description: "Test Automation is a.....",
  },
  QUALITY_FIRST_APPROACH: {
    name: "Quality First Approach",
    description: "Quality First Approach is a.....",
  },
  TEST_SPECIALISATION: {
    name: "Test Specialisation",
    description: "Test Specialisation is a.....",
  },
  UNIT_TESTING: {
    name: "Unit Testing",
    description: "Unit Testing is a.....",
  },
  UNIT_TEST_COVERAGE: {
    name: "Unit Test Coverage",
    description: "Unit Test Coverage is a.....",
  },
  CODE_REVIEW: {
    name: "Code Review",
    description: "Code Review is a.....",
  },
  SOFTWARE_DESIGN: {
    name: "Software Design",
    description: "Software Design is a.....",
  },
  PAIR_PROGRAMMING: {
    name: "Pair Programming",
    description: "Pair Programming is a.....",
  },
  CI_CD: {
    name: "CI/CD",
    description: "CI/CD is a.....",
  },
  TECH_TALKS: {
    name: "Tech Talks",
    description: "Tech Talks is a.....",
  },
  DEVOPS: {
    name: "Devops",
    description: "Devops is a.....",
  },
  CLOUD_SERVICES: {
    name: "Cloud Services",
    description: "Cloud Services is a.....",
  },
};

export const generateProjectAttributes = (team, currentAttributes = {}) => {
  return Object.entries(CATEGORIES).reduce(
    (categories, [category, attributes]) => ({
      ...categories,
      [category]: Object.entries(attributes).reduce(
        (attributes, [attribute, { stats, value }]) => {
          const currentStat =
            currentAttributes?.[category]?.[attribute]?.["value"];
          let stat = value(team);
          stat = stat === undefined ? stat : Math.round(stat * 100) / 100;
          return {
            ...attributes,
            [attribute]: {
              stats,
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
