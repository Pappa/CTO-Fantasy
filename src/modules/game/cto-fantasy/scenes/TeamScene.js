import Phaser from "phaser";
import { Card } from "../game-objects/Card";
import * as theme from "../theme";

export class TeamScene extends Phaser.Scene {
  constructor() {
    super("TeamScene");
  }

  init() {}

  preload() {}

  create(team) {
    this.team = team;
    this.createComponents();
    this.meetTheTeam();
  }

  update(time, delta) {}

  createComponents() {
    this.header = this.add.text(400, 15, " ", theme.h1).setOrigin(0.5, 0);
    this.close = this.add
      .text(780, 10, "X", theme.x)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.scene.stop();
      });
  }

  meetTheTeam() {
    const name = this.registry.get("name");
    const company = this.registry.get("company");
    this.header.setText(
      `Welcome to ${company.name} ${name}! Come and meet the team.`
    );

    this.teamCards = this.team.map((member, idx) => {
      const x = -50 + (idx + 1) * 175;
      return this.add.existing(
        new Card(this, x, 150, {
          title: member.name,
          text: member.type,
        })
      );
    }, this);
  }
}
