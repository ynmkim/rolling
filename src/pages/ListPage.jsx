import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import { getRecipientList } from '../api/users';
import Button from '../components/elements/Button';
import PostCardList from '../components/list/PostCardList';
import useAsync from '../hooks/useAsync';
import DESIGN_TOKEN from '../styles/tokens';
import Skeleton from '../components/elements/Skeleton';
import CardListSkeleton from '../components/list/CardListSkeleton';

const { layout, color, typography } = DESIGN_TOKEN;

function ListPage() {
  const [isLoading, isError, getRecipientListAsync] = useAsync(getRecipientList);
  const [latestPostList, setLatestPostList] = useState([]);
  const [hotPostList, setHotPostList] = useState([]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/post');
  };

  useEffect(() => {
    const getLatestPostList = async () => {
      const { results } = await getRecipientListAsync();
      setLatestPostList(results);
    };
    const getHotPostList = async () => {
      const { results } = await getRecipientListAsync('like');
      setHotPostList(results);
    };
    getHotPostList();
    getLatestPostList();
  }, [getRecipientListAsync]);

  return (
    <>
      <Helmet>
        <title>List | Rolling</title>
      </Helmet>
      <PageContainer>
        <PostContainer>
          {isLoading ? (
            <>
              <Skeleton type="postTitle" />
              <CardListSkeleton />
            </>
          ) : (
            <>
              <PostTitle>인기 롤링 페이퍼 🔥</PostTitle>
              <PostCardList postList={hotPostList} />
            </>
          )}
        </PostContainer>
        <PostContainer>
          {isLoading ? (
            <>
              <Skeleton type="postTitle" />
              <CardListSkeleton />
            </>
          ) : (
            <>
              <PostTitle>최근에 만든 롤링 페이퍼 ⭐️️</PostTitle>
              <PostCardList postList={latestPostList} />
            </>
          )}
        </PostContainer>
        <ButtonDiv>
          {isLoading ? (
            <Skeleton type="createButton" />
          ) : (
            <Button $variant="primary" height="x-large" onClick={handleButtonClick}>
              나도 만들어 보기
            </Button>
          )}
        </ButtonDiv>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120rem;
  margin: 5rem auto 19.4rem;
  gap: 5rem;

  @media (max-width: ${layout.breakpoint.tablet}) {
    width: 100%;
    margin: 5rem auto;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  gap: 1.6rem;
  @media (max-width: ${layout.breakpoint.pc}) {
    margin-left: 2.4rem;
  }
`;

const PostTitle = styled.div`
  width: fit-content;
  color: ${color.black};
  ${typography.font24Bold}

  @media (max-width: ${layout.breakpoint.tablet}) {
    margin-left: 2.4rem;
  }

  @media (max-width: ${layout.breakpoint.mobile}) {
    margin-left: 2rem;
  }
`;

const ButtonGlow = keyframes`
50%{
  opacity: 0.6;
}
`;

const ButtonDiv = styled.div`
  z-index: 1;
  display: flex;
  width: 28rem;
  position: sticky;
  bottom: 1.4rem;
  padding-top: 1.4rem;
  padding-bottom: 2.4rem;
  justify-content: center;
  align-items: center;
  animation: ${ButtonGlow} 2s ease-in-out infinite;

  @media (max-width: ${layout.breakpoint.tablet}) {
    width: calc(100% - 4.8rem);
  }
`;

export default ListPage;
