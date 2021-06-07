import { generateProjectAttributes } from "../utils/project";

const PROJECT_ATTRIBUTE_CATEGORIES = [
  "AGILE",
  "QUALITY_ASSURANCE",
  "SOFTWARE_ENGINEERING",
];

// TODO: these are currently random
// the values should depend on the values of the team, org, etc..

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
    this.attributes = generateProjectAttributes(this.team, this.customer);
    this.attributesList = Object.entries(this.attributes).reduce(
      (acc, [category, attributes]) => {
        Object.entries(attributes).forEach(([attribute, { name, value }]) => {
          acc.push({ category, attribute, name, value });
        });
        return acc;
      },
      []
    );
  }
}

PROJECT_ATTRIBUTE_CATEGORIES.forEach((c) => {
  ProjectAttributes[c] = c;
});
