import { randomStat } from "../utils/random";

// TEST_CATEGORISATION needs a better name,
// referring to choosing the right kind of testing for the job
const CATEGORIES = {
  AGILE: [
    "THREE_AMIGOS",
    "REFINEMENT",
    "DAILY_SCRUM",
    "RETROSPECTIVE",
    "PSYCHOLOGICAL_SAFETY",
  ],
  QUALITY_ASSURANCE: [
    "TEST_DESIGN",
    "TEST_AUTOMATION",
    "SHIFT_LEFT",
    "TEST_CATEGORISATION",
  ],
  SOFTWARE_ENGINEERING: [
    "UNIT_TESTING",
    "UNIT_TEST_COVERAGE",
    "CODE_REVIEW",
    "SOFTWARE_DESIGN",
    "PAIR_PROGRAMMING",
    "CI_CD",
    "TECH_TALKS",
  ],
};

export const generateProjectAttributes = (category) => {
  return (CATEGORIES[category] || []).reduce(
    (attributes, attribute) => ({ ...attributes, [attribute]: randomStat() }),
    {}
  );
};
