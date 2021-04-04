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
