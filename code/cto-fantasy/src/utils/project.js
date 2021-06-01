import { randomStat } from "../utils/random";

const CATEGORIES = {
  AGILE: [
    "THREE_AMIGOS",
    "REFINEMENT", // agile + collaboration?
    "DAILY_SCRUM",
    "RETROSPECTIVE",
    "REVIEW",
    "PSYCHOLOGICAL_SAFETY",
    "WIP_LIMIT",
    "SPRINT_GOAL",
    "CONTINUOUS_IMPROVEMENT",
  ],
  QUALITY_ASSURANCE: [
    "TEST_DESIGN",
    "TEST_AUTOMATION",
    "SHIFT_LEFT",
    // TEST_SPECIALISATION needs a better name,
    // referring to choosing the right kind of testing for the job
    "TEST_SPECIALISATION",
  ],
  SOFTWARE_ENGINEERING: [
    "UNIT_TESTING",
    "UNIT_TEST_COVERAGE",
    "CODE_REVIEW",
    "SOFTWARE_DESIGN",
    "PAIR_PROGRAMMING",
    "CI_CD",
    "TECH_TALKS",
    "DEVOPS",
    "CLOUD_USAGE",
  ],
};

export const generateProjectAttributes = () => {
  return Object.entries(CATEGORIES).reduce(
    (categories, [category, attributes]) => ({
      ...categories,
      [category]: attributes.reduce(
        (attributes, attribute) => ({
          ...attributes,
          [attribute]: randomStat(),
        }),
        {}
      ),
    }),
    {}
  );
};
