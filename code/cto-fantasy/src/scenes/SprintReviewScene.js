import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";

const DEBUG = process.env.REACT_APP_DEBUG === "on";

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
    this.createEvents();
    this.displayResults();
    this.displayCustomerFeedback();
    this.displayCustomerImage();
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
    this.customerIcon = this.add
      .image(100, 200, "customer_neutral")
      .setScale(0.2)
      .setOrigin(0);
  }

  createEvents() {
    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Enter") {
        this.onClose();
      }
    });
  }

  displayResults() {
    if (DEBUG) {
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
        )} this sprint. What happened?`
      );
    }
    if (features.buggy.length) {
      lines.push(
        `The ${features.buggy.join(" and ")} ${
          features.buggy.length === 1 ? "feature is" : "features are"
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
        x: 250,
        y: 200,
        text: lines.join(" "),
        style: {
          ...theme.mainText,
          align: "left",
          wordWrap: { width: 500, useAdvancedWrap: false },
        },
      })
      .setOrigin(0);
  }

  displayCustomerImage() {
    this.customerIcon.setTexture(
      `customer_${this.customer.satisfaction.overall}`
    );
  }

  //update(time, delta) {}
}
