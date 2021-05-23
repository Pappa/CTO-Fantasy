import Phaser from "phaser";
import { SprintBoardItem } from "../game-objects/SprintBoardItem";
import * as theme from "../theme";

const STATUSES = [
  { status: "TODO", text: "To do" },
  { status: "IN_PROGRESS", text: "In progress" },
  { status: "DONE", text: "Done" },
];

export class SprintBoardScene extends Phaser.Scene {
  constructor() {
    super("SprintBoardScene");
  }

  init() {}

  preload() {}

  // update(time, delta) {
  //   console.log("this.startTime", this.startTime);
  //   console.log("time", time);
  //   console.log("diff", time - this.startTime);
  // }

  create({ project, sprint, emitter, onClose }) {
    this.project = project;
    this.sprint = sprint;
    this.emitter = emitter;
    this.onClose = onClose;
    this.daysRemaining = this.sprint.SPRINT_LENGTH;
    this.createComponents();
    this.createBoard();
    this.createItemCards();
    this.createTimer();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.background = this.add
      .graphics()
      .fillStyle(0xffffff, 1.0)
      .fillRect(100, 100, width - 200, height - 200);
    this.header = this.add
      .text(120, 120, `Days remaining: ${this.daysRemaining}`, theme.boardText)
      .setOrigin(0);

    // move ticket each day
    // this.physics.moveTo(item, x, y, 60);
  }

  createBoard() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const colPositions = [150, 325, 500];
    const colWidth = 150;
    this.board = this.add
      .graphics()
      .lineStyle(1, 0x000000, 1.0)
      .strokeRect(125, 150, width - 250, height - 275);

    this.columns = STATUSES.map(({ status }, idx) => ({
      status,
      column: this.add
        .graphics()
        .lineStyle(1, 0x000000, 1.0)
        .strokeRect(colPositions[idx], 175, colWidth, height - 325),
    })).reduce((acc, { status, column }) => {
      acc[status] = column;
      return acc;
    }, {});

    this.columnHeaders = STATUSES.map(({ status, text }, idx) => {
      return {
        status,
        text: this.add
          .text(colPositions[idx] + colWidth / 2, 165, text, theme.boardTitles)
          .setOrigin(0.5),
      };
    }).reduce((acc, { status, text }) => {
      acc[status] = text;
      return acc;
    }, {});
  }

  createItemCards() {
    // scene.physics.add.existing(gameObject, bodyType);
    this.items = this.sprint.sprintBacklog.map((item) =>
      new SprintBoardItem(this, 0, 0, {
        item,
        project: this.project,
        emitter: this.emitter,
      }).setVisible(false)
    );
  }

  createTimer() {
    this.sprintTimer = this.time.addEvent({
      delay: 1000,
      callback: this.dayPassing,
      //args: [],
      callbackScope: this,
      repeat: this.sprint.SPRINT_LENGTH - 1,
    });
  }

  dayPassing() {
    this.sprint.workOnItems();
    this.daysRemaining--;
    this.header.setText(`Days remaining: ${this.daysRemaining}`);
    if (this.daysRemaining === 0) {
      this.onClose();
    }
  }
}
