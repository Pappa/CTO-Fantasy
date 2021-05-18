import { Dev } from "./Employee";
import { Team } from "./Team";

describe("Average stats", () => {
  const dev1 = new Dev({
    skill: 0.4,
    happiness: 0.4,
    qualityMindset: 0.4,
    collaboration: 0.4,
    flow: 0.4,
    estimation: 0.4,
    psychologicalSafety: 0.4,
  });
  const dev2 = new Dev({
    skill: 0.6,
    happiness: 0.6,
    qualityMindset: 0.6,
    collaboration: 0.6,
    flow: 0.6,
    estimation: 0.6,
    psychologicalSafety: 0.6,
  });
  const team = new Team([dev1, dev2]);

  it("should have expected average team values", () => {
    expect(team.skill).toBe(0.5);
    expect(team.happiness).toBe(0.5);
    expect(team.qualityMindset).toBe(0.5);
    expect(team.collaboration).toBe(0.5);
    expect(team.flow).toBe(0.5);
    expect(team.estimation).toBe(0.5);
    expect(team.psychologicalSafety).toBe(0.5);
  });

  it("should have expected team size", () => {
    expect(team.size).toBe(2);
  });

  it("should have expected velocity", () => {
    expect(team.velocity).toBe(undefined);
    team.update({ velocity: 5 });
    expect(team.velocity).toBe(5);
    team.update({ velocity: 4 });
    team.update({ velocity: 6 });
    expect(team.velocity).toBe(5);
    team.update({ velocity: 10 });
    expect(team.velocity).toBe(7);
  });
});

describe("getCommitment()", () => {
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("should have a low variation due to good estimation and experience", () => {
    const dev = new Dev({
      experience: 18,
      estimation: 0.9,
    });
    const team = new Team([dev]);
    team.update({ velocity: 50 });
    const commitment = team.getCommitment();

    expect(commitment).toBe(55);
  });

  it("should have a high variation due to good estimation and experience", () => {
    const dev = new Dev({
      experience: 1,
      estimation: 0.1,
    });
    const team = new Team([dev]);
    team.update({ velocity: 50 });
    const commitment = team.getCommitment();

    expect(commitment).toBe(97);
  });

  it("should calculate a commitment with no history of velocity", () => {
    const dev = new Dev({
      experience: 5,
      estimation: 0.5,
    });
    const team = new Team([dev]);
    const commitment = team.getCommitment();

    expect(commitment).toBe(73);
  });

  it("should shift high", () => {
    rand.mockReturnValue(0.1);
    const dev = new Dev({
      experience: 10,
      estimation: 0.9,
    });
    const team = new Team([dev]);
    team.update({ velocity: 50 });
    const commitment = team.getCommitment();

    expect(commitment).toBe(53);
  });

  it("should shift low", () => {
    rand.mockReturnValue(0.9);
    const dev = new Dev({
      experience: 10,
      estimation: 0.9,
    });
    const team = new Team([dev]);
    team.update({ velocity: 50 });
    const commitment = team.getCommitment();

    expect(commitment).toBe(68);
  });
});
