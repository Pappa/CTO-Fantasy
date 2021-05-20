import Phaser from "phaser";
import * as theme from "../theme";

export class SprintBoardItem extends Phaser.GameObjects.Container {
  width = 100;
  height = 50;
  constructor(scene, x = 0, y = 0, { item, project, emitter }) {
    super(scene, x, y);
    this.item = item;
    this.project = project;
    this.emitter = emitter;
    this.scene.add.existing(this);

    this.createComponents();
  }

  createComponents() {
    this.background = this.scene.make
      .graphics()
      .lineStyle(1, 0x000000, 1.0)
      .strokeRect(0, 0, 100, 50);
    this.workItemId = this.scene.make
      .text({
        x: 20,
        y: 3,
        text: `${this.item.id}`,
        style: theme.sprintBoardItemText,
      })
      .setOrigin(0);
    this.title = this.scene.make
      .text({
        x: 1,
        y: 3,
        text: `${this.item.title}`,
        style: theme.sprintBoardItemText,
      })
      .setOrigin(0);
    this.estimate = this.scene.make
      .text({
        x: 3,
        y: 3,
        text: `${this.item.estimate || "-"}`,
        style: theme.estimate,
      })
      .setOrigin(0);
    this.add([this.background, this.workItemId, this.title, this.estimate]);
  }
}
