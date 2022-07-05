import React from 'react';
import anchor from '~/assets/anchor.png';
import styled from 'styled-components';

const LogoBox = styled.div`
  color: white;
  text-transform: uppercase;

  h1 {
    color: white;
    font-weight: bold;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default ({ disableText, ...props }) => {
  return (
    <LogoBox {...props}>
      <img src={anchor} alt="Quiosque" />
      {!disableText ? <h1>Quiosque do Laerte</h1> : null}
    </LogoBox>
  );
};
