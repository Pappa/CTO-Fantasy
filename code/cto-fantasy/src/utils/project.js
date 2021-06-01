import { ProductOwner, Tester } from "../classes/Employee";
import { randomStat } from "../utils/random";
import { average } from "./number";

const CATEGORIES = {
  AGILE: {
    THREE_AMIGOS: (team) =>
      team.discoveries.includes("THREE_AMIGOS")
        ? average([team.qualityMindset, team.agileMindset, team.collaboration])
        : 0,
    REFINEMENT: (team) => average([team.agileMindset, team.collaboration]),
    DAILY_SCRUM: (team) => average([team.agileMindset, team.collaboration]),
    RETROSPECTIVE: (team) =>
      average([
        team.agileMindset,
        team.collaboration,
        team.psychologicalSafety,
      ]),
    REVIEW: (team) => {
      const po =
        team.members.find((member) => member instanceof ProductOwner) || {};
      return po.agileMindset;
    },
    PSYCHOLOGICAL_SAFETY: (team) =>
      team.discoveries.includes("PSYCHOLOGICAL_SAFETY")
        ? team.psychologicalSafety
        : team.psychologicalSafety / 2,
    WIP_LIMIT: (team) =>
      team.discoveries.includes("WIP_LIMIT")
        ? average([team.agileMindset, team.collaboration, team.flow])
        : 0,
    SPRINT_GOAL: (team) =>
      team.discoveries.includes("SPRINT_GOAL")
        ? average([team.agileMindset, team.collaboration])
        : 0,
    CONTINUOUS_IMPROVEMENT: (team) =>
      team.discoveries.includes("CONTINUOUS_IMPROVEMENT")
        ? average([team.qualityMindset, team.agileMindset])
        : 0,
  },
  QUALITY_ASSURANCE: {
    TEST_DESIGN: (team) =>
      team.discoveries.includes("TEST_DESIGN")
        ? average(
            team.members
              .filter((member) => member instanceof Tester)
              .map(({ qualityMindset }) => qualityMindset)
          ) || team.qualityMindset / 2
        : 0,
    TEST_AUTOMATION: (team) =>
      team.discoveries.includes("TEST_AUTOMATION")
        ? average(
            team.members
              .filter((member) => member instanceof Tester)
              .map(({ qualityMindset }) => qualityMindset)
          ) || team.qualityMindset / 2
        : 0,
    SHIFT_LEFT: (team) =>
      team.discoveries.includes("SHIFT_LEFT")
        ? average(
            team.members
              .filter((member) => member instanceof Tester)
              .map(({ qualityMindset }) => qualityMindset)
          ) || team.qualityMindset / 2
        : 0,
    // TEST_SPECIALISATION needs a better name,
    // referring to choosing the right kind of testing for the job
    TEST_SPECIALISATION: (team) =>
      team.discoveries.includes("TEST_SPECIALISATION")
        ? average(
            team.members
              .filter((member) => member instanceof Tester)
              .map(({ qualityMindset }) => qualityMindset)
          ) || team.qualityMindset / 2
        : 0,
  },
  // TODO: complete these functions
  SOFTWARE_ENGINEERING: {
    UNIT_TESTING: (team) =>
      team.discoveries.includes("UNIT_TESTING")
        ? average([team.qualityMindset, team.skill, team.experience])
        : 0,
    UNIT_TEST_COVERAGE: (team) =>
      team.discoveries.includes("UNIT_TEST_COVERAGE")
        ? average([team.qualityMindset, team.skill, team.experience])
        : 0,
    CODE_REVIEW: (team) =>
      team.discoveries.includes("CODE_REVIEW")
        ? average([
            team.qualityMindset,
            team.psychologicalSafety,
            team.collaboration,
          ])
        : 0,
    SOFTWARE_DESIGN: (team) =>
      team.discoveries.includes("SOFTWARE_DESIGN")
        ? average([team.qualityMindset, team.skill, team.experience])
        : 0,
    PAIR_PROGRAMMING: (team) =>
      team.discoveries.includes("PAIR_PROGRAMMING")
        ? average([
            team.experience,
            team.psychologicalSafety,
            team.collaboration,
          ])
        : 0,
    CI_CD: (team) =>
      team.discoveries.includes("CI_CD")
        ? average([team.qualityMindset, team.skill])
        : 0,
    TECH_TALKS: (team) =>
      team.discoveries.includes("TECH_TALKS")
        ? average([
            team.experience,
            team.psychologicalSafety,
            team.collaboration,
          ])
        : 0,
    DEVOPS: (team) =>
      team.discoveries.includes("DEVOPS")
        ? average([team.qualityMindset, team.skill, team.agileMindset])
        : 0,
    CLOUD_USAGE: (team) =>
      team.discoveries.includes("CLOUD_USAGE")
        ? average([team.skill, team.experience])
        : 0,
  },
};

export const generateProjectAttributes = (team) => {
  return Object.entries(CATEGORIES).reduce(
    (categories, [category, attributes]) => ({
      ...categories,
      [category]: Object.entries(attributes).reduce(
        (attributes, [attribute, generate]) => {
          const stat = generate(team);
          return {
            ...attributes,
            [attribute]: stat !== undefined ? stat : randomStat(),
          };
        },
        {}
      ),
    }),
    {}
  );
};
