import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene";
import { StartScene } from "./scenes/StartScene";

export class CtoFantasy {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      parent: "game-container",
      pixelArt: true,
      scene: [StartScene, MainScene],
      title: "CTO Fantasy",
      scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
    };
    const game = new Phaser.Game(config);
    return game;
  }
}
