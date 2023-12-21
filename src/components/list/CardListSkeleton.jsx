import React from 'react';
import styled from 'styled-components';
import Skeleton from '../elements/Skeleton';

function CardListSkeleton() {
  return (
    <Container>
      <Wrapper>
        <CardContainer>
          <Skeleton type="postCard" />
          <Skeleton type="postCard" />
          <Skeleton type="postCard" />
          <Skeleton type="postCard" />
        </CardContainer>
      </Wrapper>
    </Container>
  );
}

export default CardListSkeleton;

const Container = styled.div`
  display: flex;
  position: relative;
  padding: 0 4rem;
  gap: 2rem;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 118rem;
  right: 6rem;
  padding: 2rem;
  gap: 2rem;
  overflow: hidden;
`;

const CardContainer = styled.div`
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  gap: 2rem;
`;
