import { randomInt } from "../utils/random";

export class Employee {
  skill = 0;
  gender;
  // ethnicity; // how about introducing a "diversity" attribute based on ethnic/gender diversity in the team?
  constructor(skill, gender) {
    this.skill = skill || this.randomiseSkill();
    this.gender = gender || this.randomiseGender();
  }

  randomiseSkill() {
    const min = 1;
    const max = 5;
    return (randomInt(min, max) + randomInt(min, max)) / 10;
  }

  randomiseGender() {
    return Math.random() <= 0.7 ? Employee.MALE : Employee.FEMALE;
  }
}

Employee.MALE = 0;
Employee.FEMALE = 1;

export class Dev extends Employee {}

export class Tester extends Employee {}

export class ScrumMaster extends Employee {}

export class ProductOwner extends Employee {}
