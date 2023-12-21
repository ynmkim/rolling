import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { getRecipient, getMoreRecipientMessages } from '../api/users';
import { deleteRecipient } from '../api/delete';
import useAsync from '../hooks/useAsync';
import CardList from '../components/edit/EditCardList';
import HeaderService from '../components/HeaderService';
import Button from '../components/elements/Button';
import DESIGN_TOKEN from '../styles/tokens';

function EditPage() {
  const [isLoadingMoreMessages, isErrorMoreMessages, getMoreRecipientMessageAsync] = useAsync(getMoreRecipientMessages);
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
      const result = await getMoreRecipientMessageAsync(recipientId, '?limit=100');
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
  }, [id, getMoreRecipientMessageAsync, getRecipientAsync, emojiUpload]);
  const { results } = data;
  const bgColor = bgData.backgroundColor;
  const bgImg = bgData.backgroundImageURL;

  const handleDeleteRecipients = async () => {
    await deleteRecipientDAsync(id);
    navigate('/list');
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
          <StyledButton>
            <Button type="button" $variant="primary" width="92" height="large" onClick={handleDeleteRecipients}>
              삭제하기
            </Button>
          </StyledButton>
          <CardList results={data && results} />
        </ContentWrapper>
      </Container>
    </div>
  );
}

export default EditPage;

const { typography, layout, color } = DESIGN_TOKEN;

const ContentWrapper = styled.div`
  max-width: 124.8rem;
  width: 100%;
  margin: 0 auto;
  padding: 6.3rem 2.4rem;

  @media (max-width: ${layout.breakpoint.mobile}) {
    padding: 2.4rem 2.4rem 10.4rem;
  }
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1.1rem;

  @media (max-width: ${layout.breakpoint.mobile}) {
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
      return color[props.$bgColor][200];
    }
    return color.white;
  }};
  background-repeat: no-repeat;
  background-size: cover;
`;
