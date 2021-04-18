import Phaser from "phaser";
import { BacklogItem } from "./BacklogItem";
import * as theme from "../theme";

export class Backlog extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, { project, team }) {
    super(scene, x, y);
    console.log("Backlog", x, y);
    this.project = project;
    this.team = team;
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
      return new BacklogItem(this.scene, 20, this.y + 30 * idx, {
        item,
      });
    });
    this.add(this.rows);
    //this.scene.input.setDraggable(this.rows);
  }

  destroyBacklog() {
    this.rows.forEach((row) => row.destroy());
  }

  createEvents() {
    this.scene.input.on("gameobjectover", (pointer, obj) => {
      console.log("gameobjectover", obj);
      // obj.setTint(0x999999);
    });

    this.scene.input.on("gameobjectout", (pointer, obj) => {
      console.log("gameobjectout");
      // obj.clearTint();
    });

    this.scene.input.on("dragstart", (pointer, obj) => {
      console.log("dragstart");
      this.bringToTop(obj);
      // obj.setTint(0x009900);
    });

    this.scene.input.on("drag", (pointer, obj, dragX, dragY) => {
      console.log("drag");
      obj.y = dragY;
    });

    this.scene.input.on("dragend", (pointer, obj) => {
      console.log("dragend");
      // obj.clearTint();
      this.updatePositions();
    });
  }

  updatePositions() {
    const positions = this.rows
      .map(({ item: { id }, y }) => ({ id, y }))
      .sort((a, b) => a.y - b.y);
    this.project.updateBacklogOrder(positions);
    this.destroyBacklog();
    this.displayBacklog();
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }
}
