import { Bug, WorkItem } from "../classes/WorkItem";
import { average, sum } from "../utils/number";
import { range, shuffle } from "./collection";
import { generateWorkItemId } from "./features";
import { pick } from "./random";

export const calculateNewSprintBugs = (
  { skill, qualityMindset, collaboration },
  ratio
) => {
  const sloppiness = 1 - skill;
  const lackOfQuality = 1 - qualityMindset;
  const lackOfCollaboration = 1 - collaboration;
  const buginess = average([sloppiness, lackOfQuality, lackOfCollaboration]);
  return Math.ceil(buginess * ratio);
};

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
  team,
  distractions,
  storyPointValues
) => {
  const points = storyPointValues.filter((x) => x < 13);
  // how much work can the team do today?
  const todaysDevEffort = shuffle(team.dailyDev)
    .map(({ collaboration, effort, qualityMindset }, idx) => ({
      collaboration,
      effort: Math.max(effort - (distractions[idx] || 0), 0),
      qualityMindset,
    }))
    .filter(({ effort }) => effort > 0);

  let i = 0;
  while (
    i < 100 &&
    isThereEffortRemaining(todaysDevEffort) &&
    isThereworkToDo(backlog)
  ) {
    const items = backlog.filter(
      ({ status }) =>
        status !== WorkItem.STATUS.DONE &&
        status !== WorkItem.STATUS.NOT_VISIBLE
    );
    // select item, based on team.fow
    const item = selectNextBacklogItem(items, team);

    let hasFirstDevWorked = false;
    todaysDevEffort.forEach(
      ({ collaboration, effort, qualityMindset }, idx) => {
        if (effort > 0) {
          // 1st dev works on item
          // then other devs if their collaboration is high enough
          if (!hasFirstDevWorked || collaboration >= Math.random()) {
            item.status = WorkItem.STATUS.IN_PROGRESS;
            const remaining = item.doWork(effort);
            todaysDevEffort[idx].effort = remaining;

            if (wasBugCreated(qualityMindset)) {
              backlog.push(
                new Bug({
                  id: generateWorkItemId(WorkItem.COUNT + 1),
                  title: `Error in ${item.title}`,
                  feature: item.feature,
                  effort: pick(points),
                  story: item.type === WorkItem.TYPE.BUG ? item.story : item,
                })
              );
            }
            hasFirstDevWorked = true;
          }
        }
      }
    );
    i++;
  }

  // did the team find any of the bugs
  backlog
    .filter(
      (item) =>
        item.type === WorkItem.TYPE.BUG &&
        item.status === WorkItem.STATUS.NOT_VISIBLE
    )
    .forEach((item) => {
      if (team.qualityMindset >= Math.random()) {
        item.status = WorkItem.STATUS.TODO;
      }
    });

  return backlog;
};

const isThereworkToDo = (backlog) =>
  sum(backlog.map(({ effortRemaining }) => effortRemaining)) > 0;

const isThereEffortRemaining = (todaysDevEffort) =>
  sum(todaysDevEffort.map(({ effort }) => effort)) > 0;

const wasBugCreated = (qualityMindset) => qualityMindset < Math.random() * 0.5;

export const selectNextBacklogItem = (items, team) => {
  let idx = 0;
  while (true) {
    if (idx === items.length) {
      idx = 0;
    }
    if (team.flow >= Math.random()) {
      return items[idx];
    }
    idx++;
  }
};
