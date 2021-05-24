import { Project } from "./Project";
import { Bug, UserStory, WorkItem } from "../classes/WorkItem";
import { range } from "../utils/collection";

describe("Project", () => {
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

  it("should return the default project", () => {
    const project = new Project({ emitter });
    expect(project).toMatchObject({
      name: "Project Genesis",
      storyPointValues: [1, 2, 3, 5, 8, 13, 20],
      newStoriesPerSprint: 4,
      budget: 75000,
      emitter,
    });
  });

  it("should create a backlog and list of potential work items", () => {
    const project = new Project({ emitter, featureGenerator });

    expect(project.backlog).toBe(initial);
    expect(project.potentialWorkItems).toBe(rest);
  });

  it("should return the correct values for getters", () => {
    const project = new Project({ emitter, featureGenerator });

    expect(project.productBacklog.length).toBe(4);
    expect(project.completedItems.length).toBe(0);
    expect(project.stories.length).toBe(4);
    expect(project.bugs.length).toBe(0);
  });

  it("should return the correct values for getters once items have been changed", () => {
    const project = new Project({ emitter, featureGenerator });

    project.updateBacklogOnSprintEnd(bugs);
    project.backlog.find((item) => item.id === "G1").status =
      WorkItem.STATUS.DONE;

    expect(project.productBacklog.length).toBe(4);
    expect(project.completedItems.length).toBe(1);
    expect(project.stories.length).toBe(3);
    expect(project.bugs.length).toBe(1);
  });

  it("should add more stories to the backlog", () => {
    const project = new Project({
      emitter,
      featureGenerator,
      newStoriesPerSprint: 2,
    });

    project.addMoreStoriesToBacklog();

    expect(project.productBacklog.length).toBe(6);
    expect(project.completedItems.length).toBe(0);
    expect(project.stories.length).toBe(6);
    expect(project.bugs.length).toBe(0);
  });
});
