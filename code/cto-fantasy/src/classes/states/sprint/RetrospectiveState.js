import { shuffle } from "../../../utils/collection";
import { ScrumMaster } from "../../Employee";
import { State } from "../State";

const EARLY_TOPICS = [
  "TECH_TALKS",
  "SOFTWARE_DESIGN",
  "UNIT_TESTING",
  "PAIR_PROGRAMMING",
  "CI_CD",
  "CODE_REVIEW",
];

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
    this.retrospectiveActions = this.getRetrospectiveActions();
    this.emitter.emit("retrospective_actions", this.retrospectiveActions);
    this.scene.launch("RetrospectiveScene", {
      actions: this.retrospectiveActions,
      project: this.project,
      team: this.team,
      onClose: () => {
        this.onClose();
      },
    });
  }

  getRetrospectiveActions() {
    let retrospectiveActions = this.project.attributes.attributesList.filter(
      ({ category, attribute }) => {
        switch (category) {
          case "AGILE":
            return !!this.team.members.find(
              (member) => member instanceof ScrumMaster
            );
          case "QUALITY_ASSURANCE":
            return this.team.testers.length;
          case "SOFTWARE_ENGINEERING":
            if (this.sprint.number < 4) {
              return EARLY_TOPICS.includes(attribute);
            }
            return true;
          default:
            return true;
        }
      }
    );
    retrospectiveActions = shuffle(retrospectiveActions);
    retrospectiveActions.sort((a, b) => a.value - b.value);
    return retrospectiveActions.slice(0, 3);
  }

  exit() {
    this.scene.stop("RetrospectiveScene");
  }
}
