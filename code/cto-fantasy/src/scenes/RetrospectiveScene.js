import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";
import { PROJECT_ATTRIBUTES_TEXT } from "../utils/project";
import { arrayToTextList } from "../utils/strings";

export class RetrospectiveScene extends Phaser.Scene {
  constructor() {
    super("RetrospectiveScene");
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.margin = 20;
    this.centreX = this.width / 2;
    this.centreY = this.height / 2;
  }

  preload() {}

  create({ team, project, actions, onClose }) {
    this.team = team;
    this.project = project;
    this.actions = actions;
    this.onClose = onClose;
    this.createComponents();
    this.createEvents();
    this.displayActions();
  }

  createComponents() {
    this.background = new SceneBackground(this, 0, 0, this.width, this.height, {
      title: "Sprint Retrospective",
      closeIcon: "close_icon",
      onClose: () => {
        this.onClose();
      },
    });
  }

  createEvents() {
    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Enter") {
        this.onClose();
      }
    });
  }

  displayActions() {
    const actionsString = arrayToTextList(
      this.actions.map(
        ({ attribute }) => PROJECT_ATTRIBUTES_TEXT[attribute].name
      )
    );
    this.make
      .text({
        x: this.centreX,
        y: 100,
        text: `The team discussed ${actionsString}, and have decided to try to make improvements in these areas next sprint.`,
        style: {
          ...theme.mainText,
          wordWrap: {
            width: this.width - this.margin * 2,
            useAdvancedWrap: false,
          },
        },
      })
      .setOrigin(0.5, 0);
  }
}
