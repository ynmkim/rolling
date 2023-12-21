import React from 'react';
import styled from 'styled-components';
import styles from '../../styles/tokens';

const { color, overlayBackDropColor, layout, typography } = styles;

const EmojiDiv = styled.div`
  display: inline-flex;
  width: 6.6rem;
  height: 3.6rem;
  padding: 0.8rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 32px;
  background: ${overlayBackDropColor.badge};
  @media (max-width: ${layout.breakpoint.mobile}) {

    width: 5.3rem;
    height: 2.8rem;

    padding: 0.4rem 0.8rem;
    gap: 0.6rem;
  }
`;

const EmojiStyle = styled.p`
  display: flex;
  align-items: center;
  color: ${color.black};
  height: 2rem;
  width: 2rem;
`;

const EmojiCount = styled.p`
  color: ${color.white};
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: -0.016rem;
  font-weight: 400;

  @media (max-width: ${layout.breakpoint.mobile}) {
    ${typography.font14Regular};
  }
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
