import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMessage } from '../../api/users';
import useAsync from '../../hooks/useAsync';
import DESIGN_TOKEN from '../../styles/tokens';
import Button from '../elements/Button';
import Badge from '../elements/Badge';
import Date from '../elements/Date';
import FONT_FAMILY from '../../constants/fontFamily';

const { color, layout, boxShadow, typography } = DESIGN_TOKEN;

function Modal({ messageId, onClick }) {
  const [isLoadingMessage, isErrorMessage, getMessageAsync] = useAsync(getMessage);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const handleLoadModal = async (id) => {
      const result = await getMessageAsync(id);
      if (!result) return;
      const data = result;
      if (data) {
        setModalData(data);
      }
    };

    handleLoadModal(messageId);
  }, [messageId, getMessageAsync]);

  return (
    <ModalBlur>
      <div>
        <Container>
          <Wrapper>
            <ContentsProfile>
              <img src={modalData.profileImageURL} alt="프로필 이미지" />
              <p>From.</p>
              <h1>{modalData.sender}</h1>
              <Badge relationship={modalData.relationship}>{modalData.relationship}</Badge>
            </ContentsProfile>
            <DateContainer>
              <Date font="font14Regular" createdAt={modalData.createdAt} />
            </DateContainer>
          </Wrapper>
          <BlankDiv />
          <ContentsMessage $fontFamily={FONT_FAMILY[modalData.font]}>{modalData.content}</ContentsMessage>
          <ButtonWrapper>
            <Button type="button" width="120" height="large" $variant="primary" onClick={onClick}>
              확인
            </Button>
          </ButtonWrapper>
        </Container>
      </div>
    </ModalBlur>
  );
}

export default Modal;

const ModalBlur = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${layout.zIndex.overlay};
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  height: 47.6rem;
  padding: 4rem;
  border-radius: 1.6rem;
  box-shadow: ${boxShadow.card};
  background-color: ${color.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${layout.zIndex.modal};

  @media (max-width: ${layout.breakpoint.mobile}) {
    width: 36rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentsProfile = styled.div`
  display: grid;
  grid-template: auto auto / auto 1.6rem auto auto;
  grid-template-areas: 'img . from who' 'img . badge .';
  row-gap: 0.6rem;

  img {
    width: 5.6rem;
    height: 5.6rem;
    grid-area: img;
    border-radius: 10rem;
    object-fit: cover;
  }

  p {
    grid-area: from;
    ${typography.font20Regular};
  }

  h1 {
    grid-area: who;
    margin-left: 0.8rem;
    ${typography.font20Bold};
  }
`;

const DateContainer = styled.div``;

const BlankDiv = styled.div`
  width: 52rem;
  height: 0.1rem;
  margin-top: 2rem;
  margin-bottom: 1.6rem;
  background-color: ${color.gray[200]};

  @media (max-width: ${layout.breakpoint.mobile}) {
    width: 100%;
  }
`;

const ContentsMessage = styled.p`
  width: 50rem;
  height: 24rem;
  ${typography.font18Regular};
  color: #5a5a5a;
  padding-right: 1rem;
  overflow-y: auto;
  font-family: ${({ $fontFamily }) => $fontFamily};

  &::-webkit-scrollbar {
    width: 0.8rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.8rem;
    background-color: ${color.gray[300]};
  }

  @media (max-width: ${layout.breakpoint.mobile}) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
`;
