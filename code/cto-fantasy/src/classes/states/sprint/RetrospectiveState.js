import { State } from "../State";

export class RetrospectiveState extends State {
  constructor(machine, scene, { project, team, sprint, emitter, onClose }) {
    super(machine, scene);
    this.project = project;
    this.team = team;
    this.sprint = sprint;
    this.emitter = emitter;
    this.onClose = onClose;
  }

  enter() {
    console.log("Retrospective");
    console.log("project attributes", this.project.attributes.attributes);
    console.log(
      "project attributes list",
      this.project.attributes.attributesList
    );
    this.onClose();
  }

  exit() {}
}
