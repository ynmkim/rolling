import React from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';

const { color, typography, layout } = DESIGN_TOKEN;

const Wrapper = styled.div`
  color: inherit;
  color: ${({ $colorNum }) => $colorNum && color.gray[$colorNum]};
  ${({ $font }) => $font && typography[$font]}
  max-width: 30rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  
  @media (max-width: ${layout.breakpoint.mobile}) {
    ${typography.font18Bold}
    padding: 0.4rem 0;

  }
`;

function RecipientName({ colorNum, font, name }) {
  const recipientName = `To. ${name || ''} `;
  return (
    <Wrapper $font={font} $colorNum={colorNum}>
      {recipientName}
    </Wrapper>
  );
}

export default RecipientName;
