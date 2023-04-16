import Phaser from "phaser";
import * as theme from "../theme";
import { SprintBoardItem } from "./SprintBoardItem";

const STATUSES = [
  { status: "TODO", text: "To do", x: 0 },
  { status: "IN_PROGRESS", text: "In progress", x: 110 },
  { status: "DONE", text: "Done", x: 220 },
];
const STATUS_X_POSITIONS = STATUSES.reduce((acc, { status, x }) => {
  return { ...acc, [status]: x };
}, {});

export class SprintBoard extends Phaser.GameObjects.Container {
  height = 440;
  constructor(scene, x = 0, y = 0, width, { sprint }) {
    super(scene, x, y);
    this.sprint = sprint;
    this.width = width;
    this.cardStartY = 80;
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
    const colWidth = this.width / 3;

    this.columnHeaders = STATUSES.map(({ status, text, x }, idx) => {
      return {
        status,
        text: this.scene.make
          .text({
            x: colWidth * idx + colWidth / 2,
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
      this.cardStartY,
      {
        item,
      }
    );
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
          card.setPosition(x + 5, this.cardStartY + 55 * idx);
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
