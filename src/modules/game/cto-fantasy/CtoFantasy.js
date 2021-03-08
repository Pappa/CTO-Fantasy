import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { VacanciesScene } from "./scenes/VacanciesScene";
import { MainScene } from "./scenes/MainScene";
import { CreditsScene } from "./scenes/CreditsScene";
import config from "./config.json";
import { TeamScene } from "./scenes/TeamScene";
import { HiringScene } from "./scenes/HiringScene";

export class CtoFantasy {
  constructor() {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "game-container",
      pixelArt: true,
      scene: [
        BootScene,
        VacanciesScene,
        MainScene,
        CreditsScene,
        TeamScene,
        HiringScene,
      ],
      title: "CTO Fantasy",
      dom: {
        createContainer: true,
      },
      scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
      callbacks: {
        preBoot: function (game) {
          game.registry.merge({ settings: config });
        },
      },
    };
    const game = new Phaser.Game(gameConfig);
    return game;
  }
}
