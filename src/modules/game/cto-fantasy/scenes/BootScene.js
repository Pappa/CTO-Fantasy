import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  init() {}

  // load assets
  preload() {
    this.load.html("joinform", "assets/forms/join.html");
    this.load.html("card", "assets/forms/card.html");
    this.load.image("button", "assets/UIpack/PNG/blue_button00.png");
    this.load.image("button_hover", "assets/UIpack/PNG/blue_button01.png");
    this.load.image("button_click", "assets/UIpack/PNG/blue_button02.png");
    this.load.image("card", "assets/card.png");
  }

  // executed once, after assets were loaded
  create() {
    this.form = this.add.dom(400, 300).createFromCache("joinform");
    this.form.setOrigin(0.5);
    this.form.setPerspective(800);
    this.form.addListener("click");

    this.form.on("click", this.handleSubmit, this);
  }

  handleSubmit(event) {
    if (event.target.name === "start") {
      const name = this.form.getChildByName("name");
      if (name.value !== "") {
        this.form.removeListener("click");
        this.form.setVisible(false);
        this.registry.set("name", name.value);
        this.scene.start("VacanciesScene");
      }
    }
  }
}
