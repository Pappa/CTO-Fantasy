import Phaser from "phaser";
import { Card } from "../game-objects/Card";
import { SceneBackground } from "../game-objects/SceneBackground";

export class TeamScene extends Phaser.Scene {
  intro = true;
  constructor() {
    super("TeamScene");
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.centreX = this.width / 2;
    this.centreY = this.height / 2;
  }

  preload() {}

  create({ team, onClose }) {
    this.team = team;
    this.onClose = onClose;
    this.createComponents();
    this.createEvents();
    this.meetTheTeam();
  }

  createComponents() {
    const name = this.registry.get("name");
    const company = this.registry.get("company");
    const title = this.intro
      ? `Welcome to ${company.name} ${name}!\nCome and meet the team.`
      : `The ${company.name} team`;

    this.intro = false;
    this.background = new SceneBackground(this, 0, 0, this.width, this.height, {
      title,
      closeIcon: "complete_icon",
      onClose: () => {
        this.onClose();
      },
    });
  }

  createEvents() {
    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Enter") {
        this.onClose();
      }
    });
  }

  meetTheTeam() {
    this.teamCards = this.team.members.map((member, idx) => {
      const x = idx % 2 === 0 ? this.centreX + 80 : this.centreX - 80;
      const y = Math.floor(idx / 2) * 190 + 100;
      const ratings = Array(5).fill("\u2606");
      const memberRatings = Array(member.rating).fill("\u2605");
      ratings.splice(0, member.rating, ...memberRatings);
      const skillsText = `<br/>${member.function}<br/>`;
      const ratingText = ratings.join(" ");
      return this.add.existing(
        new Card(this, x, y, {
          title: member.name,
          text: `${member.type}<br/>${skillsText}<br/>${
            member.experience
          } years exp.<br/>Salary: £${member.salary.toLocaleString()}<br/><br/>${ratingText}`,
        })
      );
    }, this);
  }
}
