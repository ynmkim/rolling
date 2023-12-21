import React from 'react';
import styled from 'styled-components';
import styles from '../../styles/tokens';

const { color, overlayBackDropColor, layout, typography } = styles;

const EmojiDiv = styled.div`
  display: inline-flex;
  padding: 0.8rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 32px;
  background: ${overlayBackDropColor.badge};
  @media (max-width: ${layout.breakpoint.mobile}) {
    padding: 0.4rem 0.8rem;
    gap: 0.6rem;
  }
`;

const EmojiStyle = styled.p`
  color: ${color.black};
  ${typography.font16Regular};
`;

const EmojiCount = styled.p`
  color: ${color.white};
  ${typography.font16Regular};
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
