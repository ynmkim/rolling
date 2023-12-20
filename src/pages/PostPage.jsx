import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipientMessages, getRecipient } from '../api/users';
import useAsync from '../hooks/useAsync';
import DESIGN_TOKEN from '../styles/tokens';
import MessageCardList from '../components/post/MessageCardList';
import Button from '../components/elements/Button';
import HeaderService from '../components/HeaderService';

function PostPage() {
  const [isLoadingMessages, isErrorMessages, getRecipientMessageAsync] = useAsync(getRecipientMessages);
  const [isLoadingRecipient, isErrorRecipient, getRecipientAsync] = useAsync(getRecipient);
  const [data, setData] = useState([]);
  const [bgData, setBgData] = useState([]);
  const [emojiUpload, setEmojiUpload] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { name, messageCount, recentMessages, topReactions } = bgData;

  useEffect(() => {
    const handlePostInfo = async (recipientId) => {
      const result = await getRecipientMessageAsync(recipientId);
      if (!result) return;
      const recipientData = result;
      if (recipientData) {
        setData(recipientData);
      }
    };

    const handlePostBackground = async (recipientId) => {
      const result = await getRecipientAsync(recipientId);
      if (!result) return;
      const recipientData = result;
      if (recipientData) {
        setBgData(recipientData);
      }
    };

    handlePostInfo(id);
    handlePostBackground(id);
  }, [id, getRecipientMessageAsync, getRecipientAsync, emojiUpload]);
  const { results } = data;
  const bgColor = bgData.backgroundColor;
  const bgImg = bgData.backgroundImageURL;
  console.log(data);

  const handleNavigate = () => {
    navigate('edit');
  };

  return (
    <div>
      <HeaderService
        name={name}
        messageCount={messageCount}
        recentMessages={recentMessages}
        topReactions={topReactions}
        id={id}
        setEmojiUpload={setEmojiUpload}
        emojiUpload={emojiUpload}
      />
      <Container $bgImg={bgImg} $bgColor={bgColor}>
        <ContentWrapper>
          <ButtonWrapper>
            <Button type="button" variant="primary" width="92" height="large" onClick={handleNavigate}>
              편집하기
            </Button>
          </ButtonWrapper>
          <MessageCardList results={data && results} />
        </ContentWrapper>
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
