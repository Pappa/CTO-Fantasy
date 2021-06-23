import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import { Progress } from "../game-objects/Progress";
import * as theme from "../theme";
import { Dialogue } from "../game-objects/Dialogue";
import { PROJECT_ATTRIBUTES_TEXT } from "../utils/project";
import { arrayToTextList } from "../utils/strings";

const DEBUG = process.env.REACT_APP_DEBUG === "on";

export class AttributesScene extends Phaser.Scene {
  constructor() {
    super("AttributesScene");
  }

  init() {}

  preload() {}

  create({ customer, project, emitter, onClose }) {
    this.customer = customer;
    this.project = project;
    this.emitter = emitter;
    this.onClose = onClose;
    this.createComponents();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.background = new SceneBackground(this, 0, 0, width, height, {
      title: "Software Development Practices",
      closeIcon: "close_icon",
      onClose: () => {
        this.onClose();
      },
    });

    this.attributes = this.project.attributes.attributesList
      .filter(
        ({ attribute, value }) =>
          DEBUG || value > 0 || this.project.team.hasDiscovered(attribute)
      )
      .map(({ category, attribute, value, stats }, idx) => {
        const y = 75 + 20 * (idx + 1);
        return [
          this.make
            .text({
              x: 235,
              y,
              text: `${PROJECT_ATTRIBUTES_TEXT[attribute].name}`,
              style:
                value === 0 && DEBUG
                  ? theme.attributeTextDebug
                  : theme.attributeText,
            })
            .setVisible(value > 0 || DEBUG)
            .setOrigin(0),
          new Progress(this, 465, y, {
            progress: value * 100,
          }),
          this.make
            .image({
              x: 580,
              y,
              key: "information_icon",
            })
            .setOrigin(0)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
              this.showInfoDialogue(attribute, stats);
            }),
          this.make
            .image({
              x: 600,
              y,
              key: "teach_icon",
            })
            .setOrigin(0)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
              this.showWorkshopDialogue(attribute, stats);
            }),
          // TODO: add an icon to do a workshop here
          // open a dialog and if the user confirms
          // add distractions and improvements next sprint
        ].flat();
      });
    this.info = new Dialogue(
      this,
      200,
      200,
      width - 400,
      height - 400,
      {}
    ).hide();
  }

  showInfoDialogue(attribute, stats) {
    const { name, description } = PROJECT_ATTRIBUTES_TEXT[attribute];
    this.info.updateComponents({
      title: name,
      text: `${description}\n\n${this.getAttributeExplanation(name, stats)}`,
      onAccept: () => {
        this.info.hide();
      },
    });
    this.info.show();
  }

  showWorkshopDialogue(attribute, stats) {
    const { name } = PROJECT_ATTRIBUTES_TEXT[attribute];
    this.info.updateComponents({
      title: `${name} workshop`,
      text: this.getWorkshopExplanation(name, stats),
      onAccept: () => {
        this.info.hide();
        const day = this.project.getFreeWorkshopDay();
        if (day === undefined) {
          this.showNoFreeDaysDialogue();
        } else {
          this.emitter.emit(
            "workshop_organised",
            {
              name,
              stats,
            },
            day
          );
        }
      },
      onCancel: () => {
        this.info.hide();
      },
    });
    this.info.show();
  }

  showNoFreeDaysDialogue() {
    this.info.updateComponents({
      title: `Workshop`,
      text: `Sorry, you cannot arrange any more workshops next sprint.`,
      onAccept: () => {
        this.info.hide();
      },
    });
    this.info.show();
  }

  getAttributeExplanation(name, stats) {
    return `The quality of ${name} is affected by the team's ${this.getStatsText(
      stats
    )}.`;
  }

  getWorkshopExplanation(name, stats) {
    return `Run a ${name} workshop with the team next sprint.\n\nThis will help improve the team's ${this.getStatsText(
      stats
    )}.`;
  }

  getStatsText(stats) {
    return arrayToTextList(
      stats.map((stat) => stat.replace(/([A-Z])/g, " $1").toLowerCase())
    );
  }
}
