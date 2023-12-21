import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ICONS from '../../constants/Icons';
import PostCard from './PostCard';
import DESIGN_TOKEN from '../../styles/tokens';

const { left, right } = ICONS.arrow;
const { layout } = DESIGN_TOKEN;

function PostCardList({ postList }) {
  const [cardScroll, setCardScroll] = useState(0);
  const [isLastCard, setIsLastCard] = useState(false);

  const count = postList.length;

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
    if (width === 1024 || width === 768) setCardScroll(0);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const navigate = useNavigate();
  const handleCardClick = (key) => {
    navigate(`/post/${key}/`);
  };

  const handleLeftClick = () => {
    setCardScroll(cardScroll + 29.5);
    setIsLastCard(false);
  };

  const handleRightClick = () => {
    setCardScroll(cardScroll - 29.5);
    if (cardScroll === -29.5 * (count - 5)) setIsLastCard(true);
  };

  return (
    <Container>
      {count > 4 && cardScroll !== 0 && (
        <LeftButton onClick={handleLeftClick}>
          <img src={left.src} alt={left.alt} />
        </LeftButton>
      )}
      <Wrapper>
        <CardContainer style={{ transform: `translateX(${cardScroll}rem)` }}>
          {postList ? (
            postList.map((item) => (
              <PostCard
                key={item?.id}
                name={item?.name}
                backgroundColor={item?.backgroundColor}
                backgroundImgUrl={item?.backgroundImageURL}
                messageCount={item?.messageCount}
                recentMessages={item?.recentMessages}
                topReactions={item?.topReactions}
                onClick={() => handleCardClick(item?.id)}
              />
            ))
          ) : (
            <h1>포스트가 없습니다</h1>
          )}
        </CardContainer>
      </Wrapper>
      {!isLastCard && count > 4 && (
        <RightButton onClick={handleRightClick}>
          <img src={right.src} alt={right.alt} />
        </RightButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  padding: 0 4rem;
  gap: 2rem;

  @media (max-width: ${layout.breakpoint.tablet}) {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 118rem;
  right: 6rem;
  padding: 2rem;
  gap: 2rem;
  overflow: hidden;

  @media (max-width: ${layout.breakpoint.tablet}) {
    width: 100%;
    right: 0;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  gap: 2rem;

  @media (max-width: ${layout.breakpoint.pc}) {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dadcdf;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  z-index: 1;
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
  backdrop-filter: blur(2px);
  @media (max-width: ${layout.breakpoint.pc}) {
    display: none;
  }
`;

const LeftButton = styled(Button)`
  left: -2rem;
`;

const RightButton = styled(Button)`
  right: 2rem;
`;

export default PostCardList;
