import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";

export class SprintReviewScene extends Phaser.Scene {
  constructor() {
    super("SprintReviewScene");
  }

  init() {}

  preload() {}

  create({ team, customer, project, results, onClose }) {
    this.team = team;
    this.customer = customer;
    this.project = project;
    this.results = results;
    this.onClose = onClose;
    this.createComponents();
    this.displayResults();
    this.displayCustomerFeedback();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.background = new SceneBackground(this, 0, 0, width, height, {
      title: "Sprint Review",
      closeIcon: "close_icon",
      onClose: () => {
        this.onClose();
      },
    });
  }

  displayResults() {
    Object.entries(this.results)
      .filter(([k, v]) => ["commitment", "velocity", "success"].includes(k))
      .forEach(([k, v], idx) => {
        this.make
          .text({
            x: 100,
            y: 50 + 20 * (idx + 1),
            text: `${k}: ${JSON.stringify(v)}`,
            style: theme.mainText,
          })
          .setOrigin(0);
      }, this);
  }

  displayCustomerFeedback() {
    const features = this.customer.satisfaction.features;
    const lines = [];
    if (features.complete.length) {
      lines.push(
        `It's great ${features.complete.join(" and ")} ${
          features.complete.length === 1 ? "was" : "were"
        } deployed this sprint.`
      );
      if (features.incomplete.length) {
        lines.push(
          `But, I was hoping to see progress on ${features.incomplete.join(
            " and "
          )}.`
        );
      }
    } else {
      lines.push(
        `The team didin't complete any work on ${this.customer.priorities.join(
          " and "
        )} this sprint.\n\nWhat happened?`
      );
    }
    if (features.bugs.length) {
      lines.push(
        `The ${features.bugs.join(" and ")} ${
          features.bugs.length === 1 ? "feature is" : "features are"
        } a bit buggy.`
      );
    }
    if (!this.customer.satisfaction.bugs) {
      lines.push(
        "The application is really quite buggy. The team need work on quality."
      );
    }

    this.make
      .text({
        x: 150,
        y: 150,
        text: lines.join("\n\n"),
        style: {
          ...theme.mainText,
          align: "left",
          wordWrap: { width: 500, useAdvancedWrap: true },
        },
      })
      .setOrigin(0);
  }

  //update(time, delta) {}
}
