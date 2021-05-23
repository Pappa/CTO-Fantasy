import Phaser from "phaser";
import { BacklogItem } from "./BacklogItem";
import * as theme from "../theme";
import { calculateBacklogCapacityRow } from "../utils/sprint";

export class Backlog extends Phaser.GameObjects.Container {
  Y_START = 50;
  ITEM_SPACING = 30;
  constructor(scene, x = 0, y = 0, { project, team, commitment, emitter }) {
    super(scene, x, y);
    this.project = project;
    this.team = team;
    this.commitment = commitment;
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
    this.estimateLine = this.scene.add
      .graphics()
      .fillStyle(0xff0000, 1.0)
      .fillRect(0, this.Y_START, 600, 3)
      .setVisible(!!this.commitment);
    this.header = this.scene.add
      .text(300, 20, "Product Backlog", theme.mainText)
      .setOrigin(0.5);
    this.add([this.background, this.header, this.estimateLine]);
    this.createEvents();
    this.displayBacklog();
  }

  displayBacklog() {
    this.rows = this.project.productBacklog.map((item, idx) => {
      return new BacklogItem(
        this.scene,
        20,
        this.Y_START + this.ITEM_SPACING * idx,
        {
          item,
          project: this.project,
          emitter: this.emitter,
        }
      );
    });
    this.add(this.rows);
    this.emitter.emit("backlog_updated");
  }

  destroyBacklog() {
    this.rows.forEach((row) => row.destroy());
  }

  getCommittedItems() {
    const last = this.getLastCommittedBacklogItemIndex();
    return this.project.productBacklog.slice(0, last);
  }

  getLastCommittedBacklogItemIndex() {
    const estimates = this.rows.map(({ item: { estimate } }) => estimate);
    return calculateBacklogCapacityRow(estimates, this.commitment);
  }

  updateEstimateLine() {
    if (this.commitment) {
      const row = this.getLastCommittedBacklogItemIndex();
      this.estimateLine
        .clear()
        .fillStyle(0xff0000, 1.0)
        .fillRect(0, this.Y_START - 4 + row * this.ITEM_SPACING, 600, 3);
    }
  }

  createEvents() {
    // this.scene.input.on("gameobjectover", (pointer, obj) => {
    // });

    // this.scene.input.on("gameobjectout", (pointer, obj) => {
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

    this.emitter.on("backlog_updated", this.updateEstimateLine, this);
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
