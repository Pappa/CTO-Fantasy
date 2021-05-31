import { generateProjectAttributes } from "../utils/project";

const PROJECT_ATTRIBUTE_CATEGORIES = [
  "AGILE",
  "QUALITY_ASSURANCE",
  "SOFTWARE_ENGINEERING",
];

export class ProjectAttributes {
  constructor(config = {}) {
    this.attributes = {};
    PROJECT_ATTRIBUTE_CATEGORIES.forEach((c) => {
      this.attributes[c] = {
        ...generateProjectAttributes(c),
        ...config[c],
      };
    });
  }
}

PROJECT_ATTRIBUTE_CATEGORIES.forEach((c) => {
  ProjectAttributes[c] = c;
});
