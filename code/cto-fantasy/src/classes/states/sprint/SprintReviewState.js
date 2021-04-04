import { State } from "../State";

export class SprintReviewState extends State {
  card;
  constructor(machine, scene, results, onClose) {
    super(machine);
    this.scene = scene;
    this.results = results;
    this.onClose = onClose;
  }

  enter() {
    this.scene.launch("SprintReviewScene", {
      results: this.results,
      onClose: () => {
        this.machine.next();
      },
    });
  }

  exit() {
    this.scene.stop("SprintReviewScene");
  }

  // enter() {
  //   const { commitment, velocity } = this.results;
  //   const success = (velocity / commitment) * 100;
  //   const fail = 100 - success;
  //   this.card.getChildByID(
  //     "description"
  //   ).textContent = `The team achieved ${this.results.velocity} points this sprint.`;
  //   this.card.getChildByID("success").style.width = `${success}px`;
  //   this.card.getChildByID("fail").style.width = `${fail}px`;
  //   this.close = this.card.getChildByID("close");
  //   this.close.addEventListener("click", this.handleClick.bind(this), true);
  //   this.card.setVisible(true);
  // }

  // exit() {
  //   this.card.setVisible(false);
  // }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Calling onClose from SprintResultsState");
    console.log(e.target);
    this.onClose();
  }
}
