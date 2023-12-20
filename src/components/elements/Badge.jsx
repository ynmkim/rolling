import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from '../../styles/tokens';

const { color } = styles;

const BadgeDiv = styled.div`
  width: 4.2rem;
  height: 2rem;
  padding: 0px 0.8rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  grid-area: badge;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 150%;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
`;

function Badge({ relationship }) {
  let backgroundColor = '';
  let textColor = '';

  switch (relationship) {
    case '동료':
      backgroundColor = color.purple[100];
      textColor = color.purple[600];
      break;
    case '지인':
      backgroundColor = color.beige[100];
      textColor = color.beige[500];
      break;
    case '친구':
      backgroundColor = color.blue[100];
      textColor = color.blue[500];
      break;
    case '가족':
      backgroundColor = color.green[100];
      textColor = color.green[500];
      break;
    default:
      backgroundColor = '';
      textColor = '';
  }

  return (
    <BadgeDiv $backgroundColor={backgroundColor} $textColor={textColor}>
      {relationship}
    </BadgeDiv>
  );
}

export default Badge;
