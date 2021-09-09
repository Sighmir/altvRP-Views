import { ButtonGroup } from '@material-ui/core';
import styled from 'styled-components';

export const ArrowSelect = styled(ButtonGroup)`
  right: 0px;
  & .MuiButton-root.Mui-disabled {
    text-transform: uppercase;
    color: black;
    width: 100px;
  }
`;
