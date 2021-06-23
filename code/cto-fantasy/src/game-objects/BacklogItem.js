import Phaser from "phaser";
import { UserStory, Bug, WorkItem } from "../classes/WorkItem";
import * as theme from "../theme";
import { truncate } from "../utils/strings";

export class BacklogItem extends Phaser.GameObjects.Container {
  width = 560;
  height = 25;
  constructor(scene, x = 0, y = 0, { item, project, emitter }) {
    super(scene, x, y);
    this.item = item;
    this.project = project;
    this.emitter = emitter;
    this.storyPointValues = this.project.backlog.storyPointValues;
    this.lastIndex = this.storyPointValues.length - 1;
    //this.scene.add.existing(this);

    this.createComponents();
    //this.updateArrows();

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

    // this.upArrow = this.scene.make
    //   .image({
    //     x: 545,
    //     y: 4,
    //     key: "up_arrow",
    //     scale: 0.5,
    //   })
    //   .setOrigin(0)
    //   .setInteractive({ useHandCursor: true })
    //   .on("pointerdown", this.updateEstimate.bind(null, 1));
    // this.downArrow = this.scene.make
    //   .image({
    //     x: 545,
    //     y: 16,
    //     key: "down_arrow",
    //     scale: 0.5,
    //   })
    //   .setOrigin(0)
    //   .setInteractive({ useHandCursor: true })
    //   .on("pointerdown", this.updateEstimate.bind(null, -1));
    this.add([
      this.background,
      this.workItemId,
      this.title,
      this.estimate,
      // this.upArrow,
      // this.downArrow,
    ]);
  }

  // updateArrows() {
  //   if (this.item.estimate === this.storyPointValues[this.lastIndex]) {
  //     this.upArrow.setTint(0x999999).disableInteractive();
  //   } else {
  //     this.upArrow.clearTint().setInteractive();
  //   }
  //   if (
  //     !this.item.estimate ||
  //     this.item.estimate === this.storyPointValues[0]
  //   ) {
  //     this.downArrow.setTint(0x999999).disableInteractive();
  //   } else {
  //     this.downArrow.clearTint().setInteractive();
  //   }
  // }

  updateEstimate = (direction) => {
    const idx = this.storyPointValues.indexOf(this.item.estimate);
    let estimate;
    if (direction > 0 && idx < this.lastIndex) {
      estimate = this.storyPointValues[idx + 1];
    }
    if (direction < 0 && idx > 0) {
      estimate = this.storyPointValues[idx - 1];
    }
    if (estimate) {
      this.estimate.setText(estimate);
      this.emitter.emit("update_estimate", this.item, estimate);
      //this.updateArrows();
    }
  };
}
