import React from "react";
import { connect } from "react-redux";
import Stats from "./Stats";
import GameScene from "./GameScene";

export function Game() {
  return [<Stats key="stats" />, <GameScene key="game-scene" />];
}

export default connect(null, null)(Game);
