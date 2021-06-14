import Phaser from "phaser";
import * as theme from "../theme";
import { noop } from "../utils/function";
import { Button } from "./Button";

export class Dialogue extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x = 0,
    y = 0,
    width = 400,
    height = 400,
    { title, text, onAccept, onCancel } = {
      title: "",
      text: "",
      onAccept: noop,
      onCancel: noop,
    }
  ) {
    super(scene, x, y);
    this.width = width;
    this.height = height;
    this.onAccept = onAccept;
    this.onCancel = onCancel;
    this.scene.add.existing(this);

    this.createComponents();
    this.updateComponents({ title, text, onAccept, onCancel });
  }

  createComponents() {
    this.background = this.scene.add
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(0, 0, this.width, this.height)
      .strokeRoundedRect(0, 0, this.width, this.height);

    this.title = this.scene.add
      .text(this.width / 2, 15, " ", theme.h2)
      .setOrigin(0.5, 0);
    this.text = this.scene.add
      .text(this.width / 2, 40, " ", {
        ...theme.mediumText,
        wordWrap: { width: this.width - 20, useAdvancedWrap: true },
      })
      .setOrigin(0.5, 0);

    this.onAccept = new Button(this.scene, this.width / 4, this.height - 40, {
      text: "OK",
    });
    this.onCancel = new Button(
      this.scene,
      (this.width / 4) * 3,
      this.height - 40,
      {
        text: "Cancel",
      }
    );

    this.add([
      this.background,
      this.title,
      this.text,
      this.onAccept,
      this.onCancel,
    ]);
  }

  updateComponents({ title = " ", text = " ", onAccept, onCancel }) {
    this.title.setText(title);
    this.text.setText(text);
    this.onAccept.update({ callback: onAccept || noop });
    this.onCancel.update({ callback: onCancel || noop });
    if (onAccept && onCancel) {
      this.onAccept.setVisible(true).x = this.width / 4;
      this.onCancel.setVisible(true).x = (this.width / 4) * 3;
    }
    if (onAccept && !onCancel) {
      this.onAccept.setVisible(true).x = this.width / 2;
      this.onCancel.setVisible(false);
    }
    if (!onAccept && onCancel) {
      this.onAccept.setVisible(false);
      this.onCancel.setVisible(true).x = this.width / 2;
    }
  }

  show() {
    return this.setVisible(true);
  }

  hide() {
    return this.setVisible(false);
  }
}
