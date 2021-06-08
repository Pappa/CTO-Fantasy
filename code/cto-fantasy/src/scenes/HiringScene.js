import Phaser from "phaser";
import { Consultant } from "../classes/Consultant";
import { Employee } from "../classes/Employee";
import { Card } from "../game-objects/Card";
import { SceneBackground } from "../game-objects/SceneBackground";

export class HiringScene extends Phaser.Scene {
  intro = true;
  constructor() {
    super("HiringScene");
  }

  init() {}

  preload() {}

  create({ candidates, team, project, emitter, onClose }) {
    this.candidates = this.candidates || candidates;
    this.team = team;
    this.project = project;
    this.emitter = emitter;
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
      const col = idx % 4;
      const x = 130 + col * 175;
      const y = idx < 4 ? 100 : 340;
      const isBudgetAvailable =
        (candidate.salary || candidate.dailyRate) <= this.project.budget;
      const ratings = Array(5).fill("\u2606");
      const candidateRatings = Array(candidate.rating).fill("\u2605");
      ratings.splice(0, candidate.rating, ...candidateRatings);
      const ratingText = ratings.join(" ");
      const experienceText =
        candidate instanceof Employee
          ? `<br/>${candidate.experience} years exp.`
          : "";
      const feeText = candidate.salary
        ? `<br/>Salary: £${candidate.salary.toLocaleString()}`
        : `<br/>Daily rate: £${candidate.dailyRate.toLocaleString()}`;
      const contractTerm = candidate.contractTerm
        ? `<br/>Contract term: ${candidate.contractTerm} days.`
        : "";
      return this.add.existing(
        new Card(
          this,
          x,
          y,
          {
            title: candidate.name,
            text: `${candidate.type}<br/>${experienceText}${feeText}${contractTerm}<br/><br/>${ratingText}`,
            buttonText: isBudgetAvailable ? "Hire" : "Over budget",
            disabled: !isBudgetAvailable,
          },
          this.selectCandidate.bind(this, candidate)
        )
      );
    }, this);
  }

  selectCandidate = (candidate) => {
    if (candidate instanceof Employee) {
      this.project.spendBudget(candidate.salary);
      this.team.add(candidate);
      this.emitter.emit("stats_updated");
    }
    if (candidate instanceof Consultant) {
      // TODO: add consultant and effects of that
      console.log("Consultant");
    }
    // TODO: update this to modify the global candidates (on modules)
    this.candidates = this.candidates.filter((c) => c !== candidate);
    this.onClose();
  };
}
