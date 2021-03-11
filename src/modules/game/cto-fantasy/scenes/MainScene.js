import Phaser from "phaser";
import { Dev, ProductOwner, ScrumMaster, Tester } from "../classes/Employee";
import { randomInt } from "../utils/random";
import * as theme from "../theme";
import { LinearFSM } from "../classes/states/LinearFSM";
import { MeetTheTeamState } from "../classes/states/story/MeetTheTeamState";
import { HiringState } from "../classes/states/story/HiringState";
import { SprintState } from "../classes/states/story/SprintState";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.createStartingEmployees();
    this.createStartingCandidates();
    this.createLinearStory();
    this.budget = randomInt(50000, 100000);
    this.company = this.registry.get("company");
  }

  // executed once, after assets were loaded
  create() {
    console.log(this.team);
    console.log(this.candidates);
    console.log(this.budget);

    this.office = this.add.image(400, 300, "office").setOrigin(0.5);

    this.header = this.add
      .text(15, 550, this.company.name, theme.h1)
      .setOrigin(0);

    this.fsm.next();
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
    this.fsm = new LinearFSM();
    const states = [
      new MeetTheTeamState(this.fsm, this.scene, this.team),
      new HiringState(this.fsm, this.scene, this.candidates),
      new SprintState(this.fsm, this.scene, this.team, []),
      new SprintState(this.fsm, this.scene, this.team, []),
    ];
    this.fsm.add(states);
  }
}
