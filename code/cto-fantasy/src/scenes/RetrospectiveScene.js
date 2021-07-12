import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";
import { PROJECT_ATTRIBUTES_TEXT } from "../utils/project";
import { arrayToTextList } from "../utils/strings";

export class RetrospectiveScene extends Phaser.Scene {
  constructor() {
    super("RetrospectiveScene");
  }

  init() {}

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
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.background = new SceneBackground(this, 0, 0, width, height, {
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
        x: 150,
        y: 150,
        text: `The team discussed ${actionsString}, and have decided to try to make improvements in these areas next sprint.`,
        style: {
          ...theme.mainText,
          align: "left",
          wordWrap: { width: 500, useAdvancedWrap: false },
        },
      })
      .setOrigin(0);
  }
}
