import Phaser from "phaser";
import { Dev, Tester, ScrumMaster, ProductOwner } from "../classes/Employee";
import { AgileCoach } from "../classes/Consultant";
import { Employee } from "../classes/Employee";
import { Card } from "../game-objects/Card";
import { SceneBackground } from "../game-objects/SceneBackground";
import { pick, randomInt } from "../utils/random";

export class HiringScene extends Phaser.Scene {
  constructor() {
    super("HiringScene");
  }

  create({ team, project, emitter, onClose }) {
    this.team = team;
    this.project = project;
    this.emitter = emitter;
    this.onClose = onClose;
    this.candidates = this.candidates || this.createCandidates();
    this.createComponents();
    this.createEvents();
    this.updateCandidateCards();
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
  }

  createEvents() {
    this.emitter.on("sprint_ended", () => {
      this.candidates = this.createCandidates();
    });

    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Enter") {
        this.onClose();
      }
    });
  }

  createCandidates() {
    const employees = [Dev, Tester, ScrumMaster, ProductOwner].filter(
      (t) =>
        !(t === ProductOwner && this.team.productOwner) &&
        !(t === ScrumMaster && this.team.scrumMaster)
    );
    const currentSprint = this.project.currentSprint;
    if (
      !currentSprint ||
      (currentSprint.number === 1 && !currentSprint.isComplete)
    ) {
      return employees.map((T) => new T({ boost: 1.5 }));
    } else {
      return [
        ...Array(randomInt(2, 4))
          .fill(Dev)
          .map((T) => new T({ boost: 1.5 })),
        ...Array(randomInt(2, 3))
          .fill(null)
          .map(() => pick(employees.filter((e) => !(e instanceof Dev))))
          .map((T) => new T({ boost: 1.5 })),
        new AgileCoach(),
      ];
    }
  }

  updateCandidateCards() {
    this.candidatesCards = this.candidates.map((candidate, idx) => {
      const col = idx % 4;
      const x = 130 + col * 175;
      const y = idx < 4 ? 100 : 340;
      const isBudgetAvailable =
        (candidate.salary || candidate.dailyRate) <= this.project.budget;
      const ratings = Array(5).fill("\u2606");
      const candidateRatings = Array(candidate.rating).fill("\u2605");
      ratings.splice(0, candidate.rating, ...candidateRatings);
      const skillsText = `<br/>${this.getSkillsText(candidate)}<br/>`;
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
            text: `${candidate.type}<br/>${skillsText}${experienceText}${feeText}${contractTerm}<br/><br/>${ratingText}`,
            buttonText: isBudgetAvailable ? "Hire" : "Over budget",
            disabled: !isBudgetAvailable,
          },
          this.selectCandidate.bind(this, candidate)
        )
      );
    }, this);
  }

  selectCandidate = (selection) => {
    if (selection instanceof Employee) {
      this.project.spendBudget(selection.salary);
      this.team.add(selection);
      this.emitter.emit("team_updated");
      this.emitter.emit("stats_updated");
    }
    if (selection instanceof AgileCoach) {
      this.emitter.emit("consultant_hired", selection);
    }
    this.candidates = this.candidates.filter((c) => c !== selection);
    this.onClose();
  };

  getSkillsText = (candidate) => {
    return candidate instanceof Dev
      ? "Builds your app."
      : candidate instanceof Tester
      ? "Improves quality."
      : candidate instanceof ScrumMaster
      ? "Improves Agile practices."
      : candidate instanceof ProductOwner
      ? "Prioritises the customer's needs."
      : "";
  };
}
