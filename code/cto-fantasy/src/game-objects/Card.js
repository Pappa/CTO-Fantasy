import Phaser from "phaser";

export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, content = {}) {
    super(scene, x, y);

    this.form = this.scene.add
      .dom(0, 0)
      .createFromCache("card")
      .setOrigin(0.5, 0);
    this.add(this.form);

    this.form.getChildByID("title").textContent = content.title;
    this.form.getChildByID("description").innerHTML = content.text;

    this.scene.add.existing(this);
  }
}
