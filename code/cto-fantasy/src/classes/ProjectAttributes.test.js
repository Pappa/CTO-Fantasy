import { ProjectAttributes } from "./ProjectAttributes";
import averageTeam from "../presets/team/average.json";
import { createTeamFromPresets } from "../utils/team";

describe("ProjectAttributes", () => {
  let rand;
  const emitter = { on: jest.fn(), emit: jest.fn() };
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should return default attributes", () => {
    const team = createTeamFromPresets(averageTeam);
    const attributes = new ProjectAttributes({ emitter, team });
    expect(attributes.attributes).not.toBeUndefined();
  });
});
