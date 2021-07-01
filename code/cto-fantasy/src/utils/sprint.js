import { Bug, UserStory, WorkItem } from "../classes/WorkItem";
import { partition, range, shuffle, unique } from "./collection";
import { generateFirefightingIncident } from "./features";
import { pick } from "./random";

export const calculateBacklogCapacityRow = (estimates, velocity) => {
  const cumulative = estimates.reduce(
    (acc, v, i) => [...acc, (v || 0) + (acc[i - 1] || 0)],
    []
  );
  const idx = cumulative.findIndex((v, idx, arr) => {
    const next = arr[idx + 1];
    if (arr.length === idx + 1) {
      return v <= velocity;
    }
    return v <= velocity && velocity < next;
  });
  return idx + 1;
};

export const getNumberOfStoriesToEstimate = (team, attributes) => {
  const MULTIPICLATION_FACTOR = 5;
  const refinement =
    team.size * attributes.AGILE.REFINEMENT.value * MULTIPICLATION_FACTOR +
    pick(range(-2, 2));
  return Math.round(refinement);
};

export const getBacklogEstimates = (
  backlog,
  team,
  storyPointValues,
  itemsToRefine
) => {
  // TODO: Allow the team to estimate 13 and 20
  // Add functionality later to teach about breaking stories down
  // and teach about stories being too big to do in a sprint
  const points = storyPointValues.filter((x) => x < 13);
  const estimates = backlog
    .filter((item) => item instanceof UserStory)
    .filter(({ estimate }) => !estimate)
    .slice(0, itemsToRefine)
    .map(({ id, effort }) => ({
      id,
      estimate: calculateEstimate(effort, team.estimation, points),
    }));
  return estimates;
};

const calculateEstimate = (effort, estimation, storyPointValues) => {
  const maxIdx = storyPointValues.length - 1;
  const shiftByRange =
    estimation >= 0.75
      ? range(-1, 1)
      : estimation >= 0.5
      ? range(-2, 2)
      : range(-3, 3);
  const shiftBy = pick(shiftByRange);
  let idx = storyPointValues.indexOf(effort) + shiftBy;
  idx = Math.min(Math.max(idx, 0), maxIdx);
  return storyPointValues[idx];
};

export const workOnSprintBacklogItems = (
  backlog,
  bugs,
  team,
  distractions,
  storyPointValues
) => {
  const points = storyPointValues.filter((x) => x < 13);
  // how much work can the team do today?
  let todaysCapability = getTodaysCapability(team.dailyEffort, distractions);

  let i = 0;
  while (
    i < 100 &&
    isThereEffortRemaining(todaysCapability) &&
    isThereWorkToDo(backlog)
  ) {
    const items = backlog.filter((item) => !item.done() && item.visible());
    // select item, based on team.fow
    const item = selectNextBacklogItem(items, team.flow);

    let hasFirstDevWorked = false;
    todaysCapability = todaysCapability.filter(({ effort }) => effort > 0);

    todaysCapability.forEach(
      ({ collaboration, effort, qualityMindset }, idx, self) => {
        // 1st dev works on item
        // then other devs if their collaboration is high enough
        if (
          item &&
          !item.done() &&
          (!hasFirstDevWorked || collaboration >= Math.random())
        ) {
          item.status = WorkItem.STATUS.IN_PROGRESS;
          const remaining = item.doWork(effort);
          self[idx].effort = remaining;

          if (isCodeBuggy(qualityMindset)) {
            if (item instanceof Bug) {
              // add more effort to existing bug
              item.addEffort(pick(points.slice(0, 3)));
            } else {
              const bug = createBugOnStory(item, pick(points));
              backlog.push(bug);
              bugs.push(bug);
            }
          }
          hasFirstDevWorked = true;
        }
      }
    );
    i++;
  }

  // did the team find any of the bugs
  findBugs(backlog, team.qualityMindset);

  return { backlog, bugs };
};

export const getTodaysCapability = (dailyEffort, distractions) =>
  shuffle(dailyEffort)
    .map(({ collaboration, effort, qualityMindset }, idx) => ({
      collaboration,
      effort: Math.max(effort - (distractions[idx] || 0), 0),
      qualityMindset,
    }))
    .filter(({ effort }) => effort > 0);

export const isThereWorkToDo = (backlog) =>
  backlog.some(({ effortRemaining }) => effortRemaining > 0);

export const isThereEffortRemaining = (todaysCapability) =>
  todaysCapability.some(({ effort }) => effort > 0);

const isCodeBuggy = (qualityMindset) => Math.random() / 2 > qualityMindset;

export const selectNextBacklogItem = (items, flow) =>
  items.find(() => flow >= Math.random()) || items[items.length - 1];

export const findBugs = (items, qualityMetric) =>
  items
    .filter((item) => item instanceof Bug && !item.visible())
    .forEach((item) => {
      if (qualityMetric >= Math.random()) {
        item.status = WorkItem.STATUS.TODO;
      }
    });

export const createBugOnStory = (story, effort) => {
  return new Bug({
    title: `Bug: ${story.title}`,
    feature: story.feature,
    effort,
    story,
  });
};

const getFirefightingRisk = (attr, sprintNo) => {
  // Limit the risk of firefighting at the start of the project
  return sprintNo > 9 ? attr.value : Math.max((10 - sprintNo) / 10, attr.value);
};

export const getFirefightingEvent = (attributes, sprintNo) => {
  const attr = pick(
    attributes.attributesList.filter(
      ({ stats, category }) =>
        stats.includes("qualityMindset") && category !== "AGILE"
    )
  );
  const risk = getFirefightingRisk(attr, sprintNo);
  return Math.random() * 0.66 > risk && generateFirefightingIncident();
};

export const partitionFeaturesByStoryCompletion = (stories, features) => {
  const [completed, notCompleted] = partition((item) => item.done(), stories);

  const featuresNotCompleted = unique(
    notCompleted.map(({ feature }) => feature)
  ).filter((feature) => features.includes(feature));
  const featuresCompleted = unique(completed.map(({ feature }) => feature))
    .filter((feature) => features.includes(feature))
    .filter((feature) => !featuresNotCompleted.includes(feature));

  return {
    featuresCompleted,
    featuresNotCompleted,
  };
};
