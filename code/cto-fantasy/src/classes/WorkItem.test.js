import { WorkItem } from "./WorkItem";

describe("WorkItem", () => {
  it("should decrement the effortRemaining and return 0 when all effort was used up", () => {
    const workItem = new WorkItem({
      id: "XXX",
      title: "xxx",
      feature: "xxx",
      effort: 5,
    });
    const remainder = workItem.doWork(1);

    expect(remainder).toBe(0);
    expect(workItem.effortRemaining).toBe(4);
  });

  it("should decrement the effortRemaining and return the remainder when excess effort was supplied", () => {
    const workItem = new WorkItem({
      id: "XXX",
      title: "xxx",
      feature: "xxx",
      effort: 5,
    });
    const remainder = workItem.doWork(10);

    expect(remainder).toBe(5);
    expect(workItem.effortRemaining).toBe(0);
  });
  it("should handle floating point numbers for effort", () => {
    const workItem = new WorkItem({
      id: "XXX",
      title: "xxx",
      feature: "xxx",
      effort: 5,
    });
    const remainder = workItem.doWork(0.2);

    expect(remainder).toBe(0);
    expect(workItem.effortRemaining).toBe(4.8);
  });
});
