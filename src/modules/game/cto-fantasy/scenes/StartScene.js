import Phaser from "phaser";
import config from "../config.json";
import { CompanyMenu } from "../objects/CompanyMenu";

export class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  init() {}

  // load assets
  preload() {
    this.load.image("button", "assets/UIpack/PNG/blue_button00.png");
    this.load.image("menu", "assets/UIpack/PNG/grey_panel.png");
    // this.load.audio("treeAudio", "assets/audio/arbol.mp3");
  }

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
