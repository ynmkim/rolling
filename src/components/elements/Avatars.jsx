import React from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';
import Avatar from './Avatar';

const { color, typography } = DESIGN_TOKEN;

function Avatars({ left, recentMessages, messageCount }) {
  return (
    <AvatarsDiv $left={left}>
      {recentMessages?.map((item, index) => (
        <AvatarDiv key={item.id} $zIndex={index} order={index}>
          <Avatar key={item.id} size="small" profileImageURL={item.profileImageURL} />
        </AvatarDiv>
      ))}
      {/* eslint-disable-next-line */}
      {messageCount > 3 && <RestDiv>+{messageCount - 3}</RestDiv>}
    </AvatarsDiv>
  );
}

const AvatarsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 11.2rem;
  height: 2.8rem;
  ${({ $left }) => $left && `left:${$left / 10}rem`}
`;

const AvatarDiv = styled.div`
  display: flex;
  position: relative;
  ${({ $zIndex }) => `z-index:${$zIndex}`};
  right: ${({ order }) => `${1.2 * order}rem`};
  width: 2.8rem;
  height: 2.8rem;
`;

const RestDiv = styled(AvatarDiv)`
  right: 3.6rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid ${color.gray[200]};
  border-radius: 10rem;
  background-color: ${color.white};
  ${typography.font12Regular};
  color: ${color.gray[500]};
  z-index: 3;
`;

export default Avatars;
