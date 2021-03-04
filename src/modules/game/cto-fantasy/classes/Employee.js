import { randomInt, randomName } from "../utils/random";

export class Employee {
  skill = 0;
  gender;
  // ethnicity; // how about introducing a "diversity" attribute based on ethnic/gender diversity in the team?
  constructor(skill, gender, name) {
    this.skill = skill || this.getRandomSkill();
    this.gender = gender || this.getRandomGender();
    this.name = name || this.getRandomName();
  }

  getRandomSkill() {
    const min = 1;
    const max = 5;
    return (randomInt(min, max) + randomInt(min, max)) / 10;
  }

  getRandomGender() {
    return Math.random() <= 0.7 ? Employee.MALE : Employee.FEMALE;
  }

  getRandomName() {
    return randomName(this.gender);
  }
}

Employee.MALE = 0;
Employee.FEMALE = 1;

export class Dev extends Employee {}

export class Tester extends Employee {}

export class ScrumMaster extends Employee {}

export class ProductOwner extends Employee {}
