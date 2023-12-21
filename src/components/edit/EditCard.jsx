import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import DESIGN_TOKEN from '../../styles/tokens';
import Avatar from '../elements/Avatar';
import SenderName from '../elements/SenderName';
import Badge from '../elements/Badge';
import Button from '../elements/Button';
import Date from '../elements/Date';
import ICONS from '../../constants/Icons';

const { color, boxShadow } = DESIGN_TOKEN;

function EditCard({
  sender,
  profileImageURL,
  relationship,
  content,
  createdAt,
  disabled,
  handleDeleteMessage,
  fontFamily = 'Noto Sans',
}) {
  return (
    <Container>
      <Wrapper>
        <Profile>
          <Avatar profileImageURL={profileImageURL} />
          <SenderProfile>
            <SenderName name={sender} />
            <Badge relationship={relationship} />
          </SenderProfile>
        </Profile>
        <Button
          $variant="outlined"
          width="40"
          height="large"
          icon={disabled ? ICONS.deleted.white : ICONS.deleted.black}
          onClick={handleDeleteMessage}
        />
      </Wrapper>
      <Outlined />
      <TextField $fontFamily={fontFamily}>{parse(content)}</TextField>
      <DateContainer>
        <Date font="font12Regular" createdAt={createdAt} />
      </DateContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 28rem;
  padding: 2.4rem;
  box-shadow: ${boxShadow.card};
  border-radius: 1.6rem;
  background-color: ${color.white};
`;

const Wrapper = styled.div`
  padding-bottom: 1.5rem;
  display: flex;
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
  height: 0.1rem;
  background: ${color.gray[200]};
`;

const TextField = styled.div`
  min-height: 10.6rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  font-family: ${({ $fontFamily }) => $fontFamily};
`;

const DateContainer = styled.div``;

export default EditCard;
