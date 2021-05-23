import Phaser from "phaser";
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
    this.background = this.add
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(10, 10, width - 20, height - 20)
      .strokeRoundedRect(10, 10, width - 20, height - 20);

    this.header = this.add
      .text(400, 15, "Sprint Review", theme.h1)
      .setOrigin(0.5, 0);
    this.close = this.add
      .image(760, 20, "close_icon")
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
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
        `It's great ${features.complete.join(" and ")}\n${
          features.complete.length === 1 ? "was" : "were"
        } deployed this sprint.`
      );
      if (features.incomplete.length) {
        lines.push(
          `But, I was hoping to see progress on\n${features.incomplete.join(
            " and "
          )}.`
        );
      }
    } else {
      lines.push(
        `The team didin't complete any work on\n${this.customer.priorities.join(
          " and "
        )} this sprint.\n\nWhat happened?`
      );
    }
    if (features.bugs.length) {
      lines.push(
        `The ${features.bugs.join(" and ")}\n${
          features.bugs.length === 1 ? "feature is" : "features are"
        } a bit buggy.`
      );
    }
    if (!this.customer.satisfaction.bugs) {
      lines.push(
        "The application is really quite buggy.\nThe team need work on quality."
      );
    }

    this.make
      .text({
        x: 200,
        y: 260,
        text: lines.join("\n\n"),
        style: theme.mainText,
      })
      .setOrigin(0);
  }

  //update(time, delta) {}
}
