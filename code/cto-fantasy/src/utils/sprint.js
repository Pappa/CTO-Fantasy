import { average } from "../utils/number";

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
