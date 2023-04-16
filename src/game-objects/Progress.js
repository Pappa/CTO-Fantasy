import Phaser from "phaser";

export class Progress extends Phaser.GameObjects.Container {
  margin = 2;
  constructor(scene, x = 0, y = 0, width = 104, height = 14, { progress }) {
    super(scene, x, y);
    this.width = width;
    this.height = height;
    this.barMaxWidth = this.width - this.margin * 2;
    this.barHeight = this.height - this.margin * 2;
    this.scene.add.existing(this);

    this.create();
    this.update(progress);
  }

  create() {
    this.box = this.scene.add
      .graphics()
      .fillStyle(0x666666, 0.8)
      .fillRect(0, 0, this.width, this.height);
    this.bar = this.scene.add.graphics();
    this.add([this.box, this.bar]);
  }

  update(progress) {
    const width = this.barMaxWidth * progress;
    this.bar
      .clear()
      .fillStyle(0x04af45, 0.8)
      .fillRect(this.margin, this.margin, width, this.barHeight);
  }
}
