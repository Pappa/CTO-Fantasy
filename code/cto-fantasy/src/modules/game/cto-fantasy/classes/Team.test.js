import { Dev } from "./Employee";
import { Team } from "./Team";

describe("Average stats", () => {
  const dev1 = new Dev({
    skill: 0.4,
    happiness: 0.4,
    qualityMindset: 0.4,
    collaboration: 0.4,
    psychologicalSafety: 0.4,
  });
  const dev2 = new Dev({
    skill: 0.6,
    happiness: 0.6,
    qualityMindset: 0.6,
    collaboration: 0.6,
    psychologicalSafety: 0.6,
  });
  const team = new Team();
  team.add(dev1);
  team.add(dev2);

  it("should have expected average team values", () => {
    expect(team.skill).toBe(0.5);
    expect(team.happiness).toBe(0.5);
    expect(team.qualityMindset).toBe(0.5);
    expect(team.collaboration).toBe(0.5);
    expect(team.psychologicalSafety).toBe(0.5);
  });

  it("should have expected team size", () => {
    expect(team.size).toBe(2);
  });
});
