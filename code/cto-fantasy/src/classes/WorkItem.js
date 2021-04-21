export class WorkItem {
  estimate = 0;
  constructor({ id, title, status, feature }) {
    this.id = id;
    this.title = title;
    this.status = status || WorkItem.STATUS.NOT_CREATED;
    this.feature = feature;
  }
}

WorkItem.STATUS = {
  NOT_CREATED: "NOT_CREATED",
  TODO: "TODO",
};

WorkItem.TYPE = {
  STORY: "STORY",
  BUG: "BUG",
};

export class UserStory extends WorkItem {
  type = WorkItem.TYPE.STORY;
  estimate = null;
}

export class Bug extends WorkItem {
  type = WorkItem.TYPE.BUG;
}
