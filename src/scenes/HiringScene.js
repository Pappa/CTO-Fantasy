import Phaser from "phaser";
import { Dev, Tester, ScrumMaster, ProductOwner } from "../classes/Employee";
import { AgileCoach } from "../classes/Consultant";
import { Employee } from "../classes/Employee";
import { Form } from "../game-objects/Form";
import { SceneBackground } from "../game-objects/SceneBackground";
import { pick, randomInt } from "../utils/random";

export class HiringScene extends Phaser.Scene {
  constructor() {
    super("HiringScene");
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.centreX = this.width / 2;
    this.centreY = this.height / 2;
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
    this.background = new SceneBackground(this, 0, 0, this.width, this.height, {
      title: `There are ${this.candidates.length} candidates\navailable to hire.`,
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
      const x = idx % 2 === 0 ? this.centreX + 80 : this.centreX - 80;
      const y = Math.floor(idx / 2) * 220 + 100;
      const isBudgetAvailable =
        (candidate.salary || candidate.dailyRate) <= this.project.budget;
      const ratings = Array(5).fill("\u2606");
      const candidateRatings = Array(candidate.rating).fill("\u2605");
      ratings.splice(0, candidate.rating, ...candidateRatings);
      const skillsText = `<br/>${candidate.function}<br/>`;
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
        new Form(
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
}
