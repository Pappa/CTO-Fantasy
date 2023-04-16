import Phaser from "phaser";

export class Form extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, content = {}, callback) {
    super(scene, x, y);

    this.form = this.scene.add
      .dom(0, 0)
      .createFromCache("form")
      .setOrigin(0.5, 0);
    this.add(this.form);

    this.form.getChildByID("title").textContent = content.title;
    this.form.getChildByID("description").innerHTML = content.text;

    this.setButton(content.buttonText, content.disabled, callback);

    this.scene.add.existing(this);
  }

  setButton(text, disabled, callback) {
    const button = this.form.getChildByID("submit");
    button.textContent = text;
    button.disabled = !!disabled;
    button.addEventListener("click", callback);
    button.style.display = "inline";
  }
}
