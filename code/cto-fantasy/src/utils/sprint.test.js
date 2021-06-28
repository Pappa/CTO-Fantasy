import {
  calculateBacklogCapacityRow,
  getBacklogEstimates,
  workOnSprintBacklogItems,
  isThereWorkToDo,
  isThereEffortRemaining,
  selectNextBacklogItem,
  getTodaysCapability,
  getNumberOfStoriesToEstimate,
} from "./sprint";
import { generateProductFeatures } from "./features";
import { Bug, UserStory, WorkItem } from "../classes/WorkItem";
import { Dev } from "../classes/Employee";
import { Team } from "../classes/Team";
import { range } from "./collection";
import { Customer } from "../classes/Customer";
import { ProjectAttributes } from "../classes/ProjectAttributes";

describe("calculateBacklogCapacityRow()", () => {
  it("should return last position when all estimates are null", () => {
    const estimates = [null, null, null, null, null];
    const velocity = 4;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(5);
  });
  it("should return last position when velocity equals total estimates", () => {
    const estimates = [1, 1, 1, null, 1];
    const velocity = 4;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(5);
  });

  it("should return last position when velocity is greater than total estimates", () => {
    const estimates = [1, 1, 1, null, 1];
    const velocity = 10;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(5);
  });

  it("should return the last position before going over the limit", () => {
    const estimates = [null, 1, 1, 1, 1];
    const velocity = 2;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(3);
  });

  it("should return the last position before going over the limit including nulls", () => {
    const estimates = [null, 1, 1, null, 1];
    const velocity = 2;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(4);
  });

  it("should return 0 if the first estimate is over", () => {
    const estimates = [100, 200, 300];
    const velocity = 2;
    expect(calculateBacklogCapacityRow(estimates, velocity)).toBe(0);
  });
});

describe("getNumberOfStoriesToEstimate()", () => {
  const emitter = { on: jest.fn(), emit: jest.fn() };
  let dev1;
  let dev2;
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    dev1 = new Dev({
      skill: 0.4,
      experience: 4,
      happiness: 0.4,
      qualityMindset: 0.4,
      collaboration: 0.4,
      flow: 0.4,
      estimation: 0.4,
      psychologicalSafety: 0.4,
    });
    dev2 = new Dev({
      skill: 0.6,
      experience: 6,
      happiness: 0.6,
      qualityMindset: 0.6,
      collaboration: 0.6,
      flow: 0.6,
      estimation: 0.6,
      psychologicalSafety: 0.6,
    });
  });
  afterEach(() => {
    rand.mockRestore();
  });

  it("few devs low rand", () => {
    rand.mockReturnValue(0.1);
    const team = new Team([dev1, dev2]);
    const customer = new Customer({ emitter, project: {} });
    const attributes = new ProjectAttributes({ emitter, team, customer });
    const result = getNumberOfStoriesToEstimate(team, attributes.attributes);
    expect(result).toEqual(3);
  });

  it("more devs low rand", () => {
    rand.mockReturnValue(0.1);
    const team = new Team([dev1, dev2, dev1, dev2, dev1, dev2]);
    const customer = new Customer({ emitter, project: {} });
    const attributes = new ProjectAttributes({ emitter, team, customer });
    const result = getNumberOfStoriesToEstimate(team, attributes.attributes);
    expect(result).toEqual(12);
  });

  it("few devs high rand", () => {
    rand.mockReturnValue(0.9);
    const team = new Team([dev1, dev2]);
    const customer = new Customer({ emitter, project: {} });
    const attributes = new ProjectAttributes({ emitter, team, customer });
    const result = getNumberOfStoriesToEstimate(team, attributes.attributes);
    expect(result).toEqual(6);
  });

  it("more devs high rand", () => {
    rand.mockReturnValue(0.9);
    const team = new Team([dev1, dev2, dev1, dev2, dev1, dev2]);
    const customer = new Customer({ emitter, project: {} });
    const attributes = new ProjectAttributes({ emitter, team, customer });
    const result = getNumberOfStoriesToEstimate(team, attributes.attributes);
    expect(result).toEqual(15);
  });
});

describe("getBacklogEstimates()", () => {
  const storyPointValues = [1, 2, 3, 5, 8, 13, 20];
  let backlog;
  let rand;
  beforeEach(() => {
    WorkItem.COUNT = 0;
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    const { initial } = generateProductFeatures(storyPointValues);
    backlog = initial;
  });
  afterEach(() => {
    rand.mockRestore();
  });

  it("should get updated estimates of the backlog", () => {
    const team = { size: 10, estimation: 0.5 };

    rand
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8);
    const estimates = getBacklogEstimates(backlog, team, storyPointValues, 8);

    expect(estimates).toEqual([
      { id: "G0001", estimate: 3 },
      { id: "G0002", estimate: 5 },
      { id: "G0003", estimate: 1 },
      { id: "G0004", estimate: 3 },
      { id: "G0005", estimate: 5 },
      { id: "G0006", estimate: 1 },
      { id: "G0007", estimate: 3 },
      { id: "G0008", estimate: 5 },
    ]);
  });

  it("should skip estimated items", () => {
    const team = { size: 10, estimation: 0.5 };
    backlog[0].estimate = 8;
    backlog[2].estimate = 8;
    backlog[4].estimate = 8;

    rand
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.8);
    const estimates = getBacklogEstimates(backlog, team, storyPointValues, 8);

    expect(estimates).toEqual([
      { id: "G0002", estimate: 3 },
      { id: "G0004", estimate: 5 },
      { id: "G0006", estimate: 1 },
      { id: "G0007", estimate: 3 },
      { id: "G0008", estimate: 5 },
      { id: "G0009", estimate: 1 },
      { id: "G0010", estimate: 3 },
      { id: "G0011", estimate: 5 },
    ]);
  });

  it("should handle no items to estimate", () => {
    const team = { size: 10, estimation: 0.5 };
    const story = new UserStory({
      title: "title",
      feature: "user login",
      status: WorkItem.STATUS.TODO,
      effort: 5,
    });
    story.setEstimate(5);
    const backlog = [story];

    const estimates = getBacklogEstimates(backlog, team, storyPointValues, 8);

    expect(estimates).toEqual([]);
  });
});

describe("workOnSprintBacklogItems()", () => {
  const dev1 = new Dev({
    skill: 0.4,
    experience: 4,
    happiness: 0.4,
    qualityMindset: 0.4,
    collaboration: 0.4,
    flow: 0.4,
    estimation: 0.4,
    psychologicalSafety: 0.4,
  });
  const dev2 = new Dev({
    skill: 0.6,
    experience: 6,
    happiness: 0.6,
    qualityMindset: 0.6,
    collaboration: 0.6,
    flow: 0.6,
    estimation: 0.6,
    psychologicalSafety: 0.6,
  });
  const team = new Team([dev1, dev2]);
  const sprintBacklog = range(1, 5).map(
    (idx) =>
      new UserStory({
        title: "title",
        feature: `feature ${idx}`,
        status: WorkItem.STATUS.TODO,
        effort: 5,
      })
  );
  const sprintBugs = range(6, 10).map(
    (idx) =>
      new Bug({
        title: "title",
        feature: `feature ${idx}`,
        status: WorkItem.STATUS.TODO,
        effort: 5,
      })
  );
  const storyPointValues = [1, 2, 3, 5, 8, 13, 20];

  it("should work on backlog with no disractions", () => {
    const distractions = [];
    const { backlog, bugs } = workOnSprintBacklogItems(
      sprintBacklog,
      sprintBugs,
      team,
      distractions,
      storyPointValues
    );
    expect(backlog).toBe(sprintBacklog);
    expect(bugs).toBe(sprintBugs);
    // TODO: decide what to test here
    // the function need to be broken up more
    // and Math.random() mocked with different
    // results on multiple calls.
  });
});

describe("isThereWorkToDo()", () => {
  const itemsWithEffort = range(5).map(
    (idx) =>
      new UserStory({
        title: "title",
        feature: `feature ${idx}`,
        status: WorkItem.STATUS.TODO,
        effort: 5,
      })
  );
  const itemsWithAndWithoutEffort = range(5).map(
    (idx) =>
      new UserStory({
        title: "title",
        feature: `feature ${idx}`,
        status: WorkItem.STATUS.DONE,
        effort: idx % 2 ? 0 : 1,
      })
  );
  const itemsWithoutEffort = range(5).map(
    (idx) =>
      new UserStory({
        title: "title",
        feature: `feature ${idx}`,
        status: WorkItem.STATUS.DONE,
        effort: 0,
      })
  );

  it("should return true if all items have remaining effort", () => {
    expect(isThereWorkToDo(itemsWithEffort)).toBeTruthy();
  });
  it("should return true if some items do not have remaining effort", () => {
    expect(isThereWorkToDo(itemsWithAndWithoutEffort)).toBeTruthy();
  });
  it("should return false if all items do not have remaining effort", () => {
    expect(isThereWorkToDo(itemsWithoutEffort)).toBeFalsy();
  });
});

describe("isThereEffortRemaining()", () => {
  const teamWithCapability = range(5).map((idx) => ({ effort: 5 }));
  const teamWithoutCapability = range(5).map((idx) => ({ effort: 0 }));

  it("should return true if items have remaining effort", () => {
    expect(isThereEffortRemaining(teamWithCapability)).toBeTruthy();
  });
  it("should return false if items do not have remaining effort", () => {
    expect(isThereEffortRemaining(teamWithoutCapability)).toBeFalsy();
  });
});

describe("selectNextBacklogItem()", () => {
  const items = range(3).map(
    (idx) =>
      new UserStory({
        title: "title",
        feature: `feature ${idx}`,
        status: WorkItem.STATUS.TODO,
        effort: 5,
      })
  );
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should pick the first item, using the team's flow value", () => {
    expect(selectNextBacklogItem(items, 0.9)).toBe(items[0]);
  });

  it("should pick the next item, using the team's flow value", () => {
    rand.mockReturnValueOnce(0.9).mockReturnValueOnce(0.1);
    expect(selectNextBacklogItem(items, 0.5)).toBe(items[1]);
  });

  it("should pick the last item when there are no others to choose from", () => {
    expect(selectNextBacklogItem(items, 0.4)).toBe(items[2]);
  });
});

describe("getTodaysCapability()", () => {
  const dailyEffort = [0.2, 0.5, 0.8].map((x, idx) => ({
    collaboration: x,
    effort: idx,
    qualityMindset: x,
  }));
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should calculate effort with no distractions", () => {
    const result = getTodaysCapability(dailyEffort, []);
    expect(result).toEqual([
      {
        collaboration: 0.5,
        effort: 1,
        qualityMindset: 0.5,
      },
      {
        collaboration: 0.8,
        effort: 2,
        qualityMindset: 0.8,
      },
    ]);
  });

  it("should calculate effort with small distractions - filtering 0 effort after applying distractions", () => {
    const result = getTodaysCapability(dailyEffort, [0.5, 0.5]);
    expect(result).toEqual([
      {
        collaboration: 0.5,
        effort: 0.5,
        qualityMindset: 0.5,
      },
      {
        collaboration: 0.8,
        effort: 2,
        qualityMindset: 0.8,
      },
    ]);
  });

  it("should calculate effort with large distractions", () => {
    const result = getTodaysCapability(dailyEffort, [5, 5, 5]);
    expect(result).toEqual([]);
  });
});
