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
    const max = 10;
    return Math.floor(Math.random() * (max - min + 1) + min) / 10;
  }

  randomiseGender() {
    return Math.random() <= 0.7 ? Employee.MALE : Employee.FEMALE;
  }
}

Employee.MALE = "m";
Employee.FEMALE = "f";

export class Dev extends Employee {}

export class Tester extends Employee {}

export class ScrumMaster extends Employee {}

export class ProductOwner extends Employee {}
