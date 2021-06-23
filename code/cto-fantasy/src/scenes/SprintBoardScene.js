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
    this.sprintTimer.paused = true;
    this.info.updateComponents({
      title,
      text,
      onAccept: () => {
        this.info.hide();
        this.sprintTimer.paused = false;
        onClose();
        next();
      },
    });
    this.info.show();
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
