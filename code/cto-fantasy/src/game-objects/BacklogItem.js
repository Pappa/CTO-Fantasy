import Phaser from "phaser";
import * as theme from "../theme";

export class BacklogItem extends Phaser.GameObjects.Container {
  width = 560;
  height = 25;
  constructor(scene, x = 0, y = 0, { item }) {
    super(scene, x, y);
    console.log("BacklogItem", x, y);
    this.item = item;
    //this.scene.add.existing(this);

    this.createComponents();

    this.setSize(this.width, this.height);
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(x, y, this.width, this.height),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
    });

    // {
    //     hitArea: shape,
    //     hitAreaCallback: callback,
    //     draggable: false,
    //     dropZone: false,
    //     useHandCursor: false,
    //     cursor: CSSString,
    //     pixelPerfect: false,
    //     alphaTolerance: 1
    // }

    this.scene.input.setDraggable(this);
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
      .setOrigin(0, 0.5);
    this.workItemId = this.scene.make
      .text({
        x: 20,
        y: 2,
        text: `${this.item.id}`,
        style: theme.mainText,
      })
      .setOrigin(0, 0.5);
    this.title = this.scene.make
      .text({
        x: 100,
        y: 2,
        text: `${this.item.title}`,
        style: theme.mainText,
      })
      .setOrigin(0, 0.5);
    // this.input = this.scene.add
    //   .dom(530, 1)
    //   .createFromCache("estimate_input")
    //   .setOrigin(0, 0.5);
    // if (this.item.estimate) {
    //   this.input.getChildByName(".estimate").textContent = this.item.estimate;
    // }
    this.add([this.background, this.workItemId, this.title /*, this.input*/]);
  }
}
