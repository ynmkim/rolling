import React from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';

const { color, typography } = DESIGN_TOKEN;

function SenderName({ name }) {
  return (
    <Wrapper>
      <p>From.</p>
      <h1>{name}</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: ${color.black};
  display: flex;
  align-items: flex-end;

  p {
    ${typography.font18Regular};
  }

  h1 {
    margin-left: 0.6rem;
    ${typography.font18Bold};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export default SenderName;
