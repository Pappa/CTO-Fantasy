import Phaser from "phaser";
import { UserStory } from "../classes/WorkItem";
import { sum } from "../utils/number";

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

    this.guideline = this.scene.make
      .graphics()
      .lineStyle(1, 0x000000, 1.0)
      .beginPath()
      .moveTo(0, 0)
      .lineTo(100, 100)
      .closePath()
      .strokePath();
    this.graph = this.scene.make.graphics();

    // const polygon = new Phaser.Geom.Polygon([0, 0, 200, 200]);
    // this.guideline.fillPoints(polygon.points, true);

    this.add([this.background, this.guideline, this.graph]);
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

    console.log("totalPoints", this.totalPoints);
    console.log("runningTotalPoints", this.runningTotalPoints);
    this.drawGraph();
  }

  drawGraph() {}
}
