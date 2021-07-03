import Phaser from "phaser";
import { Dev } from "../classes/Employee";
import { LinearStateMachine } from "../classes/states/LinearStateMachine";
import { navigationStateFactory } from "../classes/states/NavigationState";
import { clickToContinueStateFactory } from "../classes/states/ClickToContinueState";
import { Team } from "../classes/Team";
import { Project } from "../classes/Project";
import { Customer } from "../classes/Customer";
import { Hud } from "../game-objects/Hud";
import { Button } from "../game-objects/Button";
import { range } from "../utils/collection";
import { NavigationMenu } from "../game-objects/NavigationMenu";
import { RefinementState } from "../classes/states/sprint/RefinementState";
import { createTeamFromPresets } from "../utils/team";

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

    const {
      STORY_POINT_VALUES,
      NUMBER_OF_NEW_STORIES_PER_SPRINT,
    } = this.registry.get("settings");
    this.project = new Project({
      storyPointValues: STORY_POINT_VALUES,
      newStoriesPerSprint: NUMBER_OF_NEW_STORIES_PER_SPRINT,
      emitter: this.emitter,
      settings: this.registry.get("settings"),
    });
    this.modules = {
      emitter: this.emitter,
      project: this.project,
      customer: new Customer({
        emitter: this.emitter,
        project: this.project,
      }),
      company: this.registry.get("company"),
      team: this.createTeam(),
    };
    this.project.init(this.modules);
    this.createNextButton();
    this.createLinearStory();
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
    this.hud = this.add.existing(new Hud(this, 15, 15, this.modules));
  }

  createNextButton() {
    this.nextButton = this.add.existing(
      new Button(this, this.centreX, this.height - 50)
    );
    this.nextButton.hide();
  }

  createTeam() {
    const teamSize = this.registry.get("settings").STARTING_TEAM_SIZE;
    const presets = this.registry.get("presets");
    if (presets.team && presets.team.length) {
      return createTeamFromPresets(presets.team);
    }
    return new Team(range(teamSize + 1).map(() => new Dev()));
  }

  createLinearStory() {
    const numberOfSprints = this.registry.get("settings").NUMBER_OF_SPRINTS;
    this.machine = new LinearStateMachine();
    this.stateFactory = navigationStateFactory(
      this.machine,
      this.scene,
      this.modules
    );
    this.clickStateFactory = clickToContinueStateFactory(
      this.machine,
      this.scene,
      this.nextButton
    );
    const states = range(1, numberOfSprints + 1)
      .map((sprintNo) => {
        return [
          new RefinementState(this.machine, this.scene, {
            emitter: this.emitter,
            team: this.modules.team,
            project: this.modules.project,
          }),
          this.clickStateFactory({
            text: `Start the ${sprintNo === 1 ? "first" : "next"} sprint.`,
          }),
          this.stateFactory(
            "SprintScene",
            {
              onClose: () => {
                this.machine.next();
              },
            },
            0
          ),
        ];
      })
      .flat();
    this.machine.add(states);
    this.machine.add(this.stateFactory("EndScene"));
  }

  createMenu() {
    this.menu = new NavigationMenu(this, 740, 60, this.modules);
  }
}
