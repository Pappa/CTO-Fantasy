import Phaser from "phaser";

export class CompanyMenu extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, company, selectCompany) {
    super(scene, x, y);

    this.scene = scene;

    this.menu = scene.add.image(0, 0, "menu");
    this.companyName = scene.add
      .text(0, 15, company.name, {
        font: "14px Open Sans",
        fill: "#000000",
      })
      .setOrigin(0.5, 0);
    this.companyDescription = scene.add
      .text(0, 40, company.description, {
        font: "12px Open Sans",
        fill: "#000000",
        wordWrap: { width: 100 },
      })
      .setOrigin(0.5, 0);
    this.button = scene.add.image(0, 155, "button");
    this.acceptText = scene.add
      .text(0, 160, "Accept Job Offer", {
        font: "12px Open Sans",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0);

    this.menu.setScale(1.5, 2).setOrigin(0.5, 0);
    this.button.setScale(0.5).setOrigin(0.5, 0).setInteractive();

    this.button.on(
      "pointerover",
      () => {
        this.updateButton("button_hover");
      },
      this
    );
    this.button.on(
      "pointerdown",
      () => {
        this.updateButton("button_click");
      },
      this
    );
    this.button.on(
      "pointerout",
      () => {
        this.updateButton("button");
      },
      this
    );
    this.button.on(
      "pointerup",
      () => {
        selectCompany(company);
      },
      this
    );

    this.setSize(100, 150);

    this.add([
      this.menu,
      this.companyName,
      this.companyDescription,
      this.button,
      this.acceptText,
    ]);

    scene.add.existing(this);
  }

  updateButton = (texture) => {
    this.button.setTexture(texture);
  };
}
