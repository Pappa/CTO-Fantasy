import Phaser from "phaser";

export class Vacancy extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, company, selectCompany) {
    super(scene, x, y);

    this.scene = scene;
    this.company = company;
    this.selectCompany = selectCompany;

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

    this.menu = this.scene.add.image(0, 0, "menu");
    this.companyName = this.scene.add
      .text(0, 15, this.company.name, {
        font: "14px Open Sans",
        fill: "#000000",
      })
      .setOrigin(0.5, 0);
    this.companyDescription = this.scene.add
      .text(0, 40, this.company.description, {
        font: "12px Open Sans",
        fill: "#000000",
        wordWrap: { width: 100 },
      })
      .setOrigin(0.5, 0);
    this.button = this.scene.add.image(0, 155, "button");
    this.acceptText = this.scene.add
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
        this.selectCompany(this.company);
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

    this.scene.add.existing(this);
  }

  updateButton = (texture) => {
    this.button.setTexture(texture);
  };
}
