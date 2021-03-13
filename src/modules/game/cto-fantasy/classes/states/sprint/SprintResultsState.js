import { State } from "../State";

export class SprintResultsState extends State {
  card;
  constructor(machine, card, results, onClose) {
    super(machine);
    this.card = card;
    this.results = results;
    this.onClose = onClose;
  }

  enter() {
    const { commitment, velocity } = this.results;
    const success = (velocity / commitment) * 100;
    const fail = 100 - success;
    this.card.getChildByID(
      "description"
    ).textContent = `The team achieved ${this.results.velocity} points this sprint.`;
    this.card.getChildByID("success").style.width = `${success}px`;
    this.card.getChildByID("fail").style.width = `${fail}px`;
    this.close = this.card.getChildByID("close");
    this.close.addEventListener("click", this.handleClick.bind(this), true);
    this.card.setVisible(true);
  }

  exit() {
    this.card.setVisible(false);
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Calling onClose from SprintResultsState");
    console.log(e.target);
    this.onClose();
  }
}
