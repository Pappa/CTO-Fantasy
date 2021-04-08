import Phaser from "phaser";
import { Dev, ProductOwner, ScrumMaster, Tester } from "../classes/Employee";
import { LinearStateMachine } from "../classes/states/LinearStateMachine";
import { SprintState } from "../classes/states/story/SprintState";
import { Team } from "../classes/Team";
import { Project } from "../classes/Project";
import { Customer } from "../classes/Customer";
import { Hud } from "../game-objects/Hud";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.project = new Project();
    this.customer = new Customer();
    this.createStartingEmployees();
    this.createStartingCandidates();
    this.createLinearStory();
    this.company = this.registry.get("company");
    console.log(this.project);
  }

  // executed once, after assets were loaded
  create() {
    this.office = this.add.image(400, 300, "office").setOrigin(0.5);

    this.hud = this.add.existing(
      new Hud(this, 15, 15, {
        company: this.company,
        project: this.project,
        team: this.team,
      })
    );

    this.createMenu();

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
      new SprintState(this.machine, this.scene, this.team, this.customer, []),
      new SprintState(this.machine, this.scene, this.team, this.customer, []),
      new SprintState(this.machine, this.scene, this.team, this.customer, []),
    ];
    this.machine.add(states);
  }

  createMenu() {
    const menuItems = [
      { icon: "team_icon", scene: "TeamScene" },
      { icon: "recruiter_icon", scene: "HiringScene" },
      { icon: "customer_icon", scene: "CustomerScene" },
      { icon: "backlog_icon", scene: "BacklogScene" },
    ];
    const scenes = menuItems.map(({ scene }) => scene);
    menuItems.forEach(({ icon, scene }, idx) => {
      this.add
        .image(725, 30 + idx * 100, icon)
        .setOrigin(0)
        .setScale(0.1)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          if (this.scene.isActive(scene)) {
            this.scene.stop(scene);
          } else {
            scenes.forEach((s) => {
              if (this.scene.isActive(s)) {
                this.scene.stop(s);
              }
              this.scene.launch(scene, {
                team: this.team,
                candidates: this.candidates,
                onClose: () => {
                  this.scene.stop(scene);
                },
              });
            });
          }
        });
    });
  }
}
