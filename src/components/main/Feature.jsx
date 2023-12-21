import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import introducePoint1 from '../../assets/images/cardBundle.png';
import introducePoint2 from '../../assets/images/emojiBundle.png';
import PointCard from './PointCard';
import styles from '../../styles/tokens';
import Button from '../elements/Button';

const { layout } = styles;

const content1 = {
  point: 'Point. 01',
  title1: '누구나 손쉽게, 온라인 ',
  title2: '롤링 페이퍼를 만들 수 있어요',
  explain: '로그인 없이 자유롭게 만들어요.',
  image: introducePoint1,
};

const content2 = {
  point: 'Point. 02',
  title1: '서로에게 이모지로 감정을 ',
  title2: '표현해보세요',
  explain: '롤링 페이퍼에 이모지를 추가할 수 있어요.',
  image: introducePoint2,
};

function Feature() {
  return (
    <Container>
      <PointCard content={content1} />
      <PointCard content={content2} $isReverse />
      <StyledLink>
        <Link to="/list">
          <Button type="button" width="280" height="x-large" $variant="primary">
            구경해보기
          </Button>
        </Link>
      </StyledLink>
    </Container>
  );
}

export default Feature;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 0;

  @media (max-width: ${layout.breakpoint.mobile}) {
    padding: 4.9rem 2.4rem 10.4rem;
  }
`;

const StyledLink = styled.div`
  position: fixed;
  bottom: 3.8rem;

  @media (max-width: ${layout.breakpoint.mobile}) {
    left: 0;
    right: 0;
    padding: 0 2.4rem;
  }
`;
