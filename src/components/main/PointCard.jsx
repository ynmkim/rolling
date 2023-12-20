import React from 'react';
import styled from 'styled-components';
import styles from '../../styles/tokens';

function PointCard({ content, $isReverse = false }) {
  const { point, title1, title2, explain, image } = content;
  return (
    <Container $isReverse={$isReverse}>
      <Wrapper>
        <Point point={point} />
        <P $title>
          {title1}
          <Br />
          {title2}
        </P>
        <P>{explain}</P>
      </Wrapper>
      <img src={image} alt="포인트카드이미지" />
    </Container>
  );
}

export default PointCard;

function Point({ point }) {
  return (
    <PointContainer>
      <p>{point}</p>
    </PointContainer>
  );
}

const { layout, color, typography } = styles;

const Container = styled.div`
  width: 116rem;
  padding: 6rem 0px;
  margin-bottom: ${(props) => (props.$isReverse ? '5.2rem' : '3rem')};
  display: flex;
  flex-direction: ${(props) => (props.$isReverse ? 'row-reverse' : 'row')};
  justify-content: flex-end;
  align-items: flex-start;
  gap: ${(props) => (props.$isReverse ? '0rem' : '8.8rem')};
  border-radius: 1.6rem;
  background: ${color.surface};

  @media (max-width: ${layout.breakpoint.pc}) {
    width: calc(100vw - 4.8rem);
    margin-bottom: ${(props) => (props.$isReverse ? '13.3rem' : '3rem')};
    padding: 4rem 0;

    gap: 4rem;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${layout.breakpoint.mobile}) {
    padding: 2.4rem 0 5.1rem;
    overflow: hidden;
  }

  img {
    width: 72rem;
    height: 20.4rem;

    @media (max-width: ${layout.breakpoint.mobile}) {
      width: 37rem;
      height: auto;
    }
  }
`;

const Wrapper = styled.div`
  @media (max-width: ${layout.breakpoint.pc}) {
    width: 72rem;
    padding-left: 4rem;
  }

  @media (max-width: ${layout.breakpoint.mobile}) {
    width: calc(100% - 4.8rem);
    padding: 0;
  }
`;

const PointContainer = styled.div`
  padding: 0.6rem 1.2rem;
  display: inline-block;
  border-radius: 5rem;
  background: ${color.purple[600]};

  p {
    ${typography.font14Bold};
    color: ${color.white};
  }
`;

const P = styled.h1`
  margin-top: ${({ $title }) => ($title ? '1.6rem' : '0.8rem')};

  ${({ $title }) => ($title ? typography.font24Bold : typography.font18Regular)};

  @media (max-width: ${layout.breakpoint.mobile}) {
    margin-top: ${({ $title }) => ($title ? '1.6rem' : '0.4rem')};

    ${({ $title }) => ($title ? typography.font18Bold : typography.font15Regular)};
  }
`;

const Br = styled.br`
  @media (max-width: ${layout.breakpoint.pc}) {
    display: none;
  }
`;
