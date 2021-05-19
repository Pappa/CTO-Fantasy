export class WorkItem {
  constructor({ id, title, status, feature, effort }) {
    this.id = id;
    this.title = title;
    this.status = status || WorkItem.STATUS.NOT_CREATED;
    this.feature = feature;
    this.effort = effort;
    this.completedEffort = 0;
  }
}

WorkItem.STATUS = {
  NOT_CREATED: "NOT_CREATED",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

WorkItem.TYPE = {
  STORY: "STORY",
  BUG: "BUG",
};

export class UserStory extends WorkItem {
  type = WorkItem.TYPE.STORY;
  estimate = null;

  setEstimate(estimate) {
    this.estimate = estimate;
  }
}

export class Bug extends WorkItem {
  type = WorkItem.TYPE.BUG;
}
