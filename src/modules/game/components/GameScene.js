import Phaser from "phaser";
import React, { Component } from "react";
import { connect } from "react-redux";

class GameScene extends Component {
  componentDidMount() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 600,
      height: 400,
      parent: "game-container",
      pixelArt: true,
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update,
      },
      scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
    });
  }

  render() {
    return <div id="game-container" />;
  }

  shouldComponentUpdate() {
    return false;
  }

  preload = () => {};
  create = () => {};
  update = () => {};
}

export default connect(null, null)(GameScene);
