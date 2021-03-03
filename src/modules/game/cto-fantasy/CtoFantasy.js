import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { VacanciesScene } from "./scenes/VacanciesScene";
import { MainScene } from "./scenes/MainScene";

export class CtoFantasy {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      parent: "game-container",
      pixelArt: true,
      scene: [BootScene, VacanciesScene, MainScene],
      title: "CTO Fantasy",
      scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
    };
    const game = new Phaser.Game(config);
    return game;
  }
}
