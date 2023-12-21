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

  const handleNavigate = () => {
    navigate('edit');
  };

  return (
    <div>
      <Helmet>
        <title>{name && `${name.slice(0, 13)} | Rolling`}</title>
      </Helmet>
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
      <Container $bgImg={bgImg} $bgColor={bgColor}>
        <ContentWrapper>
          <ButtonWrapper>
            <Button type="button" $variant="primary" width="92" height="large" onClick={handleNavigate}>
              편집하기
            </Button>
          </ButtonWrapper>
          <MessageCardList results={data} />
          <MoreMessages ref={target} />
        </ContentWrapper>
        <MoreMessages ref={target} />
      </Container>
    </div>
  );
}

export default PostPage;

const { typography, layout, color } = DESIGN_TOKEN;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120rem;
  margin: 0 auto;
  padding-top: 6.3rem;

  @media (max-width: ${layout.breakpoint.tablet}) {
    width: 80rem;
  }

  @media (max-width: ${layout.breakpoint.mobile}) {
    width: 40rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1.1rem;
  ${typography.font16Regular};

  @media (max-width: ${layout.breakpoint.tablet}) {
    position: fixed;
    justify-content: center;
    bottom: 1rem;
    left: 0.8rem;
  }

  @media (max-width: ${layout.breakpoint.mobile}) {
    position: fixed;
    justify-content: center;
    bottom: 11px;
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
      return color[props.$bgColor][200];
    }
    return color.white;
  }};
  background-repeat: no-repeat;
  background-size: cover;
`;

const MoreMessages = styled.div`
  height: 15rem;
`;
