export class WorkItem {
  constructor({ id, title, status }) {
    this.id = id;
    this.title = title;
    this.status = status || WorkItem.STATUS.NOT_CREATED;
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
