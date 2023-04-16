import Phaser from "phaser";
import * as theme from "../theme";
import { SprintBoardItem } from "./SprintBoardItem";

const STATUSES = [
  { status: "TODO", text: "To do", x: 50 },
  { status: "IN_PROGRESS", text: "In progress", x: 225 },
  { status: "DONE", text: "Done", x: 400 },
];
const STATUS_X_POSITIONS = STATUSES.reduce((acc, { status, x }) => {
  return { ...acc, [status]: x };
}, {});

export class SprintBoard extends Phaser.GameObjects.Container {
  width = 600;
  height = 440;
  constructor(scene, x = 0, y = 0, { sprint }) {
    super(scene, x, y);
    this.sprint = sprint;
    this.daysRemaining = this.sprint.SPRINT_LENGTH;
    this.scene.add.existing(this);

    this.createComponents();
    this.createBoard();
    this.createItemCards();
    this.updateItemCardPositions();
  }

  createComponents() {
    this.background = this.scene.make
      .graphics()
      .fillStyle(0xffffff, 1.0)
      .fillRect(0, 0, this.width, this.height);
    this.header = this.scene.make
      .text({
        x: 20,
        y: 20,
        text: `Days remaining: ${this.daysRemaining}`,
        style: theme.boardText,
      })
      .setOrigin(0);

    this.add([this.background, this.header]);
  }

  createBoard() {
    const colWidth = 150;
    this.board = this.scene.make
      .graphics()
      .lineStyle(1, 0x000000, 1.0)
      .strokeRect(10, 50, this.width - 20, this.height - 65);
    this.add([this.board]);

    this.columns = STATUSES.map(({ status, x }) => ({
      status,
      column: this.scene.make
        .graphics()
        .lineStyle(1, 0x000000, 1.0)
        .strokeRect(x, 75, colWidth, this.height - 105),
    })).reduce((acc, { status, column }) => {
      acc[status] = column;
      return acc;
    }, {});

    this.add(STATUSES.map(({ status }) => this.columns[status]));

    this.columnHeaders = STATUSES.map(({ status, text, x }) => {
      return {
        status,
        text: this.scene.make
          .text({
            x: x + colWidth / 2,
            y: 65,
            text,
            style: theme.boardTitles,
          })
          .setOrigin(0.5),
      };
    }).reduce((acc, { status, text }) => {
      acc[status] = text;
      return acc;
    }, {});
    this.add(STATUSES.map(({ status }) => this.columnHeaders[status]));
  }

  createItemCards() {
    this.itemCards = this.sprint.sprintBacklog.map(this.createItemCard);
    this.add(this.itemCards);
  }

  createItemCard = (item) => {
    return new SprintBoardItem(
      this.scene,
      STATUS_X_POSITIONS[item.status] + 5,
      80,
      {
        item,
      }
    ); /*.setVisible(false)*/
  };

  updateItemCardPositions() {
    const cardsToAdd = this.sprint.sprintBacklog
      .filter((item) => !this.itemCards.some((card) => card.item === item))
      .map(this.createItemCard);
    this.itemCards.push(...cardsToAdd);
    this.add(cardsToAdd);

    const categorisedCards = this.itemCards.reduce((acc, card) => {
      const status = card.item.status;
      acc[status] = acc[status] || [];
      acc[status].push(card);
      return { ...acc };
    }, {});
    STATUSES.forEach(({ status, x }) => {
      categorisedCards[status] &&
        categorisedCards[status].forEach((card, idx) => {
          card.setPosition(x + 5, 80 + 55 * idx);
          card.setVisible(idx <= 5);
        });
    });
  }

  dayPassing() {
    this.daysRemaining--;
    this.header.setText(`Days remaining: ${this.daysRemaining}`);
    this.updateItemCardPositions();
  }
}
