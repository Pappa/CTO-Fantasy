import { State } from "../State";

export class MeetTheTeamState extends State {
  team;
  scene;
  constructor(fsm, scene, team) {
    super(fsm);
    this.team = team;
    this.scene = scene;
  }

  enter() {
    this.scene.launch("TeamScene", {
      team: this.team,
      onClose: () => {
        this.fsm.next();
      },
    });
  }

  exit() {
    this.scene.stop("TeamScene");
  }
}
