import React from 'react';
import styled from 'styled-components';
import styles from '../../styles/tokens';
import toastIconImg from '../../assets/icons/check-circle.svg';
import exitImg from '../../assets/icons/close.svg';

const { color, overlayBackDropColor } = styles;

const ToastDiv = styled.div`
  display: flex;
  width: 52.4rem;
  height: 64px;
  padding: 19px 30px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.8rem;
  background: ${overlayBackDropColor.toast};
`;

const UrlCopyText = styled.p`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.6rem; /* 162.5% */
  letter-spacing: -0.016prem;
`;

const ToastIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const UrlCopyDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ExitIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  flex-shrink: 0;
`;

function Toast() {
  return (
    <ToastDiv>
      <UrlCopyDiv>
        <ToastIcon src={toastIconImg} />
        <UrlCopyText>URL이 복사 되었습니다.</UrlCopyText>
      </UrlCopyDiv>
      <ExitIcon src={exitImg} />
    </ToastDiv>
  );
}

export default Toast;
