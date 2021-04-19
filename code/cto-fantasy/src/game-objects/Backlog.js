import Phaser from "phaser";
import { BacklogItem } from "./BacklogItem";
import * as theme from "../theme";

export class Backlog extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, { project, team, emitter }) {
    super(scene, x, y);
    this.project = project;
    this.team = team;
    this.emitter = emitter;
    this.scene.add.existing(this);

    this.createComponents();
  }

  createComponents() {
    this.background = this.scene.add
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(0, 0, 600, 400)
      .strokeRoundedRect(0, 0, 600, 400);
    this.header = this.scene.add
      .text(300, 20, "Product Backlog", theme.mainText)
      .setOrigin(0.5);
    this.add([this.background, this.header]);
    this.displayBacklog();
    this.createEvents();
  }

  displayBacklog() {
    this.rows = this.project.productBacklog.map((item, idx) => {
      return new BacklogItem(this.scene, 20, 50 + 30 * idx, {
        item,
        project: this.project,
        emitter: this.emitter,
      });
    });
    this.add(this.rows);
    //this.scene.input.setDraggable(this.rows);
  }

  destroyBacklog() {
    this.rows.forEach((row) => row.destroy());
  }

  createEvents() {
    // this.scene.input.on("gameobjectover", (pointer, obj) => {
    //   console.log("gameobjectover", obj);
    // });

    // this.scene.input.on("gameobjectout", (pointer, obj) => {
    //   console.log("gameobjectout");
    // });

    this.scene.input.on("dragstart", (pointer, obj) => {
      this.bringToTop(obj);
    });

    this.scene.input.on("drag", (pointer, obj, dragX, dragY) => {
      obj.y = dragY;
    });

    this.scene.input.on("dragend", (pointer, obj) => {
      this.updatePositions();
    });
  }

  updatePositions() {
    const positions = this.rows
      .map(({ item: { id }, y }) => ({ id, y }))
      .sort((a, b) => a.y - b.y);
    this.emitter.emit("update_backlog_order", positions);
    this.destroyBacklog();
    this.displayBacklog();
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }
}
