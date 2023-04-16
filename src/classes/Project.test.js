import { Project } from "./Project";

describe("Project", () => {
  let rand;
  const emitter = { on: jest.fn(), emit: jest.fn() };
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should return the default project", () => {
    const project = new Project({ emitter });
    expect(project).toMatchObject({
      name: "Project Genesis",
      budget: 70000,
      emitter,
    });
  });
});
