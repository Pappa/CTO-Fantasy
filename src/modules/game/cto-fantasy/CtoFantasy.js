import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { VacanciesScene } from "./scenes/VacanciesScene";
import { MainScene } from "./scenes/MainScene";
import { CreditsScene } from "./scenes/CreditsScene";

export class CtoFantasy {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "game-container",
      pixelArt: true,
      scene: [BootScene, VacanciesScene, MainScene, CreditsScene],
      title: "CTO Fantasy",
      dom: {
        createContainer: true,
      },
      scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
    };
    const game = new Phaser.Game(config);
    return game;
  }
}
