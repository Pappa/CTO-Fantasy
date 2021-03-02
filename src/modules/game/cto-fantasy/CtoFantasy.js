import Phaser from "phaser";
import { MainScene } from "./MainScene";

export function CtoFantasy() {
  const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: "game-container",
    pixelArt: true,
    scene: new MainScene(),
    scale: {
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
  };
  const game = new Phaser.Game(config);
  return game;
}
