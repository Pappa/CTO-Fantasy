import { Dev, Employee, ProductOwner, ScrumMaster, Tester } from "./Employee";

describe("Male Employee", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("should match object", () => {
    const result = new Employee();
    expect(result).toEqual({
      skill: 0.6,
      estimation: 0.6,
      experience: 6,
      flow: 0.6,
      gender: 0,
      name: "Timothy Hanson",
      salary: 37500,
      happiness: 0.6,
      collaboration: 0.6,
      qualityMindset: 0.6,
      psychologicalSafety: 0.3,
      type: undefined,
    });
  });
});

describe("Female Employee", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.8);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("should match object when gender threshold is >= 0.7", () => {
    const result = new Employee();
    expect(result).toEqual({
      skill: 1,
      estimation: 1,
      experience: 9,
      flow: 1,
      gender: 1,
      name: "Elsa Wells",
      salary: 45000,
      happiness: 1,
      collaboration: 1,
      qualityMindset: 1,
      psychologicalSafety: 0.5,
      type: undefined,
    });
  });

  describe("Other Employee types", () => {
    beforeEach(() => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    });

    afterEach(() => {
      jest.spyOn(global.Math, "random").mockRestore();
    });

    it("should match object for Dev", () => {
      const result = new Dev();
      expect(result).toEqual({
        skill: 0.6,
        estimation: 0.6,
        experience: 6,
        flow: 0.6,
        gender: 0,
        name: "Timothy Hanson",
        salary: 37500,
        happiness: 0.6,
        collaboration: 0.6,
        qualityMindset: 0.6,
        psychologicalSafety: 0.3,
        type: "Developer",
      });
    });

    it("should match object for Tester", () => {
      const result = new Tester();
      expect(result).toEqual({
        skill: 0.6,
        estimation: 0.6,
        experience: 6,
        flow: 0.6,
        gender: 0,
        name: "Timothy Hanson",
        salary: 37500,
        happiness: 0.6,
        collaboration: 0.6,
        qualityMindset: 0.6,
        psychologicalSafety: 0.3,
        type: "Tester",
      });
    });

    it("should match object for ScrumMaster", () => {
      const result = new ScrumMaster();
      expect(result).toEqual({
        skill: 0.6,
        estimation: 0.6,
        experience: 11,
        flow: 0.6,
        gender: 0,
        name: "Timothy Hanson",
        salary: 47500,
        happiness: 0.6,
        collaboration: 0.6,
        qualityMindset: 0.6,
        psychologicalSafety: 0.3,
        type: "Scrum Master",
      });
    });

    it("should match object for ProductOwner", () => {
      const result = new ProductOwner();
      expect(result).toEqual({
        skill: 0.6,
        estimation: 0.6,
        experience: 11,
        flow: 0.6,
        gender: 0,
        name: "Timothy Hanson",
        salary: 47500,
        happiness: 0.6,
        collaboration: 0.6,
        qualityMindset: 0.6,
        psychologicalSafety: 0.3,
        type: "Product Owner",
      });
    });
  });
});
