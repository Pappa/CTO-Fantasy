import { UserStory } from "../classes/WorkItem";
import { partition } from "./collection";
import { average } from "./number";

export const getSoftwareDevelopmentPracticeResults = (team, attributes) => {
  const attributeResults = attributes.map((topic) => ({
    ...topic,
    discovered: team.hasDiscovered(topic.attribute),
  }));
  const [discovered, notDiscovered] = partition(
    ({ discovered }) => discovered,
    attributeResults
  );
  const score = average(attributes.map(({ value }) => value));

  return { attributeResults, discovered, notDiscovered, score };
};

export const getProjectSuccessResults = (backlog) => {
  const allStories = [
    ...backlog.backlog.filter((item) => item instanceof UserStory),
    ...backlog.potentialWorkItems,
  ];

  console.log(allStories.length, allStories);

  console.log(backlog);

  return {
    allStories,
    completedStories: backlog.completedStories,
    openBugs: backlog.bugs,
    unknownBugs: backlog.unknownBugs,
  };
};

export const getProjectSuccessText = (
  sprintsRemaining,
  numAllStories,
  numCompletedStories,
  numIncompleteStories,
  numOpenBugs,
  numUnknownBugs,
  satisfaction
) => {
  const lines = [];

  if (sprintsRemaining) {
    lines.push("The team finished the project early!");
  } else if (numIncompleteStories) {
    lines.push("The team didn't complete the project on time.");
  }

  if (numAllStories === numCompletedStories) {
    lines.push("All the stories in the backlog are complete.");
  } else {
    lines.push(
      `The team completed ${numCompletedStories} out of ${numAllStories} stories in the backlog.`
    );
  }

  lines.push(
    `There ${numOpenBugs === 1 ? "is" : "are"} ${numOpenBugs} bug${
      numOpenBugs === 1 ? "" : "s"
    } in the backlog, ${
      numUnknownBugs ? "but" : "and"
    } an outside consultant has analysed the codebase and estimated that there ${
      numUnknownBugs === 1 ? "is" : "are"
    } ${numUnknownBugs} undiscovered bug${numUnknownBugs === 1 ? "" : "s"}.`
  );

  lines.push(
    `The customer is ${
      satisfaction === "satisfied"
        ? "very"
        : satisfaction === "neutral"
        ? "fairly"
        : "not"
    } happy.`
  );
  return lines.join(" ");
};

export const getCustomerSatisfaction = (
  numIncompleteStories,
  numOpenBugs,
  numUnknownBugs
) =>
  numIncompleteStories === 0 && numOpenBugs <= 5 && numUnknownBugs <= 5
    ? "satisfied"
    : numOpenBugs <= 10 && numUnknownBugs <= 10
    ? "neutral"
    : "dissatisfied";

export const getSoftwareDevelopmentPracticesText = (
  attributes,
  discovered,
  score
) => {
  return `The team discovered ${discovered.length} out of ${
    attributes.length
  } software development practices, and scored ${Math.round(
    score * 100
  )}% overall in their knowledge of good software development practices.`;
};
