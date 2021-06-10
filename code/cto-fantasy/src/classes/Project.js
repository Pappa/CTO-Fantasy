import { randomInt } from "../utils/random";
import { generateProductFeatures } from "../utils/features";
import { ProductBacklog } from "./ProductBacklog";
import { ProjectAttributes } from "./ProjectAttributes";
import { AgileCoach } from "./Consultant";

export class Project {
  constructor({
    name = "Project Genesis",
    storyPointValues = [1, 2, 3, 5, 8, 13, 20],
    newStoriesPerSprint = 4,
    budget = randomInt(50000, 70000),
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
    this.currentSprint = null;
    this.consultants = [];
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
    this.emitter.on("consultant_hired", this.consultantHired, this);
  }

  setCurrentSprint(sprint) {
    this.currentSprint = sprint;
  }

  updateRetrospectiveActions(actions) {
    // TODO: add distractions to next sprint
    // to account for the team spending time
    // on improvements
    this.team.updateRetrospectiveActions(
      actions,
      this.settings.STAT_INCREASE_AMMOUNT,
      () => {
        this.emitter.emit("stats_updated");
      }
    );
  }

  spendBudget(amount) {
    this.budget -= amount;
    this.emitter.emit("project_updated");
  }

  consultantHired(consultant) {
    this.consultants.push(consultant);
    this.emitter.once("sprint_ended", () => {
      if (consultant instanceof AgileCoach) {
        this.team.coach(consultant);
      }
      this.emitter.emit("stats_updated");
      this.removeConsultant(consultant);
    });
  }

  removeConsultant(consultant) {
    this.consultants = this.consultants.filter((c) => c !== consultant);
  }
}
