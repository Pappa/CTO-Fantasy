import styled from "styled-components";

export const Backdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: -1;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: grey;
  opacity: 0.5;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;
