import { randomInt } from "../utils/random";
import { generateProductFeatures } from "../utils/features";
import { ProductBacklog } from "./ProductBacklog";
import { ProjectAttributes } from "./ProjectAttributes";

export class Project {
  constructor({
    name = "Project Genesis",
    storyPointValues = [1, 2, 3, 5, 8, 13, 20],
    newStoriesPerSprint = 4,
    budget = randomInt(50000, 100000),
    emitter,
    featueGenerator = generateProductFeatures,
  }) {
    this.name = name;
    this.budget = budget;
    this.emitter = emitter;
    this.backlog = new ProductBacklog({
      storyPointValues,
      newStoriesPerSprint,
      emitter,
      featueGenerator,
    });
  }

  init({ customer, team }) {
    this.customer = customer;
    this.team = team;
    this.attributes = new ProjectAttributes({ team });
  }
}
