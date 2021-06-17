import Phaser from "phaser";
import { Dialogue } from "../game-objects/Dialogue";
import { SprintBoard } from "../game-objects/SprintBoard";
import { SprintBurndownChart } from "../game-objects/SprintBurndownChart";
import { getFirefightingEvent } from "../utils/sprint";

const DAY_LENGTH = process.env.REACT_APP_DAY_LENGTH || 1200;

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
    this.createDialogue();
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

  createDialogue() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.info = new Dialogue(
      this,
      200,
      200,
      width - 400,
      height - 400,
      {}
    ).hide();
  }

  createTimer() {
    this.sprintTimer = this.time.addEvent({
      delay: DAY_LENGTH,
      callback: this.dayPassing,
      //args: [],
      callbackScope: this,
      repeat: this.sprint.SPRINT_LENGTH,
    });
  }

  dayPassing() {
    // TODO: add firefighting distractions
    // pause the sprintTimer and open a dialog explaining the distraction
    const firefighting = getFirefightingEvent(
      this.project.attributes,
      this.sprint.number
    );
    if (firefighting) {
      this.showDialogue(firefighting);
    }
    if (this.sprintTimer.repeatCount > 0) {
      this.sprint.dayPassing(firefighting);
      this.sprintBoard.dayPassing();
      this.burndown.update();
    } else {
      this.sprint.end();
      this.onClose();
    }
  }

  showDialogue(firefighting) {
    this.sprintTimer.paused = true;
    this.info.updateComponents({
      title: "Firefighting!",
      text: firefighting,
      onAccept: () => {
        this.info.hide();
        this.sprintTimer.paused = false;
      },
    });
    this.info.show();
  }
}
