import Phaser from "phaser";
import * as theme from "../theme";

export class Hud extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, { emitter, company, project, team }) {
    super(scene, x, y);
    this.emitter = emitter;
    this.company = company;
    this.project = project;
    this.team = team;
    this.scene.add.existing(this);

    this.createComponents();
    this.createEvents();
  }

  createComponents() {
    this.background = this.scene.add
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(0, 0, 200, 300)
      .strokeRoundedRect(0, 0, 200, 300);
    this.header = this.scene.add
      .text(15, 5, this.company.name, theme.mainText)
      .setOrigin(0);
    this.subheader = this.scene.add
      .text(15, 30, this.project.name, theme.mainText)
      .setOrigin(0);
    this.add([this.background, this.header, this.subheader]);

    const itemsToDisplay = [`Budget: `, `Team size: `, `Number of bugs: `];

    this.stats = itemsToDisplay.map((item, idx) => {
      return this.scene.make
        .text({
          x: 15,
          y: 50 + 20 * (idx + 1),
          text: item,
          style: theme.hudText,
        })
        .setOrigin(0);
    }, this);
    this.add(this.stats);
  }

  createEvents() {
    this.emitter.on("sprint_ended", this.update, this);
  }

  update() {
    const itemsToUpdate = [
      `Budget: ${this.project.budget}`,
      `Team size: ${this.team.size}`,
      `Number of bugs: ${this.project.bugs.length}`,
    ];

    itemsToUpdate.forEach((item, idx) => {
      this.stats[idx].setText(item);
    });
  }
}
