import { Bug, WorkItem } from "../classes/WorkItem";
import { sum } from "../utils/number";
import { range, shuffle } from "./collection";
import { generateWorkItemId } from "./features";
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

export const getBacklogEstimates = (backlog, team, storyPointValues) => {
  // TODO: Allow the team to estimate 13 and 20
  // Add functionality later to teach about breaking stories down
  // and teach about stories being too big to do in a sprint
  const points = storyPointValues.filter((x) => x < 13);
  const itemsToRefine = Math.max(3, team.size + pick(range(-2, 2)));
  const estimates = backlog
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
  const todaysCapability = getTodaysCapability(team.dailyEffort, distractions);

  let i = 0;
  while (
    i < 100 &&
    isThereEffortRemaining(todaysCapability) &&
    isThereworkToDo(backlog)
  ) {
    const items = backlog.filter((item) => !item.done() && item.visible());
    // select item, based on team.fow
    const item = selectNextBacklogItem(items, team.flow);

    let hasFirstDevWorked = false;
    todaysCapability
      .filter(({ effort }) => effort > 0)
      .forEach(({ collaboration, effort, qualityMindset }, idx) => {
        // 1st dev works on item
        // then other devs if their collaboration is high enough
        if (
          item &&
          !item.done() &&
          (!hasFirstDevWorked || collaboration >= Math.random())
        ) {
          item.status = WorkItem.STATUS.IN_PROGRESS;
          const remaining = item.doWork(effort);
          todaysCapability[idx].effort = remaining;

          if (isCodeBuggy(qualityMindset)) {
            const bug = createBugOnStory(item, pick(points));
            backlog.push(bug);
            bugs.push(bug);
          }
          hasFirstDevWorked = true;
        }
      });
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

export const isThereworkToDo = (backlog) =>
  sum(backlog.map(({ effortRemaining }) => effortRemaining)) > 0;

export const isThereEffortRemaining = (todaysCapability) =>
  sum(todaysCapability.map(({ effort }) => effort)) > 0;

const isCodeBuggy = (qualityMindset) => qualityMindset < Math.random() * 0.5;

export const selectNextBacklogItem = (items, flow) =>
  items.find(() => flow >= Math.random()) || items[items.length - 1];

export const findBugs = (items, qualityMetric) =>
  items
    .filter(
      (item) =>
        item instanceof Bug && item.status === WorkItem.STATUS.NOT_VISIBLE
    )
    .forEach((item) => {
      if (qualityMetric >= Math.random()) {
        item.status = WorkItem.STATUS.TODO;
      }
    });

export const createBugOnStory = (item, effort) => {
  const story = item instanceof Bug ? item.story : item;
  return new Bug({
    id: generateWorkItemId(WorkItem.COUNT + 1),
    title: `Bug: ${story.title}`,
    feature: story.feature,
    effort,
    story,
  });
};
