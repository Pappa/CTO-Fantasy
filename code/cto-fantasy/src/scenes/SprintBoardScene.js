import Phaser from "phaser";
import { SprintBoardItem } from "../game-objects/SprintBoardItem";
import * as theme from "../theme";

const STATUSES = [
  { status: "TODO", text: "To do", x: 150 },
  { status: "IN_PROGRESS", text: "In progress", x: 325 },
  { status: "DONE", text: "Done", x: 500 },
];
const STATUS_X_POSITIONS = STATUSES.reduce((acc, { status, x }) => {
  return { ...acc, [status]: x };
}, {});

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
    this.updateItemCardPositions();
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
  }

  createBoard() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const colWidth = 150;
    this.board = this.add
      .graphics()
      .lineStyle(1, 0x000000, 1.0)
      .strokeRect(125, 150, width - 250, height - 275);

    this.columns = STATUSES.map(({ status, x }, idx) => ({
      status,
      column: this.add
        .graphics()
        .lineStyle(1, 0x000000, 1.0)
        .strokeRect(x, 175, colWidth, height - 325),
    })).reduce((acc, { status, column }) => {
      acc[status] = column;
      return acc;
    }, {});

    this.columnHeaders = STATUSES.map(({ status, text, x }, idx) => {
      return {
        status,
        text: this.add
          .text(x + colWidth / 2, 165, text, theme.boardTitles)
          .setOrigin(0.5),
      };
    }).reduce((acc, { status, text }) => {
      acc[status] = text;
      return acc;
    }, {});
  }

  createItemCards() {
    this.itemCards = this.sprint.sprintBacklog.map(this.createItemCard);
  }

  createItemCard = (item) => {
    return new SprintBoardItem(this, STATUS_X_POSITIONS[item.status] + 5, 180, {
      item,
      project: this.project,
      emitter: this.emitter,
    }); /*.setVisible(false)*/
  };

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
    this.updateItemCardPositions();
    if (this.daysRemaining === 0) {
      this.onClose();
    }
  }

  updateItemCardPositions() {
    const cardsToAdd = this.sprint.sprintBacklog.filter(
      (item) => !this.itemCards.some((card) => card.item === item)
    );
    this.itemCards.push(...cardsToAdd.map(this.createItemCard));
    const categorisedCards = this.itemCards.reduce((acc, card) => {
      const status = card.item.status;
      acc[status] = acc[status] || [];
      acc[status].push(card);
      return { ...acc };
    }, {});
    STATUSES.forEach(({ status, x }) => {
      categorisedCards[status] &&
        categorisedCards[status].forEach((card, idx) => {
          card.setPosition(x + 5, 180 + 55 * idx);
        });
    });
  }
}
