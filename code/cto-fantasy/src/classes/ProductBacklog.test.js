import { ProductBacklog } from "./ProductBacklog";
import { Bug, UserStory, WorkItem } from "../classes/WorkItem";
import { range } from "../utils/collection";

describe("ProductBacklog", () => {
  let rand;
  let initial;
  let rest;
  let bugs;
  const featureGenerator = () => ({
    initial,
    rest,
  });
  const emitter = { on: jest.fn(), emit: jest.fn() };
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);

    initial = range(1, 5).map(
      (idx) =>
        new UserStory({
          id: `G${idx}`,
          title: "title",
          feature: `feature ${idx}`,
          status: WorkItem.STATUS.TODO,
          effort: 5,
        })
    );

    rest = range(5, 9).map(
      (idx) =>
        new UserStory({
          id: `G${idx}`,
          title: "title",
          feature: `feature ${idx}`,
          effort: 5,
        })
    );

    bugs = [
      new Bug({
        id: `G11`,
        title: "title",
        feature: `feature 1`,
        effort: 5,
      }),
      new Bug({
        id: `G12`,
        title: "title",
        feature: `feature 1`,
        effort: 5,
        status: WorkItem.STATUS.TODO,
      }),
    ];
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should return the default backlog", () => {
    const backlog = new ProductBacklog({ emitter });
    expect(backlog).toMatchObject({
      storyPointValues: [1, 2, 3, 5, 8, 13, 20],
      newStoriesPerSprint: 4,
      emitter,
    });
  });

  it("should create a backlog and list of potential work items", () => {
    const backlog = new ProductBacklog({ emitter, featureGenerator });

    expect(backlog.backlog).toBe(initial);
    expect(backlog.potentialWorkItems).toBe(rest);
  });

  it("should return the correct values for getters", () => {
    const backlog = new ProductBacklog({ emitter, featureGenerator });

    expect(backlog.items.length).toBe(4);
    expect(backlog.completed.length).toBe(0);
    expect(backlog.stories.length).toBe(4);
    expect(backlog.bugs.length).toBe(0);
  });

  it("should return the correct values for getters once items have been changed", () => {
    const backlog = new ProductBacklog({ emitter, featureGenerator });

    backlog.updateBacklogOnSprintEnd({ sprintBacklog: bugs });
    backlog.backlog.find((item) => item.id === "G1").status =
      WorkItem.STATUS.DONE;

    expect(backlog.items.length).toBe(4);
    expect(backlog.completed.length).toBe(1);
    expect(backlog.stories.length).toBe(3);
    expect(backlog.bugs.length).toBe(1);
  });

  it("should add more stories to the backlog", () => {
    const backlog = new ProductBacklog({
      emitter,
      featureGenerator,
      newStoriesPerSprint: 2,
    });

    backlog.addMoreStoriesToBacklog();

    expect(backlog.items.length).toBe(6);
    expect(backlog.completed.length).toBe(0);
    expect(backlog.stories.length).toBe(6);
    expect(backlog.bugs.length).toBe(0);
  });
});
