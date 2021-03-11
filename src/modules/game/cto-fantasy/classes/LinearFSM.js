import { State } from "./State";

export class LinearFSM {
  queue = [];
  currentState = null;
  constructor(delay = 1000) {
    this.delay = delay;
  }

  add(input) {
    const states = Array.isArray(input) ? input : [input];
    states.forEach((state) => {
      if (!this.isValid(state)) {
        throw new Error("add expects instances of State");
      }
      this.queue.push(state);
    });
  }

  next() {
    if (this.currentState) {
      this.currentState.exit();
      this.queue.shift();
    }
    if (this.queue.length) {
      this.currentState = this.queue[0];
      setTimeout(() => {
        this.currentState.enter();
      }, this.currentState.delay || this.delay);
    }
  }

  isValid(state) {
    return state instanceof State;
  }
}
