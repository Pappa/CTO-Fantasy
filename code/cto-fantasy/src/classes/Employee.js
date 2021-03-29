import { randomInt, randomName, randomStat } from "../utils/random";

export class Employee {
  // ethnicity; // how about introducing a "diversity" attribute based on ethnic/gender diversity in the team?
  constructor({
    skill,
    gender,
    name,
    salary,
    happiness,
    qualityMindset,
    collaboration,
    psychologicalSafety,
  } = {}) {
    this.skill = skill || this.randomiseStat("skill");
    this.gender = gender || this.randomiseStat("gender");
    this.name = name || this.randomiseStat("name");
    this.salary = salary || this.randomiseStat("salary");
    this.happiness = happiness || this.randomiseStat("happiness");
    this.qualityMindset =
      qualityMindset || this.randomiseStat("qualityMindset");
    this.collaboration = collaboration || this.randomiseStat("collaboration");
    this.psychologicalSafety =
      psychologicalSafety || this.randomiseStat("psychologicalSafety");
  }

  randomiseStat(property) {
    switch (property) {
      case "gender":
        return Math.random() <= 0.7 ? Employee.MALE : Employee.FEMALE;
      case "name":
        return randomName(this.gender);
      case "salary":
        return Math.trunc(randomInt(25000, 50000) / 500) * 500;
      case "psychologicalSafety":
        return randomInt(1, 5) / 10;
      case "skill":
      case "happiness":
      case "qualityMindset":
      default:
        return randomStat();
    }
  }
}

Employee.MALE = 0;
Employee.FEMALE = 1;

export class Dev extends Employee {
  type = "Developer";
}

export class Tester extends Employee {
  type = "Tester";
}

export class ScrumMaster extends Employee {
  type = "Scrum Master";
  randomiseStat(property) {
    return property === "salary"
      ? super.randomiseStat("salary") + 10000
      : super.randomiseStat(property);
  }
}

export class ProductOwner extends Employee {
  type = "Product Owner";
  randomiseStat(property) {
    return property === "salary"
      ? super.randomiseStat("salary") + 10000
      : super.randomiseStat(property);
  }
}
