import * as EmployeeTypes from "../classes/Employee";
import { Team } from "../classes/Team";

export const createTeamFromPresets = (team) => {
  return new Team(
    team.map((member) => new EmployeeTypes[member.type](member.config))
  );
};
