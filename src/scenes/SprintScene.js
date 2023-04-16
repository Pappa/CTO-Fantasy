import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import { Card } from "../game-objects/Card";
import { LinearStateMachine } from "../classes/states/LinearStateMachine";
import * as theme from "../theme";
import { navigationStateFactory } from "../classes/states/NavigationState";
import { Sprint } from "../classes/Sprint";
import { RefinementState } from "../classes/states/sprint/RefinementState";
import { RetrospectiveState } from "../classes/states/sprint/RetrospectiveState";
import { CheckProjectStatusState } from "../classes/states/sprint/CheckProjectStatusState";

export class SprintScene extends Phaser.Scene {
  constructor() {
    super("SprintScene");
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.centreX = this.width / 2;
    this.centreY = this.height / 2;
  }

  preload() {}

  create({ team, customer, project, events = [], emitter, onClose }) {
    this.team = team;
    this.customer = customer;
    this.project = project;
    this.events = events;
    this.emitter = emitter;
    this.onClose = onClose;
    this.createSprint();
    this.createComponents();
    this.createEvents();
  }

  createSprint() {
    const newSprintNo = this.registry.inc("sprintNumber").get("sprintNumber");
    this.sprint = new Sprint({
      number: newSprintNo,
      project: this.project,
      registry: this.registry,
      emitter: this.emitter,
    });
    this.project.setCurrentSprint(this.sprint);
  }

  createComponents() {
    this.background = new SceneBackground(this, 0, 0, this.width, this.height, {
      title: `Sprint ${this.sprint.number}`,
    });
    this.eventDialog = this.add
      .dom(this.centreX, this.centreY)
      .createFromCache("event")
      .setOrigin(0.5)
      .setVisible(false);
    this.card = this.add.existing(new Card(this, 400, 150)).setVisible(false);
  }

  createEvents() {
    this.machine = new LinearStateMachine();
    this.stateFactory = navigationStateFactory(this.machine, this.scene, {
      team: this.team,
      customer: this.customer,
      project: this.project,
      emitter: this.emitter,
    });
    this.events = [
      new CheckProjectStatusState(this.machine, this.scene, {
        team: this.team,
        customer: this.customer,
        project: this.project,
        emitter: this.emitter,
      }),
      new RefinementState(this.machine, this.scene, {
        emitter: this.emitter,
        team: this.team,
        project: this.project,
      }),
      this.stateFactory(
        "ProductBacklogScene",
        {
          sprint: this.sprint,
          onClose: () => {
            this.handleEvents();
          },
        },
        0
      ),
      this.stateFactory("SprintBoardScene", {
        sprint: this.sprint,
        onClose: () => {
          this.emitter.emit("sprint_ended", {
            sprintBacklog: this.sprint.sprintBacklog,
            sprintNumber: this.sprint.number,
          });
          this.handleEvents();
        },
      }),
    ];
    // const randomEvents = this.getRandomSprintEvents();
    // this.events.push(...randomEvents);
    this.machine.add(this.events);
    this.machine.next();
  }

  handleEvents() {
    this.machine.next();
    if (!this.machine.currentState) {
      const results = this.calculateResults();
      this.machine.add([
        this.stateFactory("SprintReviewScene", {
          results,
          onClose: () => {
            this.emitter.emit("update_customer_priorities");
            this.emitter.emit("create_more_stories");
            this.machine.next();
          },
        }),
        new RetrospectiveState(this.machine, this.scene, {
          emitter: this.emitter,
          team: this.team,
          project: this.project,
          sprint: this.sprint,
          onClose: () => {
            this.emitter.emit("retrospective_ended", {
              sprintNumber: this.sprint.number,
            });
            this.machine.next();
            this.onClose();
          },
        }),
      ]);
      this.machine.next();
    }
  }

  calculateResults() {
    const results = this.sprint.getResults();
    // these calls modify `results`
    this.customer.update(results);
    this.team.update(results);
    return { ...results, customerSatisfaction: this.customer.satisfaction };
  }
}
