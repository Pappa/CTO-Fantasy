import Phaser from "phaser";
import { Dev, ProductOwner, ScrumMaster, Tester } from "../classes/Employee";
import { LinearStateMachine } from "../classes/states/LinearStateMachine";
import { navigationStateFactory } from "../classes/states/NavigationState";
import { clickToContinueStateFactory } from "../classes/states/ClickToContinueState";
import { Team } from "../classes/Team";
import { Project } from "../classes/Project";
import { Customer } from "../classes/Customer";
import { Hud } from "../game-objects/Hud";
import { Button } from "../game-objects/Button";
import { range } from "../utils/collection";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.centreX = this.width / 2;
    this.centreY = this.height / 2;
    this.emitter = this.events;
    const storyPointValues = this.registry.get("STORY_POINT_VALUES");
    this.project = new Project({ storyPointValues, emitter: this.emitter });
    this.customer = new Customer({
      emitter: this.emitter,
      project: this.project,
    });
    this.createStartingEmployees();
    this.createStartingCandidates();
    this.createNextButton();
    this.createLinearStory();
    this.createEvents();
    this.company = this.registry.get("company");
  }

  // executed once, after assets were loaded
  create() {
    this.office = this.add.image(400, 300, "office").setOrigin(0.5);

    this.createHud();
    this.createMenu();

    this.emitter.emit("update_customer_priorities");

    this.machine.next();
  }

  createHud() {
    this.hud = this.add.existing(
      new Hud(this, 15, 15, {
        company: this.company,
        project: this.project,
        team: this.team,
      })
    );
  }

  createNextButton() {
    this.nextButton = this.add.existing(
      new Button(this, this.centreX, this.height - 50)
    );
    this.nextButton.hide();
  }

  createEvents() {
    this.emitter.on("customer_priorities_updated", (priorities) => {
      // TODO show notification over customer_icon
      console.log("priorities", priorities);
    });
  }

  update(time, delta) {
    this.hud.update();
  }

  createStartingEmployees() {
    const teamSize = this.registry.get("settings").STARTING_TEAM_SIZE;
    this.team = new Team();
    range(teamSize + 1).forEach(() => {
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
    const numberOfSprints = this.registry.get("settings").NUMBER_OF_SPRINTS;
    this.machine = new LinearStateMachine();
    this.stateFactory = navigationStateFactory(this.machine, this.scene, {
      team: this.team,
      customer: this.customer,
      project: this.project,
      emitter: this.emitter,
    });
    this.clickStateFactory = clickToContinueStateFactory(
      this.machine,
      this.scene,
      this.nextButton
    );
    const states = range(1, numberOfSprints + 1)
      .map((sprintNo) => {
        return [
          this.clickStateFactory({
            text: `Start the ${sprintNo === 1 ? "first" : "next"} sprint.`,
          }),
          this.stateFactory("SprintScene", {
            onClose: () => {
              this.machine.next();
            },
          }),
        ];
      })
      .flat();
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
                customer: this.customer,
                project: this.project,
                emitter: this.emitter,
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
