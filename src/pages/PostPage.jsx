import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { getRecipient, getMoreRecipientMessages } from '../api/users';
import HeaderService from '../components/HeaderService';
import Button from '../components/elements/Button';
import MessageCardList from '../components/post/MessageCardList';
import useAsync from '../hooks/useAsync';
import DESIGN_TOKEN from '../styles/tokens';
import Skeleton from '../components/elements/Skeleton';
import MessageCardSkeleton from '../components/post/MessageCardSkeleton';

function PostPage() {
  const [isLoadingMoreMessages, isErrorMoreMessages, getMoreRecipientMessageAsync] = useAsync(getMoreRecipientMessages);
  const [isLoadingRecipient, isErrorRecipient, getRecipientAsync] = useAsync(getRecipient);
  const [data, setData] = useState([]);
  const [bgData, setBgData] = useState([]);
  const [emojiUpload, setEmojiUpload] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const { name, messageCount, recentMessages, topReactions } = bgData;

  const { id } = useParams();
  const navigate = useNavigate();
  const target = useRef(null);

  useEffect(() => {
    const handlePostBackground = async (recipientId) => {
      const result = await getRecipientAsync(recipientId);
      if (!result) return;
      const recipientData = result;
      if (recipientData) {
        setBgData(recipientData);
      }
    };

    handlePostBackground(id);
  }, [id, getRecipientAsync, emojiUpload]);
  const bgColor = bgData.backgroundColor;
  const bgImg = bgData.backgroundImageURL;

  useEffect(() => {
    const callback = async (entries) => {
      if (hasNext && !isLoadingMoreMessages && entries[0].isIntersecting) {
        const result = await getMoreRecipientMessageAsync(id, `?offset=${offset}`);
        if (!result) return;
        const newMessage = result.results;
        const prevData = data;
        if (result) {
          setData([...prevData, ...newMessage]);
          setOffset((prevOffset) => prevOffset + 8);
        }
        if (result.next === null) setHasNext(false);
      }
    };
    const options = {
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target.current);

    if (!hasNext) observer.disconnect();

    return () => {
      observer.disconnect();
    };
  }, [id, offset, getMoreRecipientMessageAsync, isLoadingMoreMessages, data, hasNext]);

  const handleEditClick = (e) => {
    // eslint-disable-next-line no-alert
    const userConfirmed = window.alert('관리자에게 문의해주세요');
  };

  return (
    <div>
      <Helmet>
        <title>{name && `${name.slice(0, 13)} | Rolling`}</title>
      </Helmet>
      {isLoadingRecipient ? (
        <Skeleton type="header" />
      ) : (
        <HeaderService
          name={name}
          messageCount={messageCount}
          recentMessages={recentMessages}
          topReactions={topReactions}
          id={id}
          setEmojiUpload={setEmojiUpload}
          emojiUpload={emojiUpload}
          bgImg={bgImg}
        />
      )}
      <Container $bgImg={bgImg} $bgColor={bgColor}>
        <ContentWrapper>
          <StyledButton>
            {isLoadingRecipient ? (
              <Skeleton type="editButton" />
            ) : (
              <Button type="button" $variant="primary" width="92" height="large" onClick={handleEditClick}>
                편집하기
              </Button>
            )}
          </StyledButton>
          {isLoadingRecipient ? <MessageCardSkeleton /> : <MessageCardList results={data} />}
          <MoreMessages ref={target} />
        </ContentWrapper>
      </Container>
    </div>
  );
}

export default PostPage;

const { typography, layout, color } = DESIGN_TOKEN;

const ContentWrapper = styled.div`
  max-width: 124.8rem;
  width: 100%;
  margin: 0 auto;
  padding: 6.3rem 2.4rem;

  @media (max-width: ${layout.breakpoint.tablet}) {
    padding: 2.4rem 2.4rem 10.4rem;
  }
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1.1rem;

  @media (max-width: ${layout.breakpoint.tablet}) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 2.4rem;
    padding: 0 2.4rem;
    margin-bottom: 0;
    button {
      width: 100%;
      height: 5.6rem;
      ${typography.font18Regular};
    }
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => {
    if (props.$bgImg) {
      return `url(${props.$bgImg})`;
    }
    if (props.$bgColor) {
      return color.xMas[props.$bgColor][200];
    }
    return color.white;
  }};
  background-repeat: no-repeat;
  background-size: cover;
`;

const MoreMessages = styled.div`
  height: 15rem;
`;
