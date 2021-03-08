export class Chapter {
  constructor(start, complete, data) {
    if (typeof start !== "function") {
      throw new Error("start should be a function");
    }
    if (typeof complete !== "function") {
      throw new Error("complete should be a function");
    }
    this.start = start;
    this.complete = complete;
    this.data = data;
  }
}
