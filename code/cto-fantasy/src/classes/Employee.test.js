import { Dev, Employee, ProductOwner, ScrumMaster, Tester } from "./Employee";

describe("Male Employee", () => {
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should match object", () => {
    const result = new Employee();
    expect(result).toEqual({
      skill: 0.4,
      estimation: 0.4,
      experience: 6,
      flow: 0.4,
      gender: 0,
      name: "Timothy Hanson",
      salary: 37500,
      happiness: 0.4,
      collaboration: 0.4,
      qualityMindset: 0.4,
      agileMindset: 0.4,
      psychologicalSafety: 0.3,
      type: undefined,
    });
  });
});

describe("Female Employee", () => {
  let rand;
  beforeEach(() => {
    rand = jest.spyOn(global.Math, "random").mockReturnValue(0.8);
  });

  afterEach(() => {
    rand.mockRestore();
  });

  it("should match object when gender threshold is >= 0.7", () => {
    const result = new Employee();
    expect(result).toEqual({
      skill: 0.5,
      estimation: 0.5,
      experience: 9,
      flow: 0.5,
      gender: 1,
      name: "Elsa Wells",
      salary: 45000,
      happiness: 0.5,
      collaboration: 0.5,
      qualityMindset: 0.5,
      agileMindset: 0.5,
      psychologicalSafety: 0.5,
      type: undefined,
    });
  });

  describe("Other Employee types", () => {
    let rand;
    beforeEach(() => {
      rand = jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    });

    afterEach(() => {
      rand.mockRestore();
    });

    it("should match object for Dev", () => {
      const result = new Dev();
      expect(result).toEqual({
        skill: 0.4,
        estimation: 0.4,
        experience: 6,
        flow: 0.4,
        gender: 0,
        name: "Timothy Hanson",
        salary: 37500,
        happiness: 0.4,
        collaboration: 0.4,
        qualityMindset: 0.4,
        agileMindset: 0.4,
        psychologicalSafety: 0.3,
      });
    });

    it("should match object for Tester", () => {
      const result = new Tester();
      expect(result).toEqual({
        skill: 0.4,
        estimation: 0.4,
        experience: 6,
        flow: 0.4,
        gender: 0,
        name: "Timothy Hanson",
        salary: 37500,
        happiness: 0.4,
        collaboration: 0.4,
        qualityMindset: 0.4,
        agileMindset: 0.4,
        psychologicalSafety: 0.3,
      });
    });

    it("should match object for ScrumMaster", () => {
      const result = new ScrumMaster();
      expect(result).toEqual({
        skill: 0.4,
        estimation: 0.4,
        experience: 11,
        flow: 0.4,
        gender: 0,
        name: "Timothy Hanson",
        salary: 47500,
        happiness: 0.4,
        collaboration: 0.4,
        qualityMindset: 0.4,
        agileMindset: 0.7,
        psychologicalSafety: 0.3,
      });
    });

    it("should match object for ProductOwner", () => {
      const result = new ProductOwner();
      expect(result).toEqual({
        skill: 0.4,
        estimation: 0.4,
        experience: 11,
        flow: 0.4,
        gender: 0,
        name: "Timothy Hanson",
        salary: 47500,
        happiness: 0.4,
        collaboration: 0.4,
        qualityMindset: 0.4,
        agileMindset: 0.7,
        psychologicalSafety: 0.3,
      });
    });
  });
});
