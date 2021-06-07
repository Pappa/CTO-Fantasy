import Phaser from "phaser";
import { Card } from "../game-objects/Card";
import { SceneBackground } from "../game-objects/SceneBackground";

export class HiringScene extends Phaser.Scene {
  intro = true;
  constructor() {
    super("HiringScene");
  }

  init() {}

  preload() {}

  create({ candidates, team, project, onClose }) {
    this.candidates = candidates;
    this.team = team;
    this.project = project;
    this.onClose = onClose;
    this.createComponents();
    this.updateCandidates();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.background = new SceneBackground(this, 0, 0, width, height, {
      title: `Time to hire some new people.\nThere are ${this.candidates.length} candidates available.`,
      closeIcon: "complete_icon",
      onClose: () => {
        this.onClose();
      },
    });

    // this.header = this.add
    //   .text(400, 15, " ", {
    //     ...theme.h1,
    //     align: "center",
    //     wordWrap: { width: 500, useAdvancedWrap: true },
    //   })
    //   .setOrigin(0.5, 0);
  }

  updateCandidates() {
    // this.header.setText(
    //   `Time to hire some new people.\nThere are ${this.candidates.length} candidates.`
    // );

    console.log("candidates", this.candidates);

    this.candidatesCards = this.candidates.map((candidate, idx) => {
      const x = -50 + (idx + 1) * 175;
      const isBudgetAvailable = candidate.salary <= this.project.budget;
      const ratings = Array(5).fill("\u2606");
      const candidateRatings = Array(candidate.rating).fill("\u2605");
      ratings.splice(0, candidate.rating, ...candidateRatings);
      const ratingText = ratings.join(" ");
      return this.add.existing(
        new Card(
          this,
          x,
          150,
          {
            title: candidate.name,
            text: `${candidate.type}<br/><br/>${
              candidate.experience
            } years exp.<br/>Salary: £${candidate.salary.toLocaleString()}<br/><br/>${ratingText}`,
            buttonText: isBudgetAvailable ? "Hire" : "Over budget",
            disabled: !isBudgetAvailable,
          },
          this.selectCandidate.bind(this, candidate)
        )
      );
    }, this);
  }

  selectCandidate = (candidate) => {
    console.log("selectCandidate", candidate);
  };
}
