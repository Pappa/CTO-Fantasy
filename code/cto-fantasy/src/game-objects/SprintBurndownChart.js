import Phaser from "phaser";
import { UserStory } from "../classes/WorkItem";
import { sum } from "../utils/number";
import * as theme from "../theme";

export class SprintBurndownChart extends Phaser.GameObjects.Container {
  width = 100;
  height = 100;
  constructor(scene, x = 0, y = 0, { sprint }) {
    super(scene, x, y);
    this.sprint = sprint;
    this.scene.add.existing(this);
    this.setStartingValues();
    this.createComponents();
  }

  createComponents() {
    this.background = this.scene.make
      .graphics()
      .fillStyle(0xffffff, 1.0)
      .lineStyle(1, 0x000000, 1.0)
      .strokeRect(0, 0, this.width, this.height)
      .fillRect(0, 0, this.width, this.height);

    this.header = this.scene.make
      .text({
        x: 50,
        y: 20,
        text: "Burndown\n Chart",
        style: theme.burndownTitle,
      })
      .setOrigin(0.5, 0.5);

    this.guideline = this.scene.make
      .graphics()
      .lineStyle(1, 0x000000, 1.0)
      .beginPath()
      .moveTo(0, 0)
      .lineTo(100, 100)
      .closePath()
      .strokePath();

    this.graph = this.scene.make
      .graphics()
      .lineStyle(3, 0x04af45, 1.0)
      .moveTo(0, 0)
      .strokePath();

    this.add([this.background, this.guideline, this.graph, this.header]);
  }

  setStartingValues() {
    this.totalPoints = sum(
      this.sprint.sprintBacklog
        .filter(
          (item) => item instanceof UserStory && item.estimate && item.visible()
        )
        .map(({ estimate }) => estimate)
    );
    this.runningTotalPoints = [];
  }

  update() {
    const totalDone = sum(
      this.sprint.sprintBacklog
        .filter(
          (item) =>
            item instanceof UserStory &&
            item.estimate &&
            item.done() &&
            item.visible()
        )
        .map(({ estimate }) => estimate)
    );

    this.runningTotalPoints.push(totalDone);

    this.drawGraph();
  }

  drawGraph() {
    const points = this.runningTotalPoints.map((total, idx) => [
      (idx + 1) * 10,
      (total / this.totalPoints) * 100,
    ]);

    this.graph.moveTo(0, 0);

    points.forEach(([x, y]) => {
      this.graph.lineTo(x, y);
    });

    this.graph.strokePath();
  }
}
