import React from "react";
import { connect } from "react-redux";
import Game from "./modules/game/components/Game";
import Welcome from "./modules/welcome/components/Welcome";

function App({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Welcome />;
  }
  return <Game />;
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.userType,
});

export default connect(mapStateToProps)(App);
