import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRecipientMessages, getRecipient } from '../api/users';
import { deleteRecipient } from '../api/delete';
import useAsync from '../hooks/useAsync';
import CardList from '../components/edit/EditCardList';
import HeaderService from '../components/HeaderService';
import Button from '../components/elements/Button';
import DESIGN_TOKEN from '../styles/tokens';

function EditPage() {
  const [isLoadingMessages, isErrorMessages, getRecipientMessageAsync] = useAsync(getRecipientMessages);
  const [isLoadingRecipient, isErrorRecipient, getRecipientAsync] = useAsync(getRecipient);
  const [isLoadingDelete, isErrorDelete, deleteRecipientDAsync] = useAsync(deleteRecipient);
  const [data, setData] = useState([]);
  const [bgData, setBgData] = useState([]);
  const [emojiUpload, setEmojiUpload] = useState(false);
  const { id } = useParams();
  const { name, messageCount, recentMessages, topReactions } = bgData;
  const navigate = useNavigate();

  useEffect(() => {
    const handleHeaderServiceLoad = async (recipientId) => {
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

    handleHeaderServiceLoad(id);
    handlePostBackground(id);
  }, [id, getRecipientMessageAsync, getRecipientAsync, emojiUpload]);
  const { results } = data;
  const bgColor = bgData.backgroundColor;
  const bgImg = bgData.backgroundImageURL;

  const handleDeleteRecipients = async () => {
    await deleteRecipientDAsync(id);
    navigate('/list');
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
        $bgImg={bgImg}
      />
      <Container $bgImg={bgImg} $bgColor={bgColor}>
        <ContentWrapper>
          <ButtonWrapper>
            <Button type="button" variant="primary" width="92" height="large" onClick={handleDeleteRecipients}>
              삭제하기
            </Button>
          </ButtonWrapper>
          <CardList results={data && results} />
        </ContentWrapper>
      </Container>
    </div>
  );
}

export default EditPage;

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
