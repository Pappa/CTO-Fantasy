import { State } from "../State";

export class MeetTheTeamState extends State {
  team;
  scene;
  constructor(machine, scene, team) {
    super(machine);
    this.team = team;
    this.scene = scene;
  }

  enter() {
    this.scene.launch("TeamScene", {
      team: this.team,
      onClose: () => {
        this.machine.next();
      },
    });
  }

  exit() {
    this.scene.stop("TeamScene");
  }
}
