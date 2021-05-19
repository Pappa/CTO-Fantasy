import { average } from "../utils/number";
import { range } from "./collection";
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
