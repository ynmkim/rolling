import React from 'react';
import styled from 'styled-components';
import Skeleton from '../elements/Skeleton';

function MessageCardSkeleton() {
  return (
    <Container>
      <Skeleton type="messageCard" />
      <Skeleton type="messageCard" />
      <Skeleton type="messageCard" />
      <Skeleton type="messageCard" />
      <Skeleton type="messageCard" />
      <Skeleton type="messageCard" />
    </Container>
  );
}

export default MessageCardSkeleton;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 2.4rem;
  column-gap: 2.8rem;
  width: 120rem;
  margin: 0 auto;
  padding-bottom: 11.3rem;
`;
