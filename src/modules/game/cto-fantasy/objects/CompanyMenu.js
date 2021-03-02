import Phaser from "phaser";

export class CompanyMenu extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, company) {
    super(scene, x, y);

    const menu = scene.add.image(0, 0, "menu");
    const companyName = scene.add
      .text(0, 15, company.name, {
        font: "14px Open Sans",
        fill: "#000000",
      })
      .setOrigin(0.5, 0);
    const companyDescription = scene.add
      .text(0, 40, company.description, {
        font: "12px Open Sans",
        fill: "#000000",
        wordWrap: { width: 100 },
      })
      .setOrigin(0.5, 0);
    const button = scene.add.image(0, 155, "button");
    const acceptText = scene.add
      .text(0, 160, "Accept Job", {
        font: "12px Open Sans",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0);

    menu.setScale(1.5, 2).setOrigin(0.5, 0);
    button.setScale(0.5).setOrigin(0.5, 0);

    this.setSize(100, 150);

    this.add([menu, companyName, companyDescription, button, acceptText]);

    scene.add.existing(this);
  }
}
