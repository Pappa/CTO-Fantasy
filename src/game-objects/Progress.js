import Phaser from "phaser";

export class Progress extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, { progress }) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.create();
    this.update(progress);
  }

  create() {
    this.box = this.scene.add
      .graphics()
      .fillStyle(0x666666, 0.8)
      .fillRect(0, 0, 104, 14);
    this.bar = this.scene.add.graphics();
    this.add([this.box, this.bar]);
  }

  update(progress) {
    this.bar.clear().fillStyle(0x04af45, 0.8).fillRect(2, 2, progress, 10);
  }
}
