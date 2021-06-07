import { average } from "../utils/number";
import { randomInt, randomName, randomStat } from "../utils/random";

export class Employee {
  // ethnicity; // how about introducing a "diversity" attribute based on ethnic/gender diversity in the team?
  constructor(
    {
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
      boost = 1,
    } = { boost: 1 }
  ) {
    this.skill = skill || this.randomiseStat("skill", boost);
    this.experience = experience || this.randomiseStat("experience", boost);
    this.gender = gender || this.randomiseStat("gender", boost);
    this.name = name || this.randomiseStat("name", boost);
    this.salary = salary || this.randomiseStat("salary", boost);
    this.happiness = happiness || this.randomiseStat("happiness", boost);
    this.qualityMindset =
      qualityMindset || this.randomiseStat("qualityMindset", boost);
    this.collaboration =
      collaboration || this.randomiseStat("collaboration", boost);
    this.flow = flow || this.randomiseStat("flow", boost);
    this.estimation = estimation || this.randomiseStat("estimation", boost);
    this.psychologicalSafety =
      psychologicalSafety || this.randomiseStat("psychologicalSafety", boost);
    this.agileMindset =
      agileMindset || this.randomiseStat("agileMindset", boost);
  }

  get dailyEffort() {
    return (this.skill + this.experience / 10) / 2;
  }

  get rating() {
    return Math.round(
      average([
        this.skill,
        this.happiness,
        this.qualityMindset,
        this.collaboration,
        this.flow,
        this.estimation,
        this.psychologicalSafety,
        this.agileMindset,
      ]) * 5
    );
  }

  randomiseStat(property, boost) {
    switch (property) {
      case "gender":
        return Math.random() <= 0.7 ? Employee.MALE : Employee.FEMALE;
      case "name":
        return randomName(this.gender);
      case "salary":
        return (
          Math.trunc(
            (randomInt(25000, 50000) * (boost === 1 ? boost : boost / 2)) / 500
          ) * 500
        );
      case "psychologicalSafety":
        return (randomInt(1, 5) * boost) / 10;
      case "experience":
        return randomInt(1, 10) * boost;
      default:
        return randomStat() * boost;
    }
  }
}

Employee.MALE = 0;
Employee.FEMALE = 1;

export class Dev extends Employee {
  type = "Software Engineer";
}

export class Tester extends Employee {
  type = "QA Engineer";
}

export class ScrumMaster extends Employee {
  type = "Scrum Master";
  randomiseStat(property, boost) {
    switch (property) {
      case "experience":
        return super.randomiseStat("experience", boost) + 5;
      case "salary":
        return super.randomiseStat("salary", boost) + 10000;
      case "agileMindset":
        return (randomInt(6, 8) * boost) / 10;
      default:
        return super.randomiseStat(property, boost);
    }
  }
}

export class ProductOwner extends Employee {
  type = "Product Owner";
  randomiseStat(property, boost) {
    switch (property) {
      case "experience":
        return super.randomiseStat("experience", boost) + 5;
      case "salary":
        return super.randomiseStat("salary", boost) + 10000;
      case "agileMindset":
        return (randomInt(6, 8) * boost) / 10;
      default:
        return super.randomiseStat(property, boost);
    }
  }
}
