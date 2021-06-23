import { pick, randomInt } from "../utils/random";
import { generateProductFeatures } from "../utils/features";
import { ProductBacklog } from "./ProductBacklog";
import { ProjectAttributes } from "./ProjectAttributes";
import { AgileCoach } from "./Consultant";
import { range } from "../utils/collection";
import { SPRINT_LENGTH } from "./Sprint";

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
    this.workshops = {};
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
    this.emitter.on("workshop_organised", this.workshopOrganised, this);
    this.emitter.on("workshop_done", this.doWorkshop, this);
  }

  setCurrentSprint(sprint) {
    this.currentSprint = sprint;
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

  workshopOrganised(workshop, day) {
    if (this.workshops[day]) {
      console.error(
        `Workshop already present on day ${day}`,
        this.workshops,
        workshop
      );
    }
    this.workshops[day] = workshop;
  }

  removeConsultant(consultant) {
    this.consultants = this.consultants.filter((c) => c !== consultant);
  }

  doWorkshop(workshop, day) {
    const ammounts = this.settings.WORKSHOP_STAT_INCREASE_AMMOUNTS;
    this.team.workshop(workshop, ammounts);
    delete this.workshops[day];
    this.emitter.emit("stats_updated");
  }

  getFreeWorkshopDay() {
    return pick(range(1, SPRINT_LENGTH + 1).filter((x) => !this.workshops[x]));
  }
}
