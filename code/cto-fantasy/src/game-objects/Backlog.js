import Phaser from "phaser";
import * as theme from "../theme";

export class Backlog extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, { project, team }) {
    super(scene, x, y);
    this.project = project;
    this.team = team;
    this.scene.add.existing(this);

    this.createComponents();
  }

  createComponents() {
    this.background = this.scene.make
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(0, 0, 600, 400)
      .strokeRoundedRect(0, 0, 600, 400);
    this.add(this.background);
    // this.header = this.scene.add
    //   .text(15, 5, "Product Backlog", theme.mainText)
    //   .setOrigin(0);
    // this.add([this.background, this.header]);
    this.displayBacklog();
    this.createEvents();
  }

  displayBacklog() {
    this.rows = this.project.productBacklog.map((item, idx) => {
      const row = this.scene.make
        .text({
          x: 20,
          y: 20 + 25 * idx,
          text: `${item.id} - ${item.title} - estimate ${this.getEstimateText(
            item
          )}`,
          style: theme.mainText,
        })
        .setOrigin(0)
        .setInteractive();
      row.workItemId = item.id;
      return row;
    }, this);
    this.add(this.rows);
    this.scene.input.setDraggable(this.rows);
  }

  destroyBacklog() {
    this.rows.forEach((row) => row.destroy());
  }

  createEvents() {
    this.scene.input.on("gameobjectover", (pointer, obj) => {
      obj.setTint(0x00ff00);
    });

    this.scene.input.on("gameobjectout", (pointer, obj) => {
      obj.clearTint();
    });

    this.scene.input.on("dragstart", (pointer, obj) => {
      obj.setTint(0xff0000);
    });

    this.scene.input.on("drag", (pointer, obj, dragX, dragY) => {
      obj.y = dragY;
    });

    this.scene.input.on("dragend", (pointer, obj) => {
      obj.clearTint();
      this.updatePositions();
    });
  }

  updatePositions() {
    const positions = this.rows
      .map(({ workItemId, y }) => ({ id: workItemId, y }))
      .sort((a, b) => a.y - b.y);
    this.project.updateBacklogOrder(positions);
    this.destroyBacklog();
    this.displayBacklog();
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }
}
