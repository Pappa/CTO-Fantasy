import { randomInt } from "../utils/random";
import { generateProductFeatures } from "../utils/features";
import { ProductBacklog } from "./ProductBacklog";

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

  setCustomer(customer) {
    this.customer = customer;
  }

  setTeam(team) {
    this.team = team;
  }
}
