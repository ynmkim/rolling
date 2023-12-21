import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';

function Skeleton({ type }) {
  return <SkeletonBox type={type} />;
}

export default Skeleton;

const { color } = DESIGN_TOKEN;

const SKELETON_TYPE = {
  header: css`
    width: 100vw;
    height: 6.4rem;
  `,
  postTitle: css`
    width: 27rem;
    height: 3.6rem;
  `,
  postCard: css`
    width: 27.5rem;
    height: 26rem;
    border-radius: 1.6rem;
  `,
  messageCard: css`
    width: 38.4rem;
    height: 28rem;
    border-radius: 1.6rem;
  `,
  createButton: css`
    width: 100%;
    height: 5.6rem;
    border-radius: 1.2rem;
  `,
  editButton: css`
    width: 9.2rem;
    height: 4rem;
    border-radius: 0.6rem;
  `,
  optionImg: css`
    width: 16.8rem;
    height: 16.8rem;
    border-radius: 1.2rem;
  `,
};

const loading = keyframes`
  50% {
    opacity: 0.2;
  }
`;

const SkeletonBox = styled.div`
  background-color: ${color.gray[200]};
  overflow: hidden;
  ${({ type }) => css`
    ${SKELETON_TYPE[type]}
  `};
  position: relative;
  animation: ${loading} 2s ease-in-out infinite;
`;
