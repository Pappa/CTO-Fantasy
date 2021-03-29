import { State } from "../State";

export class SprintPlanningState extends State {
  card;
  constructor(machine, card, commitment, onClose) {
    super(machine);
    this.card = card;
    this.commitment = commitment;
    this.onClose = onClose;
  }

  enter() {
    this.card.setTitle("Sprint Planning");
    this.card.setDescription(
      `The team have commited to ${this.commitment} points this sprint.`
    );
    this.card.setButton("OK", () => {
      this.onClose();
    });
    this.card.setVisible(true);
  }

  exit() {
    this.card.setVisible(false);
  }
}
