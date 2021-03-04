import Phaser from "phaser";
import { Dev, ProductOwner, ScrumMaster, Tester } from "../classes/Employee";
import { Card } from "../game-objects/Card";
import { randomInt } from "../utils/random";
import * as theme from "../theme";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.createStartingEmployees();
    this.createStartingCandidates();
    this.budget = randomInt(50000, 100000);
  }

  // load assets
  preload() {
    // this.load.image("background", "assets/images/background-city.png");
    // this.load.audio("treeAudio", "assets/audio/arbol.mp3");
  }

  // executed once, after assets were loaded
  create() {
    console.log(this.team);
    console.log(this.candidates);
    console.log(this.budget);
    this.createComponents();
    this.meetTheTeam();
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

  createComponents() {
    this.header = this.add.text(400, 15, " ", theme.h1).setOrigin(0.5, 0);
  }

  meetTheTeam() {
    const name = this.registry.get("name");
    const company = this.registry.get("company");
    this.header.setText(
      `Welcome to ${company.name} ${name}! Come and meet the team.`
    );

    this.teamObjects = this.team.map((member, idx) => {
      const x = -50 + (idx + 1) * 175;
      return this.add.existing(
        new Card(this, x, 150, {
          title: member.name,
          text: " ",
        })
      );
    }, this);
  }
}
