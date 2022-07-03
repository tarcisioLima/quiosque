import React from 'react';
import anchor from '~/assets/anchor.png';
import styled from 'styled-components';

const LogoBox = styled.div`
  color: white;
  text-transform: uppercase;
`;

export default (props) => {
  return (
    <LogoBox {...props}>
      <img src={anchor} alt="Quiosque" />
      <h1>Quiosque do Laerte</h1>
    </LogoBox>
  );
};
