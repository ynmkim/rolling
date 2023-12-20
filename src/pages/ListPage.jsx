import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRecipientList } from '../api/users';
import Button from '../components/elements/Button';
import PostCardList from '../components/list/PostCardList';
import useAsync from '../hooks/useAsync';
import DESIGN_TOKEN from '../styles/tokens';

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
    <PageContainer>
      <PostContainer>
        <PostTitle>인기 롤링 페이퍼 🔥</PostTitle>
        <PostCardList postList={hotPostList} />
      </PostContainer>
      <PostContainer>
        <PostTitle>최근에 만든 롤링 페이퍼 ⭐️️</PostTitle>
        <PostCardList postList={latestPostList} />
      </PostContainer>
      <ButtonDiv>
        <Button $variant="primary" height="x-large" onClick={handleButtonClick}>
          나도 만들어 보기
        </Button>
      </ButtonDiv>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120rem;
  margin: 5rem auto 19.4rem;
  gap: 5rem;
`;

const PostContainer = styled.div`
  width: 100%;
  gap: 1.6rem;
`;

const PostTitle = styled.div`
  width: 100%;
  color: ${color.black};
  ${typography.font24Bold}
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
`;

export default ListPage;
