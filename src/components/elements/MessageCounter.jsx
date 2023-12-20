import React from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';

const { layout, color, typography } = DESIGN_TOKEN;

function MessageCounter({ colorNum, font = 'font16Regular', messageCount = 0, className }) {
  return (
    <Span className={className} $font={font} $colorNum={colorNum}>
      <BoldText>{messageCount}</BoldText>
      명이 작성했어요!
    </Span>
  );
}

const Span = styled.span`
  color: inherit;
  color: ${({ $colorNum }) => $colorNum && color.gray[$colorNum]};
  ${({ $font }) => $font && typography[$font]}
`;

const BoldText = styled.span`
  font-weight: 700;
`;

export default MessageCounter;
