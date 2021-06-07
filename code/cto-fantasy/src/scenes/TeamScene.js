import Phaser from "phaser";
import { Card } from "../game-objects/Card";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";

export class TeamScene extends Phaser.Scene {
  intro = true;
  constructor() {
    super("TeamScene");
  }

  init() {}

  preload() {}

  create({ team, onClose }) {
    this.team = team;
    this.onClose = onClose;
    this.createComponents();
    this.meetTheTeam();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const name = this.registry.get("name");
    const company = this.registry.get("company");
    const title = this.intro
      ? `Welcome to ${company.name} ${name}!\nCome and meet the team.`
      : `The ${company.name} team.`;

    this.intro = false;
    this.background = new SceneBackground(this, 0, 0, width, height, {
      title,
      closeIcon: "complete_icon",
      onClose: () => {
        this.onClose();
      },
    });
  }

  meetTheTeam() {
    this.teamCards = this.team.members.map((member, idx) => {
      const x = -50 + (idx + 1) * 175;
      const ratings = Array(5).fill("\u2606");
      const memberRatings = Array(member.rating).fill("\u2605");
      ratings.splice(0, member.rating, ...memberRatings);
      const ratingText = ratings.join(" ");
      return this.add.existing(
        new Card(this, x, 150, {
          title: member.name,
          text: `${member.type}<br/><br/>${
            member.experience
          } years exp.<br/>Salary: £${member.salary.toLocaleString()}<br/><br/>${ratingText}`,
        })
      );
    }, this);
  }
}
