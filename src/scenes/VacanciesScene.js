import Phaser from "phaser";
import { Form } from "../game-objects/Form";
import * as theme from "../theme";

export class VacanciesScene extends Phaser.Scene {
  constructor() {
    super("VacanciesScene");
  }

  init() {
    this.centreX = this.cameras.main.width / 2;
    this.centreY = this.cameras.main.height / 2;
    const settings = this.registry.get("settings");
    this.companies = settings.companies;
    this.limit = settings.COMPANY_LIMIT;
  }

  preload() {}

  // executed once, after assets were loaded
  create() {
    const name = this.registry.get("name");
    this.add
      .text(this.centreX, 30, `Welcome ${name}!`, theme.h1)
      .setOrigin(0.5, 0);
    this.add
      .text(this.centreX, 65, `You have ${this.limit} job offers.`, theme.h2)
      .setOrigin(0.5, 0);
    this.createCompanyVacancies();
  }

  update(time, delta) {}

  createCompanyVacancies() {
    const companies = Phaser.Math.RND.shuffle(
      this.registry.get("settings").companies
    ).slice(0, this.limit);
    this.companies = companies.map((company, idx) => {
      const x = idx % 2 === 0 ? this.centreX + 80 : this.centreX - 80;
      const y = Math.floor(idx / 2) * 220 + 100;
      return this.add.existing(
        new Form(
          this,
          x,
          y,
          {
            title: company.name,
            text: company.description,
            buttonText: "Accept Offer",
          },
          this.startGame.bind(this, company)
        )
      );
    }, this);
  }

  startGame(company) {
    this.registry.set("company", company);
    this.scene.start("MainScene");
  }
}
