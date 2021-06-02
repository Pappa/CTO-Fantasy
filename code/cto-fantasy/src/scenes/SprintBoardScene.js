import Phaser from "phaser";
import { SprintBoard } from "../game-objects/SprintBoard";
import { SprintBurndownChart } from "../game-objects/SprintBurndownChart";

export class SprintBoardScene extends Phaser.Scene {
  constructor() {
    super("SprintBoardScene");
  }

  create({ project, sprint, emitter, onClose }) {
    this.project = project;
    this.sprint = sprint;
    this.emitter = emitter;
    this.onClose = onClose;
    this.daysRemaining = this.sprint.SPRINT_LENGTH;
    this.createSprintBoard();
    this.createBurndown();
    this.createTimer();
  }

  createSprintBoard() {
    this.sprintBoard = new SprintBoard(this, 100, 140, { sprint: this.sprint });
  }

  createBurndown() {
    this.burndown = new SprintBurndownChart(this, 600, 20, {
      sprint: this.sprint,
    });
  }

  createTimer() {
    this.sprintTimer = this.time.addEvent({
      delay: 1200,
      callback: this.dayPassing,
      //args: [],
      callbackScope: this,
      repeat: this.sprint.SPRINT_LENGTH,
    });
  }

  dayPassing() {
    this.sprint.workOnItems();
    this.sprintBoard.dayPassing();
    this.burndown.update();
    if (this.sprintTimer.repeatCount === 0) {
      this.onClose();
    }
  }
}
