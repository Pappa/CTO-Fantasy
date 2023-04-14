import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { VacanciesScene } from "./scenes/VacanciesScene";
import { MainScene } from "./scenes/MainScene";
import settings from "./config.json";
import { TeamScene } from "./scenes/TeamScene";
import { HiringScene } from "./scenes/HiringScene";
import { SprintScene } from "./scenes/SprintScene";
import { SprintReviewScene } from "./scenes/SprintReviewScene";
import { ProductBacklogScene } from "./scenes/ProductBacklogScene";
import { CustomerScene } from "./scenes/CustomerScene";
import { SprintBoardScene } from "./scenes/SprintBoardScene";
import { AttributesScene } from "./scenes/AttributesScene";
import { RetrospectiveScene } from "./scenes/RetrospectiveScene";
import { EndScene } from "./scenes/EndScene";

export class CtoFantasy {
  constructor(presets = {}) {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 360,
      height: 780,
      parent: "game-container",
      pixelArt: true,
      scene: [
        BootScene,
        VacanciesScene,
        MainScene,
        SprintBoardScene,
        TeamScene,
        HiringScene,
        SprintScene,
        SprintReviewScene,
        ProductBacklogScene,
        CustomerScene,
        AttributesScene,
        RetrospectiveScene,
        EndScene,
      ],
      title: "Software Dev Sim",
      dom: {
        createContainer: true,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
      callbacks: {
        preBoot: function (game) {
          game.registry.merge({ settings, presets });
        },
      },
    };
    const game = new Phaser.Game(gameConfig);
    return game;
  }
}
