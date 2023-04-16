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
      stats: ["agileMindset", "estimation"],
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
    TEST_STRATEGY: {
      stats: ["qualityMindset"],
      value: (team) =>
        team.discoveries.includes("TEST_STRATEGY")
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
      "3 Amigos is a technique used to super-charge the process of refining user stories and bugs.\n\nDuring a 3 Amigos, a handful of the team will drive out and document assumptions, clarify meaning and define acceptance criteria.",
  },
  REFINEMENT: {
    name: "Refinement",
    description:
      "Product Backlog refinement is the act of breaking down and improving Product Backlog items into smaller more precise items.\n\nThis is an ongoing activity to add details, such as a description, technical information or acceptance criteria.",
  },
  DAILY_SCRUM: {
    name: "Daily Scrum",
    description:
      "The Daily Scrum is a planning meeting for the team to inspect their progress toward the Sprint Goal and adapt, producing an actionable plan for the next day of work.\n\nIt is often, incorrectly, used as a status update.",
  },
  RETROSPECTIVE: {
    name: "Sprint Retrospective",
    description:
      "The purpose of the Retrospective is to identify and plan ways to increase quality and effectiveness.\n\nIt happens at the end of every sprint and is one of the ways a Scrum team uses inspection and adaption to improve over time.",
  },
  REVIEW: {
    name: "Sprint Review",
    description:
      "The purpose of the Sprint Review is to inspect the outcome of the Sprint and determine future adaptations.\n\nThe Scrum Team presents the results of their work to key stakeholders and progress toward the Product Goal is discussed.",
  },
  PSYCHOLOGICAL_SAFETY: {
    name: "Psychological Safety",
    description:
      "Psychological safety is the freedom to speak up with ideas, questions, concerns, or mistakes, without fear of negative consequences of self-image, status or career.\n\nIt's a vital component of high-performance teams.",
  },
  WIP_LIMIT: {
    name: "WIP Limit",
    description:
      "Work in Progress Limit is a contraint teams use to limit the total amount of work in play at any given time.\n\nWIP limits reduce context switching and complexity, encourage collaboration and help the team focus on their priorities.",
  },
  SPRINT_GOAL: {
    name: "Sprint Goal",
    description:
      "In Scrum, the Sprint Goal is the objective for the Sprint.\n\nThe Sprint Goal encourages the team to work together rather than on separate initiatives.",
  },
  CONTINUOUS_IMPROVEMENT: {
    name: "Continuous Improvement",
    description:
      "Continuous Improvement is an idea that's been present in manufacturing for 100 years.\n\nIt's an apprach to improve every process and practice by focusing on enhancing activities that generate value while removing activities that generate waste.",
  },
  CUSTOMER_ENGAGEMENT: {
    name: "Customer Engagement",
    description:
      "Agile relies on good Customer Engagement.\n\nTo know whether a team are meeting the customer's needs, they need to foster close collaboration with and engaged and responsive customer.",
  },
  TEST_DESIGN: {
    name: "Test Design",
    description:
      "There are an infinite number of test scenarios, but only a small subset of these will provide real value.\n\nTest design aims to identify valuable test and the conditions under which they should be run.",
  },
  TEST_AUTOMATION: {
    name: "Test Automation",
    description:
      "Test Automation is the practice of running tests against software automatically, with expected, reproducible outcomes.\n\nIt is typically used with CI/CD build pipelines to verify all changes made to software.",
  },
  QUALITY_FIRST_APPROACH: {
    name: "Quality First Approach",
    description:
      "Also known as 'Shift Left` testing, this approach moves quality assurancy further back in the  or feature lifecycle, to address quality at every stage from requirements to end product.",
  },
  TEST_STRATEGY: {
    name: "Test Strategy",
    description:
      "A Test Strategy should identify at a high level which forms of testing are required for a software product, and what amount of coverage and granularity are required for each kind of testing.",
  },
  UNIT_TESTING: {
    name: "Unit Testing",
    description:
      "Unit Tests validate that individual functions or modules function correctly in isolation.\n\nIn Test Driven Development, they are be written before the application code.\n\nUnit tests are usually run automatically in build/deploy pipelines.",
  },
  UNIT_TEST_COVERAGE: {
    name: "Test Coverage",
    description:
      "Test Coverage is a measure of the ammount of application code that is executed when a test suite runs.\n\nIt can help indicate the probability that application code contains undetected bugs.",
  },
  CODE_REVIEW: {
    name: "Code Review",
    description:
      "Code Review is a quality assurance practice where other programmers check an application change by reading and commenting on the changes to its source code, typically viewing a source code 'diff' or delta.",
  },
  SOFTWARE_DESIGN: {
    name: "Software Design",
    description:
      "Software Design the process of creating a model or abstraction of a (proposed or existing) software system to aid understanding of problems and solutions.",
  },
  PAIR_PROGRAMMING: {
    name: "Pair Programming",
    description:
      "Pair Programming involves 2 programmers working closely together on a problem.\n\nStudies have shown that pairing produces higher quality code and is usually more efficient.",
  },
  CI_CD: {
    name: "CI/CD",
    description:
      "Continuous integration is the process of merging from a shared code repository frequently.\n\nContinuous deployment is the process of safely deploying software frequently by the use of automated build, test and deployment pipelines.",
  },
  TECH_TALKS: {
    name: "Tech Talks",
    description:
      "Tech Talks are a common learning apprach within software development teams, enabling the sharing of knowledge and spread of good practice and new ideas.",
  },
  DEVOPS: {
    name: "DevOps",
    description:
      "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops).\n\nIt typically includes  the creation and management of CI/CD pipelines, and the use of infrastructure as code.",
  },
  CLOUD_SERVICES: {
    name: "Cloud Services",
    description:
      "Cloud Services such as AWS, Google Cloud and Azure offer immediately available on-demand compute and storage services.\n\nUsing Cloud Services minimises IT infrastructure costs by removing the need to buy, provision and maintain hardware and software.",
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
