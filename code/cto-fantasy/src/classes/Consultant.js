import { randomBoolean, randomInt, randomName } from "../utils/random";
import { Employee } from "./Employee";

export class Consultant {
  constructor({
    skill,
    experience,
    dailyRate,
    contractTerm,
    gender,
    name,
    rating,
    impactOnDailyEffort,
  } = {}) {
    this.skill = skill || randomInt(4, 9) / 10;
    this.experience = experience || randomInt(5, 20);
    this.dailyRate = dailyRate || randomInt(500, 2000);
    this.contractTerm = contractTerm || randomInt(1, 5); // TODO: this is only really suitable for the Agile Coach
    this.gender = gender || randomBoolean() ? Employee.MALE : Employee.FEMALE;
    this.name = name || randomName(this.gender);
    this.rating = rating || Math.round(this.skill * 5);
    this.impactOnDailyEffort = impactOnDailyEffort || randomInt(1, 4) / 10; // TODO: define this number in a better way
  }
}

export class AgileCoach extends Consultant {
  type = "Agile Coach";
  stats = ["agileMindset"];
}
