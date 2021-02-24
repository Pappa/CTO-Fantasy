import React from "react";
import { connect } from "react-redux";
import { loginAsGuestAction } from "../core/actions";
import { Backdrop } from "../core/components/Backdrop";
import { Card } from "../core/components/Card";

export function Welcome({ loginAsGuest, isLoggedIn }) {
  return (
    <Backdrop open={!isLoggedIn}>
      <Card>
        <button onClick={() => loginAsGuest()}>Login as a guest.</button>
      </Card>
    </Backdrop>
  );
}

const mapDispatchToProps = {
  loginAsGuest: loginAsGuestAction,
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.userType,
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
