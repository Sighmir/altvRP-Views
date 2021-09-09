import { ButtonGroup } from "@material-ui/core";
import styled from "styled-components";

export const CreationNav = styled.nav`
  margin: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  width: 300px;
  & .MuiButton-root {
    text-transform: none;
  }
`;

export const ArrowSelect = styled(ButtonGroup)`
  right: 0px;
  & .MuiButton-root.Mui-disabled {
    text-transform: uppercase;
    color: black;
    width: 110px;
  }
`