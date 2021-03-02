import React, { Component } from "react";
import { connect } from "react-redux";
import { CtoFantasy } from "../cto-fantasy/CtoFantasy";

class Game extends Component {
  componentDidMount() {
    this.game = new CtoFantasy();
  }

  render() {
    return <div id="game-container" />;
  }

  shouldComponentUpdate() {
    return false;
  }
}

export default connect(null, null)(Game);
