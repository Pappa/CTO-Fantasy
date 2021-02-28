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
}

export default connect(null, null)(GameScene);
