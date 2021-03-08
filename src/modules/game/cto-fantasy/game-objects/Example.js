import Phaser from "phaser";

export class Example extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y);

    this.form = this.scene.add.dom(300, 400).createFromCache("card");
    this.form.addedToScene((x) => console.log("added", x));
    const name = this.form.getChildByName("title");
    //name.setText("Some text");
  }
}
