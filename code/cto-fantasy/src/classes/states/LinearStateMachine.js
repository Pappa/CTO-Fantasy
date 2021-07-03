import { State } from "./State";

export class LinearStateMachine {
  queue = [];
  currentState;
  constructor(delay = 1000) {
    this.delay = delay;
  }

  add(input) {
    const states = Array.isArray(input) ? input : [input];
    this.validate(states);
    this.queue.push(...states);
  }

  prepend(input) {
    const states = Array.isArray(input) ? input : [input];
    this.validate(states);
    this.queue.unshift(...states);
  }

  next() {
    if (this.currentState) {
      this.currentState.exit();
    }
    this.currentState = this.queue.shift();
    if (this.currentState) {
      setTimeout(() => {
        if (this.currentState) {
          this.currentState.enter();
        } else {
          console.warn("currentState is not set");
        }
      }, this.currentState.delay ?? this.delay);
    }
  }

  clearQueue() {
    this.queue = [];
  }

  hasNext() {
    return !!this.currentState;
  }

  validate(states) {
    states.forEach((state) => {
      if (!(state instanceof State)) {
        throw new Error("add expects instances of State");
      }
    });
  }
}
