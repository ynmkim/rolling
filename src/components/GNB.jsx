import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/images/logo.png';
import DESIGN_TOKEN from '../styles/tokens';
import Button from './elements/Button';
import Rolling from '../assets/icons/Rolling.svg';
import xMas from '../assets/images/xmas_crown_icon.png';

const { layout } = DESIGN_TOKEN;

// const LogoIcon = styled.img`
//   width: 107px;
//   height: 30px;
// `;

const XMasIcon = styled.img`
  width: 27.8px;
  height: 27.8px;
`;
const TextLogo = styled.img`
  width: 71px;
  height: 30px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 124.8rem;
  width: 100%;
  padding: 0 2.4rem;
  height: 64px;
  margin: 0 auto;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  @media (max-width: ${layout.breakpoint.mobile}) {
    display: ${({ $location, id }) =>
      $location.startsWith(`/post/${id}`) && !$location.startsWith(`/post/${id}/message`) ? 'none' : 'flex'};
  }
`;
const HorizontalDivider = styled.div`
  height: 0.1rem;
  background-color: #ededed;
`;
const Logo = styled.button`
  display: flex;
  gap: 0.8rem;
  cursor: pointer;
`;
function GNB() {
  const { id } = useParams();
  const [hasButton, setHasButton] = useState(false);
  const navigate = useNavigate();
  const handleLogoClick = (e) => navigate('/');
  const onClick = () => navigate('/post');
  const location = useLocation();
  const handleButtonDisplay = useCallback(() => {
    if (location.pathname === '/' || location.pathname === '/list') {
      setHasButton(true);
      return;
    }
    setHasButton(false);
  }, [location.pathname]);

  useEffect(() => {
    handleButtonDisplay();
  }, [handleButtonDisplay]);

  return (
    <>
      <Container $location={location.pathname} id={id}>
        {/* <LogoIcon src={logo} alt="logo" /> */}
        <Logo onClick={handleLogoClick}>
          <XMasIcon src={xMas} alt="크리스마스 로고" />
          <TextLogo src={Rolling} alt="Rolling" />
        </Logo>

        {hasButton && (
          <Button $variant="outlined" width="157" height="large" type="button" onClick={onClick}>
            롤링 페이퍼 만들기
          </Button>
        )}
      </Container>
      <HorizontalDivider />
    </>
  );
}

export default GNB;
