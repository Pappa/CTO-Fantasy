import Phaser from "phaser";
import { Dialogue } from "../game-objects/Dialogue";
import { SprintBoard } from "../game-objects/SprintBoard";
import { SprintBurndownChart } from "../game-objects/SprintBurndownChart";
import { noop } from "../utils/function";
import { getFirefightingEvent } from "../utils/sprint";
import { arrayToTextList } from "../utils/strings";

const DAY_LENGTH = process.env.REACT_APP_DAY_LENGTH || 1200;

export class SprintBoardScene extends Phaser.Scene {
  constructor() {
    super("SprintBoardScene");
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.margin = 10;
    this.centreX = this.width / 2;
    this.centreY = this.height / 2;
  }

  preload() {}

  create({ project, sprint, emitter, onClose }) {
    this.project = project;
    this.sprint = sprint;
    this.emitter = emitter;
    this.onClose = onClose;
    this.daysRemaining = this.sprint.SPRINT_LENGTH;
    this.dialogueQueue = [];
    this.createSprintBoard();
    this.createBurndown();
    this.createDialogue();
    this.createTimer();
  }

  createSprintBoard() {
    this.sprintBoard = new SprintBoard(
      this,
      this.margin,
      150,
      this.width - this.margin * 2,
      {
        sprint: this.sprint,
      }
    );
  }

  createBurndown() {
    this.burndown = new SprintBurndownChart(this, this.width - 120, 20, {
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
    const firefighting = getFirefightingEvent(
      this.project.attributes,
      this.sprint.number
    );
    if (firefighting) {
      this.queueDialogue({ title: "Firefighting!", text: firefighting });
    }
    // cache current day for onClose
    const currentDay = this.sprint.day;
    const workshop = this.getWorkshop(currentDay);
    if (workshop) {
      this.queueDialogue({
        title: "Workshop",
        text: `Today's ${
          workshop.name
        } workshop has helped improve the team's ${this.getStatsText(
          workshop.stats
        )}.`,
        onClose: () => this.emitter.emit("workshop_done", workshop, currentDay),
      });
    }
    this.showDialogues();
    if (this.sprintTimer.repeatCount > 0) {
      this.sprint.dayPassing(firefighting, workshop);
      this.sprintBoard.dayPassing();
      this.burndown.update();
    } else {
      this.sprint.end();
      this.onClose();
    }
  }

  queueDialogue(dialogue) {
    this.dialogueQueue.push(dialogue);
  }

  showDialogues() {
    if (this.dialogueQueue.length) {
      const dialogue = this.dialogueQueue.shift();
      this.showDialogue(dialogue, () => this.showDialogues());
    }
  }

  showDialogue({ title, text, onClose = noop }, next) {
    const closeDialogue = this.closeDialogue.bind(this, onClose, next);
    this.sprintTimer.paused = true;
    this.info.updateComponents({
      title,
      text,
      onAccept: () => {
        this.input.keyboard.off("keydown", closeDialogue);
        closeDialogue();
      },
    });
    this.info.show();
    this.input.keyboard.once("keydown", closeDialogue);
  }

  closeDialogue(onClose, next) {
    this.info.hide();
    this.sprintTimer.paused = false;
    onClose();
    next();
  }

  getWorkshop(day) {
    return this.project.workshops[day];
  }

  getStatsText(stats) {
    return arrayToTextList(
      stats.map((stat) => stat.replace(/([A-Z])/g, " $1").toLowerCase())
    );
  }
}
