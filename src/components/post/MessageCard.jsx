import React, { useState } from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';
import Avatar from '../elements/Avatar';
import SenderName from '../elements/SenderName';
import Badge from '../elements/Badge';
import Date from '../elements/Date';
import Modal from './Modal';

const { color, boxShadow } = DESIGN_TOKEN;

function MessagesCard({
  sender,
  profileImageURL,
  relationship,
  content,
  createdAt,
  messageId,
  fontFamily = 'Noto Sans KR',
}) {
  const [modal, setModal] = useState(false);

  const handleCardClick = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div>
      <Container onClick={handleCardClick}>
        <Wrapper>
          <Profile>
            <Avatar profileImageURL={profileImageURL} />
            <SenderProfile>
              <SenderName name={sender} />
              <Badge relationship={relationship} />
            </SenderProfile>
          </Profile>
        </Wrapper>
        <Outlined />
        <TextField $fontFamily={fontFamily}>{content}</TextField>
        <DateContainer>
          <Date font="font12Regular" createdAt={createdAt} />
        </DateContainer>
      </Container>
      {modal && <Modal messageId={messageId} onClick={handleCloseModal} />}
    </div>
  );
}

export default MessagesCard;

const Container = styled.div`
  width: 38.4rem;
  height: 28rem;
  border-radius: 1.6rem;
  box-shadow: ${boxShadow.card};
  display: flex;
  flex-direction: column;
  background-color: ${color.white};
  cursor: pointer;
`;

const Wrapper = styled.div`
  margin: 2.8rem 2.4rem 0;
  padding-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.div`
  display: flex;
  gap: 1.4rem;
`;

const SenderProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Outlined = styled.div`
  width: 33.6rem;
  height: 0.1rem;
  background: ${color.gray[200]};
  margin: 0 2.4rem;
`;

const TextField = styled.div`
  width: 33.6rem;
  height: 10rem;
  margin: auto 2.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-family: ${({ $fontFamily }) => $fontFamily};
`;

const DateContainer = styled.div`
  margin: 1.6rem 27.6rem 2.4rem 2.4rem;
`;
