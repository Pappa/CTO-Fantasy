import { generateProjectAttributes } from "../utils/project";

const PROJECT_ATTRIBUTE_CATEGORIES = [
  "AGILE",
  "QUALITY_ASSURANCE",
  "SOFTWARE_ENGINEERING",
];

// TODO: these are currently random
// the values should depend on the values of the team, org, etc..

export class ProjectAttributes {
  constructor(config = {}) {
    this.attributes = generateProjectAttributes();
    PROJECT_ATTRIBUTE_CATEGORIES.forEach((c) => {
      this.attributes[c] = {
        ...this.attributes[c],
        ...config[c],
      };
    });
  }
}

PROJECT_ATTRIBUTE_CATEGORIES.forEach((c) => {
  ProjectAttributes[c] = c;
});
