import { generateProjectAttributes } from "../utils/project";

const PROJECT_ATTRIBUTE_CATEGORIES = [
  "AGILE",
  "QUALITY_ASSURANCE",
  "SOFTWARE_ENGINEERING",
];

// TODO: these are currently random
// the values should depend on the values of the team, org, etc..

export class ProjectAttributes {
  constructor({ team, config = {}, emitter }) {
    this.team = team;
    this.emitter = emitter;
    this.attributes = generateProjectAttributes(team);
    // console.log("attributes", JSON.stringify(this.attributes, null, 4));
    // PROJECT_ATTRIBUTE_CATEGORIES.forEach((c) => {
    //   this.attributes[c] = {
    //     ...this.attributes[c],
    //     ...config[c],
    //   };
    // });
    this.createEvents();
  }

  createEvents() {
    this.emitter.on("team_updated", this.updateAttributes, this);
  }

  updateAttributes() {
    // TODO
  }
}

PROJECT_ATTRIBUTE_CATEGORIES.forEach((c) => {
  ProjectAttributes[c] = c;
});
