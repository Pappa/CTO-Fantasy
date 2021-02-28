import React from "react";
import { connect } from "react-redux";
import { loginAsGuestAction } from "../../core/actions";
import { Backdrop } from "../../core/components/Backdrop";
import { Card } from "../../core/components/Card";

export function Welcome({ loginAsGuest }) {
  return (
    <Backdrop open={true}>
      <Card>
        <button onClick={() => loginAsGuest()}>Login as a guest.</button>
      </Card>
    </Backdrop>
  );
}

const mapDispatchToProps = {
  loginAsGuest: loginAsGuestAction,
};

export default connect(null, mapDispatchToProps)(Welcome);
