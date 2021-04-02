import Phaser from "phaser";
import { Card } from "../game-objects/Card";
import * as theme from "../theme";

export class HiringScene extends Phaser.Scene {
  intro = true;
  constructor() {
    super("HiringScene");
  }

  init() {}

  preload() {}

  create({ candidates, onClose }) {
    this.candidates = candidates;
    this.onClose = onClose;
    this.createComponents();
    this.updateCandidates();
  }

  update(time, delta) {}

  createComponents() {
    this.header = this.add.text(400, 15, " ", theme.h1).setOrigin(0.5, 0);
    this.close = this.add
      .text(760, 15, "X", theme.x)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
      });
  }

  updateCandidates() {
    this.header.setText(
      `Time to hire some new people.\nThere are ${this.candidates.length} candidates.`
    );

    this.candidatesCards = this.candidates.map((candidate, idx) => {
      const x = -50 + (idx + 1) * 175;
      return this.add.existing(
        new Card(
          this,
          x,
          150,
          {
            title: candidate.name,
            text: candidate.type,
          } /*,
          this.selectCandidate.bind(this, candidate)*/
        )
      );
    }, this);
  }

  selectCandidate(candidate) {
    console.log(candidate);
  }
}
