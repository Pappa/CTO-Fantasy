import Phaser from "phaser";
import * as theme from "../theme";

export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, content, callback) {
    super(scene, x, y);

    // console.log("CompanyMenu:preload");
    // this.form = this.scene.add.dom(300, 400).createFromCache("vacancy");
    // this.form.setOrigin(0.5);
    // this.form.setPerspective(800);
    // this.form.addListener("click");

    // console.log("CompanyMenu:create");
    // const name = this.form.getChildByName("company-name");
    // const description = this.form.getChildByName("company-description");
    // const submit = this.form.getChildByName("submit");

    // TODO: figure out solution to race condition here
    // name is null briefly
    // name.setText(this.company.name);
    // description.setText(this.company.description);
    // submit.setText("Accept Job Offer");

    // console.log("name", name);
    this.setSize(100, 150);

    this.card = this.scene.add.image(0, 0, "card").setOrigin(0.5, 0);

    this.createText(content);
    this.add([this.card, this.title, this.text]);
    if (callback) {
      this.createButton(content, callback);
    }

    this.scene.add.existing(this);
  }

  createText(content) {
    this.title = this.scene.add
      .text(0, 15, content.title, theme.cardTitle)
      .setOrigin(0.5, 0);
    this.text = this.scene.add
      .text(0, 40, content.text, theme.cardText)
      .setOrigin(0.5, 0);
  }

  createButton(content, callback) {
    this.button = this.scene.add.image(0, 155, "button");
    this.button.setScale(0.5).setOrigin(0.5, 0).setInteractive();
    this.button.on("pointerover", this.updateButton.bind(this, "button_hover"));
    this.button.on("pointerdown", this.updateButton.bind(this, "button_click"));
    this.button.on("pointerout", this.updateButton.bind(this, "button"));
    this.button.on("pointerup", callback);
    this.buttonText = this.scene.add
      .text(0, 160, content.buttonText, theme.buttonText)
      .setOrigin(0.5, 0);
    this.add([this.button, this.buttonText]);
  }

  updateButton = (texture) => {
    this.button.setTexture(texture);
  };
}
