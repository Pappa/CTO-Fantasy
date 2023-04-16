import Phaser from "phaser";
import { UserStory, Bug, WorkItem } from "../classes/WorkItem";
import * as theme from "../theme";
import { truncate } from "../utils/strings";

export class BacklogItem extends Phaser.GameObjects.Container {
  height = 25;
  margin = 5;
  constructor(
    scene,
    x = 0,
    y = 0,
    width = 0,
    { item, project, emitter, mask, move, parent }
  ) {
    super(scene, x, y);
    this.width = width;
    this.item = item;
    this.project = project;
    this.emitter = emitter;
    this.move = move;
    this.parent = parent;
    this.storyPointValues = this.project.backlog.storyPointValues;
    this.lastIndex = this.storyPointValues.length - 1;
    this.createComponents();

    this.setSize(this.width, this.height);
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(
        this.width / 2,
        this.height / 2,
        this.width,
        this.height
      ),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
      draggable: true,
    });

    this.mask = new Phaser.Display.Masks.GeometryMask(scene, mask);
  }

  createComponents() {
    this.background = this.scene.make
      .image({
        x: 0,
        y: 0,
        key: "mid_grey",
        scale: {
          x: this.width,
          y: this.height,
        },
      })
      .setOrigin(0);
    this.workItemId = this.scene.make
      .text({
        x: this.margin,
        y: this.margin,
        text: `${this.item.id}`,
        style:
          this.item instanceof UserStory
            ? theme.backlogIdStory
            : this.item instanceof Bug
            ? theme.backlogIdBug
            : theme.backlogItemTitle,
      })
      .setOrigin(0);
    this.title = this.scene.make
      .text({
        x: 55,
        y: this.margin,
        text: truncate(this.item.title, 25),
        style: theme.backlogItemTitle,
      })
      .setOrigin(0);
    this.estimate = this.scene.make
      .text({
        x: this.width - 54 - this.margin,
        y: this.margin,
        text: `${this.item.estimate || "-"}`,
        style: theme.backlogEstimate,
      })
      .setOrigin(1, 0)
      .setVisible(this.item.type === WorkItem.TYPE.STORY);

    this.upArrow = this.scene.make
      .image({
        x: this.width - 36 - this.margin,
        y: this.height / 2,
        key: "up_arrow",
        scale: 0.7,
      })
      .setOrigin(1, 0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", this.move.bind(this.parent, this, 1));
    this.downArrow = this.scene.make
      .image({
        x: this.width - 18 - this.margin,
        y: this.height / 2,
        key: "down_arrow",
        scale: 0.7,
      })
      .setOrigin(1, 0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", this.move.bind(this.parent, this, -1));
    this.topArrow = this.scene.make
      .image({
        x: this.width - this.margin,
        y: this.height / 2,
        key: "top_arrow",
        scale: 0.7,
      })
      .setOrigin(1, 0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", this.move.bind(this.parent, this, 0));
    this.add([
      this.background,
      this.workItemId,
      this.title,
      this.estimate,
      this.upArrow,
      this.downArrow,
      this.topArrow,
    ]);
  }
}
