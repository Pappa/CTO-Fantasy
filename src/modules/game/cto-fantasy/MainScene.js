import Phaser from "phaser";

export function MainScene() {
  let main = new Phaser.Scene("main");

  // init
  main.init = function () {};

  // load assets
  main.preload = function () {
    // this.load.image("background", "assets/images/background-city.png");
    // this.load.audio("treeAudio", "assets/audio/arbol.mp3");
  };

  // executed once, after assets were loaded
  main.create = function () {};

  return main;
}
