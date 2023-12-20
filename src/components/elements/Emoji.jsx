import React from 'react';
import styled from 'styled-components';
import styles from '../../styles/tokens';

const { color, overlayBackDropColor } = styles;

const EmojiDiv = styled.div`
  display: inline-flex;
  padding: 0.8rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 32px;
  background: ${overlayBackDropColor.badge};
`;

const EmojiStyle = styled.p`
  color: ${color.black};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.1rem;
`;

const EmojiCount = styled.p`
  color: ${color.white};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`;

function Emoji({ reactions }) {
  return reactions?.map((item) => (
    <EmojiDiv key={item.id}>
      <EmojiStyle>{item.emoji}</EmojiStyle>
      <EmojiCount>{item.count}</EmojiCount>
    </EmojiDiv>
  ));
}

export default Emoji;
