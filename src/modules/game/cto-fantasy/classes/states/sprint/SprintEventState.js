import { State } from "../State";

export class SprintEventState extends State {
  dialog;
  constructor(fsm, dialog, { text, A, B }) {
    super(fsm);
    this.dialog = dialog;
    this.text = text;
    this.A = A;
    this.B = B;
  }

  enter() {
    this.dialog.getChildByID("description").textContent = this.text;
    const A = this.dialog.getChildByID("A");
    const B = this.dialog.getChildByID("B");
    A.addEventListener("click", this.A);
    B.addEventListener("click", this.B);
    this.dialog.setVisible(true);
  }

  exit() {
    this.dialog.setVisible(false);
  }
}
