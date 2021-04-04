import Phaser from "phaser";
import { Card } from "../game-objects/Card";
import * as theme from "../theme";
import { randomInt } from "../utils/random";

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
      .text(400, 30, `${name}, you have 3 job offers!`, theme.h1)
      .setOrigin(0.5, 0);
    this.createCompanyVacancies();
  }

  update(time, delta) {}

  createCompanyVacancies() {
    const companies = Phaser.Math.RND.shuffle(
      this.registry.get("settings").companies
    )
      .slice(0, 3)
      .map((company) => ({ ...company, budget: randomInt(50000, 100000) }));
    this.companies = companies.map((company, idx) => {
      const x = 50 + (idx + 1) * 175;
      return this.add.existing(
        new Card(
          this,
          x,
          150,
          {
            title: company.name,
            text: company.description,
            buttonText: "Accept Job Offer",
          },
          this.startGame.bind(this, company)
        )
      );
    }, this);
    //this.example = new Example(this);
  }

  startGame(company) {
    this.registry.set("company", company);
    this.scene.start("MainScene");
  }
}
