export class WorkItem {
  constructor({ id, title, status, feature, effort }) {
    WorkItem.COUNT++;
    this.id = id;
    this.title = title;
    this.status = status || WorkItem.STATUS.NOT_VISIBLE;
    this.feature = feature;
    this.effort = effort;
    this.effortRemaining = effort;
  }

  doWork(effort) {
    if (effort >= this.effortRemaining) {
      const leftover = effort - this.effortRemaining;
      this.effortRemaining = 0;
      this.status = WorkItem.STATUS.DONE;
      return leftover;
    } else {
      this.effortRemaining -= effort;
      return 0;
    }
  }

  addEffort(effort) {
    this.effortRemaining += effort;
  }

  done() {
    return this.status === WorkItem.STATUS.DONE;
  }

  visible() {
    return this.status !== WorkItem.STATUS.NOT_VISIBLE;
  }
}

WorkItem.STATUS = {
  NOT_VISIBLE: "NOT_VISIBLE",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

WorkItem.TYPE = {
  STORY: "STORY",
  BUG: "BUG",
};

WorkItem.COUNT = 0;

export class UserStory extends WorkItem {
  type = WorkItem.TYPE.STORY;
  estimate = null;

  setEstimate(estimate) {
    this.estimate = estimate;
  }
}

export class Bug extends WorkItem {
  type = WorkItem.TYPE.BUG;
  story;
  constructor({ id, title, status, feature, effort, story }) {
    super({ id, title, status, feature, effort });
    this.story = story;
  }
}
