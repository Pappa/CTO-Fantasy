import Phaser from "phaser";
import config from "../config.json";
import { CompanyMenu } from "../classes/CompanyMenu";

export class VacanciesScene extends Phaser.Scene {
  constructor() {
    super("VacanciesScene");
  }

  init() {}

  preload() {}

  // executed once, after assets were loaded
  create() {
    const companies = Phaser.Math.RND.shuffle(config.companies).slice(0, 3);
    this.companies = this.add.group(
      companies.map((company, idx) => {
        const x = (idx + 1) * 160;
        return new CompanyMenu(this, x, 150, company);
      })
    );
  }

  update(time, delta) {}
}
