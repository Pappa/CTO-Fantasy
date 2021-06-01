import { randomInt, randomName, randomStat } from "../utils/random";

export class Employee {
  // ethnicity; // how about introducing a "diversity" attribute based on ethnic/gender diversity in the team?
  constructor({
    skill,
    experience,
    gender,
    name,
    salary,
    happiness,
    qualityMindset,
    collaboration,
    flow,
    estimation,
    psychologicalSafety,
    agileMindset,
  } = {}) {
    this.skill = skill || this.randomiseStat("skill");
    this.experience = experience || this.randomiseStat("experience");
    this.gender = gender || this.randomiseStat("gender");
    this.name = name || this.randomiseStat("name");
    this.salary = salary || this.randomiseStat("salary");
    this.happiness = happiness || this.randomiseStat("happiness");
    this.qualityMindset =
      qualityMindset || this.randomiseStat("qualityMindset");
    this.collaboration = collaboration || this.randomiseStat("collaboration");
    this.flow = flow || this.randomiseStat("flow");
    this.estimation = estimation || this.randomiseStat("estimation");
    this.psychologicalSafety =
      psychologicalSafety || this.randomiseStat("psychologicalSafety");
    this.agileMindset = agileMindset || this.randomiseStat("agileMindset");
  }

  get dailyEffort() {
    return (this.skill + this.experience / 10) / 2;
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
      case "experience":
        return randomInt(1, 10);
      default:
        return randomStat();
    }
  }
}

Employee.MALE = 0;
Employee.FEMALE = 1;

export class Dev extends Employee {}

export class Tester extends Employee {}

export class ScrumMaster extends Employee {
  randomiseStat(property) {
    switch (property) {
      case "experience":
        return super.randomiseStat("experience") + 5;
      case "salary":
        return super.randomiseStat("salary") + 10000;
      case "agileMindset":
        return randomInt(6, 8) / 10;
      default:
        return super.randomiseStat(property);
    }
  }
}

export class ProductOwner extends Employee {
  randomiseStat(property) {
    switch (property) {
      case "experience":
        return super.randomiseStat("experience") + 5;
      case "salary":
        return super.randomiseStat("salary") + 10000;
      case "agileMindset":
        return randomInt(6, 8) / 10;
      default:
        return super.randomiseStat(property);
    }
  }
}
