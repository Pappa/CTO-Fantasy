import { randomInt, randomName } from "../utils/random";

export class Employee {
  // ethnicity; // how about introducing a "diversity" attribute based on ethnic/gender diversity in the team?
  constructor(skill, gender, name, salary) {
    this.skill = skill || this.getRandomSkill();
    this.gender = gender || this.getRandomGender();
    this.name = name || this.getRandomName();
    this.salary = salary || this.getRandomSalary();
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

  getRandomSalary() {
    return Math.trunc(randomInt(25000, 50000) / 500) * 500;
  }
}

Employee.MALE = 0;
Employee.FEMALE = 1;

export class Dev extends Employee {}

export class Tester extends Employee {}

export class ScrumMaster extends Employee {
  getRandomSalary() {
    return super.getRandomSalary() + 10000;
  }
}

export class ProductOwner extends Employee {
  getRandomSalary() {
    return super.getRandomSalary() + 10000;
  }
}
