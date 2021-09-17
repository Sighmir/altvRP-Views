import styled from 'styled-components';

export const CreationNav = styled.nav`
  margin: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  width: 300px;
  & .MuiButton-root {
    text-transform: none;
  }
`;

export const CreationModal = styled.div`
  border-radius: 10px;
  background-color: whitesmoke;
  width: 600px;
  height: 200px;
  position: absolute;
  left: calc(50% - 300px);
  top: calc(50% - 100px);
`;
