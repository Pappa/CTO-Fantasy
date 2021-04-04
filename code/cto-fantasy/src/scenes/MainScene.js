import Phaser from "phaser";
import { Dev, ProductOwner, ScrumMaster, Tester } from "../classes/Employee";
import { randomInt } from "../utils/random";
import * as theme from "../theme";
import { LinearStateMachine } from "../classes/states/LinearStateMachine";
import { MeetTheTeamState } from "../classes/states/story/MeetTheTeamState";
import { HiringState } from "../classes/states/story/HiringState";
import { SprintState } from "../classes/states/story/SprintState";
import { Team } from "../classes/Team";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.createStartingEmployees();
    this.createStartingCandidates();
    this.createLinearStory();
    this.company = this.registry.get("company");
  }

  // executed once, after assets were loaded
  create() {
    this.office = this.add.image(400, 300, "office").setOrigin(0.5);

    this.header = this.add
      .text(15, 550, this.company.name, theme.h1)
      .setOrigin(0);

    this.machine.next();
  }

  update(time, delta) {}

  createStartingEmployees() {
    const teamSize = this.registry.get("settings").STARTING_TEAM_SIZE;
    this.team = new Team();
    Array(teamSize)
      .fill(null)
      .forEach(() => {
        this.team.add(new Dev());
      });
  }

  createStartingCandidates() {
    this.candidates = [
      new Dev(),
      new Tester(),
      new ScrumMaster(),
      new ProductOwner(),
    ];
  }

  createLinearStory() {
    this.machine = new LinearStateMachine();
    const states = [
      new MeetTheTeamState(this.machine, this.scene, this.team),
      new HiringState(this.machine, this.scene, this.candidates),
      new SprintState(this.machine, this.scene, this.team, []),
      new SprintState(this.machine, this.scene, this.team, []),
    ];
    this.machine.add(states);
  }
}
