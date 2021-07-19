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
    this.backlogItemYOffset = 0;
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

    this.backlogMask = this.scene.add
      .rectangle(this.x + 10, this.y + this.Y_START, 580, 335, 0x6666ff)
      .setOrigin(0)
      .setVisible(false);

    this.estimateLine.mask = new Phaser.Display.Masks.GeometryMask(
      this.scene,
      this.backlogMask
    );

    this.add([
      this.background,
      this.header,
      this.estimateLine,
      this.backlogMask,
    ]);
    this.createEvents();
    this.displayBacklog();
    this.updateEstimateLine();
  }

  displayBacklog() {
    this.rows = this.project.backlog.items.map((item, idx) => {
      return new BacklogItem(
        this.scene,
        20,
        this.Y_START + this.backlogItemYOffset + this.ITEM_SPACING * idx,
        {
          item,
          project: this.project,
          emitter: this.emitter,
          mask: this.backlogMask,
          move: this.moveBacklogItem,
          parent: this,
        }
      );
    });
    this.add(this.rows);
  }

  moveBacklogItem(obj, direction) {
    obj.y =
      direction < 0
        ? obj.y + this.ITEM_SPACING + 1
        : direction > 0
        ? obj.y - this.ITEM_SPACING - 1
        : this.Y_START + this.backlogItemYOffset - 1;

    this.updatePositions();
  }

  destroyBacklog() {
    this.rows.forEach((row) => row.destroy());
  }

  scrollBacklog(by) {
    if (by > 0 && this.rows[0].y === 50) {
      return;
    }
    if (by < 0 && this.rows[this.rows.length - 1].y === 355) {
      return;
    }
    this.backlogItemYOffset += by;
    this.estimateLine.y += by;
    this.rows.forEach((row) => (row.y += by));
  }

  getCommittedItems() {
    const last = this.getLastCommittedBacklogItemIndex();
    return this.project.backlog.items.slice(0, last);
  }

  getLastCommittedBacklogItemIndex() {
    const estimates = this.rows.map(({ item: { estimate } }) => estimate);
    return calculateBacklogCapacityRow(estimates, this.commitment);
  }

  updateEstimateLine() {
    if (this.commitment) {
      const row = this.getLastCommittedBacklogItemIndex();
      this.estimateLine.y = 0;
      this.estimateLine
        .clear()
        .fillStyle(0xff0000, 1.0)
        .fillRect(0, this.rows[row - 1].y + 26, 600, 3);
    }
  }

  createEvents() {
    this.scene.input.on("dragstart", (pointer, obj) => {
      this.bringToTop(obj);
    });

    this.scene.input.on("drag", (pointer, obj, dragX, dragY) => {
      obj.y = dragY;
    });

    this.scene.input.on("dragend", (pointer, obj) => {
      this.updatePositions();
    });

    this.emitter.on("backlog_updated", () => {
      //this.backlogItemYOffset = 0;
      if (this.scene) {
        this.destroyBacklog();
        this.displayBacklog();
        this.updateEstimateLine();
      }
    });

    this.downKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.upKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
  }

  update() {
    if (this.downKey.isDown) {
      this.scrollBacklog(-5);
    }
    if (this.upKey.isDown) {
      this.scrollBacklog(5);
    }
  }

  updatePositions() {
    const positions = this.rows
      .map(({ item: { id }, y }) => ({ id, y }))
      .sort((a, b) => a.y - b.y);
    this.emitter.emit("update_backlog_order", positions);
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }
}
