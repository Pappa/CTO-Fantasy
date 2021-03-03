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
    const name = this.registry.get("name");
    this.welcomeMessage = this.add
      .text(400, 30, `${name}, you have 3 job offers!`, {
        font: "24px Open Sans",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0);
    this.createCompanyVacancies();
  }

  update(time, delta) {}

  createCompanyVacancies() {
    const companies = Phaser.Math.RND.shuffle(config.companies).slice(0, 3);
    this.companies = this.add.group(
      companies.map((company, idx) => {
        const x = (idx + 1) * 160;
        return new CompanyMenu(
          this,
          x,
          150,
          company,
          this.startGame.bind(this)
        );
      }, this)
    );
  }

  startGame(company) {
    this.registry.set("company", company);
    this.scene.start("MainScene");
  }
}
