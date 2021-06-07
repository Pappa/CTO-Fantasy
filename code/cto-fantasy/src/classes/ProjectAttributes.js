import { generateProjectAttributes } from "../utils/project";

export class ProjectAttributes {
  constructor({ team, customer, config = {}, emitter }) {
    this.team = team;
    this.customer = customer;
    this.emitter = emitter;
    this.updateAttributes();
    this.createEvents();
  }

  createEvents() {
    this.emitter.on("stats_updated", this.updateAttributes, this);
  }

  updateAttributes() {
    console.log("updateAttributes");
    this.attributes = generateProjectAttributes(this.team, this.customer);
    this.attributesList = Object.entries(this.attributes).reduce(
      (acc, [category, attributes]) => {
        Object.entries(attributes).forEach(
          ([attribute, { name, stats, value }]) => {
            acc.push({ category, attribute, name, stats, value });
          }
        );
        return acc;
      },
      []
    );
  }
}
