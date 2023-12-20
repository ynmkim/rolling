import React from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';
import formatDate from '../../utils/formatDate';

const { color, typography } = DESIGN_TOKEN;

const Wrapper = styled.div`
  color: ${color.gray[400]};
  ${({ $font }) => $font && typography[$font]}
`;

function Date({ font, createdAt }) {
  const createdDate = formatDate(createdAt);
  return <Wrapper $font={font}>{createdDate}</Wrapper>;
}
export default Date;
