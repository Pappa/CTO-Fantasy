import Phaser from "phaser";
import { Dev, ProductOwner, ScrumMaster, Tester } from "../classes/Employee";
import { Card } from "../game-objects/Card";
import { randomInt } from "../utils/random";
import * as theme from "../theme";
import { LinearStory } from "../classes/LinearStory";
import { Chapter } from "../classes/Chapter";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.createStartingEmployees();
    this.createStartingCandidates();
    this.createLinearStory();
    this.budget = randomInt(50000, 100000);
    this.state = MainScene.START;
    this.company = this.registry.get("company");
  }

  // executed once, after assets were loaded
  create() {
    console.log(this.team);
    console.log(this.candidates);
    console.log(this.budget);

    this.header = this.add
      .text(15, 550, this.company.name, theme.h1)
      .setOrigin(0);

    // if (this.state === MainScene.START) {
    //   this.scene.launch("TeamScene", { team: this.team, onClose: () => {} });
    // }
    this.story.play();
  }

  update(time, delta) {}

  createStartingEmployees() {
    const teamSize = this.registry.get("settings").startingTeamSize;
    this.team = Array(teamSize)
      .fill(null)
      .map(() => new Dev());
  }

  createStartingCandidates() {
    const arrayofType = (T, length) =>
      Array(length)
        .fill(null)
        .map(() => new T());
    const scrumMasters = arrayofType(ScrumMaster, randomInt(1, 2));
    const testers = arrayofType(Tester, randomInt(1, 2));
    const productOwners = arrayofType(ProductOwner, randomInt(1, 2));
    const devs = arrayofType(Dev, randomInt(1, 2));
    this.candidates = [scrumMasters, testers, productOwners, devs].flat();
  }

  createLinearStory() {
    const chapters = [
      {
        start: (data, done) => {
          this.scene.launch("TeamScene", {
            team: this.team,
            onClose: () => {
              this.scene.stop("TeamScene");
              done();
            },
          });
        },
        complete: () => {},
      },
      {
        start: (data, done) => {
          this.scene.launch("HiringScene", {
            candidates: this.candidates,
            onClose: () => {
              this.scene.stop("HiringScene");
              done();
            },
          });
        },
        complete: () => {},
      },
    ];
    this.story = new LinearStory(chapters);
  }
}

MainScene.START = "start";
