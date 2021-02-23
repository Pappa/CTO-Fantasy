import React from "react";
import { connect } from "react-redux";
import { Backdrop, Button } from "@material-ui/core";
import { loginAsGuestAction } from "../core/actions";
import styled from "styled-components";

const WelcomeBackground = styled.div`
  top: 4rem;
  bottom: 4rem;
  left: 4rem;
  right: 4rem;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 0.5rem;
  background-color: white;
`;

export function Welcome({ loginAsGuest, isLoggedIn }) {
  return (
    <Backdrop open={!isLoggedIn}>
      <WelcomeBackground>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => loginAsGuest()}
        >
          Login as a guest.
        </Button>
      </WelcomeBackground>
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
