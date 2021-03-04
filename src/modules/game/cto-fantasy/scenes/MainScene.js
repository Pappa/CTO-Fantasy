import Phaser from "phaser";
import { Dev, ProductOwner, ScrumMaster, Tester } from "../classes/Employee";
import { randomInt } from "../utils/random";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.createStartingEmployees();
    this.createStartingCandidates();
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
}
