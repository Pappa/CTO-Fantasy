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
    config = {},
    settings = {},
  }) {
    this.name = name;
    this.budget = budget;
    this.emitter = emitter;
    this.config = config;
    this.settings = settings;
    this.backlog = new ProductBacklog({
      storyPointValues,
      newStoriesPerSprint,
      emitter,
      featueGenerator,
    });
    this.createEvents();
  }

  init({ customer, team }) {
    this.customer = customer;
    this.team = team;
    this.attributes = new ProjectAttributes({
      team,
      customer,
      config: this.config,
      emitter: this.emitter,
    });
  }

  createEvents() {
    this.emitter.on(
      "retrospective_actions",
      this.updateRetrospectiveActions,
      this
    );
  }

  updateRetrospectiveActions(actions) {
    this.team.updateRetrospectiveActions(
      actions,
      this.settings.STAT_INCREASE_AMMOUNT,
      () => {
        this.emitter.emit("stats_updated");
      }
    );
  }
}
