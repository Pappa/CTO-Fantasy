import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import {
  getCustomerSatisfaction,
  getProjectSuccessResults,
  getProjectSuccessText,
  getSoftwareDevelopmentPracticeResults,
  getSoftwareDevelopmentPracticesText,
} from "../utils/results";
import * as theme from "../theme";

export class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
  }

  init() {}

  preload() {}

  create({ project, customer, company, team }) {
    this.project = project;
    this.customer = customer;
    this.company = company;
    this.team = team;
    this.createComponents();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const title = "Game Over";

    this.background = new SceneBackground(this, 0, 0, width, height, {
      title,
    });

    // Project success
    const {
      allStories,
      completedStories,
      openBugs,
      unknownBugs,
    } = getProjectSuccessResults(this.project.backlog);

    const numAllStories = allStories.length;
    const numCompletedStories = completedStories.length;
    const numIncompleteStories = numAllStories - numCompletedStories;

    const numOpenBugs = openBugs.length;
    const numUnknownBugs = unknownBugs.length;

    // Discovered Software Development practices
    const attributes = this.project.attributes.attributesList;
    const {
      attributeResults,
      discovered,
      notDiscovered,
      score,
    } = getSoftwareDevelopmentPracticeResults(this.team, attributes);

    const satisfaction = getCustomerSatisfaction(
      numIncompleteStories,
      numOpenBugs,
      numUnknownBugs
    );

    this.add
      .image(75, 100, `customer_${satisfaction}`)
      .setScale(0.2)
      .setOrigin(0);

    this.add.image(75, 350, `attributes_icon`).setScale(0.2).setOrigin(0);

    const projectSuccessText = getProjectSuccessText(
      this.project.sprintsRemaining,
      numAllStories,
      numCompletedStories,
      numIncompleteStories,
      numOpenBugs,
      numUnknownBugs,
      satisfaction
    );

    const softwareDevelopmentPracticesText = getSoftwareDevelopmentPracticesText(
      attributes,
      discovered,
      score
    );

    this.make
      .text({
        x: 200,
        y: 100,
        text: projectSuccessText,
        style: {
          ...theme.mainText,
          wordWrap: { width: 500, useAdvancedWrap: false },
        },
      })
      .setOrigin(0);

    this.make
      .text({
        x: 200,
        y: 350,
        text: softwareDevelopmentPracticesText,
        style: {
          ...theme.mainText,
          wordWrap: { width: 500, useAdvancedWrap: false },
        },
      })
      .setOrigin(0);
  }
}
