import Phaser from "phaser";
import { UserStory, Bug, WorkItem } from "../classes/WorkItem";
import * as theme from "../theme";
import { truncate } from "../utils/strings";

export class BacklogItem extends Phaser.GameObjects.Container {
  width = 560;
  height = 25;
  constructor(
    scene,
    x = 0,
    y = 0,
    { item, project, emitter, mask, move, parent }
  ) {
    super(scene, x, y);
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
        this.width / 2 - 30,
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
        x: 20,
        y: 3,
        text: `${this.item.id}`,
        style:
          this.item instanceof UserStory
            ? theme.backlogItemStory
            : this.item instanceof Bug
            ? theme.backlogItemBug
            : theme.mainText,
      })
      .setOrigin(0);
    this.title = this.scene.make
      .text({
        x: 100,
        y: 3,
        text: truncate(this.item.title, 37),
        style: theme.mainText,
      })
      .setOrigin(0);
    this.estimate = this.scene.make
      .text({
        x: 510,
        y: 3,
        text: `${this.item.estimate || "-"}`,
        style: theme.estimate,
      })
      .setOrigin(0)
      .setVisible(this.item.type === WorkItem.TYPE.STORY);

    this.upArrow = this.scene.make
      .image({
        x: 530,
        y: 4,
        key: "up_arrow",
        scale: 0.5,
      })
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", this.move.bind(this.parent, this, 1));
    this.downArrow = this.scene.make
      .image({
        x: 530,
        y: 16,
        key: "down_arrow",
        scale: 0.5,
      })
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", this.move.bind(this.parent, this, -1));
    this.topArrow = this.scene.make
      .image({
        x: 545,
        y: 2,
        key: "top_arrow",
        scale: 0.6,
      })
      .setOrigin(0)
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
