import { CtoFantasy } from "./CtoFantasy";
import poorTeam from "./presets/team/poor.json";
import averageTeam from "./presets/team/average.json";
import goodTeam from "./presets/team/good.json";

const team = {
  poor: poorTeam,
  average: averageTeam,
  good: goodTeam,
};

const presets = {
  team: team[process.env.REACT_APP_TEAM], // poor | average | good
};

const game = new CtoFantasy(presets);

// for debugging
window.game = game;
