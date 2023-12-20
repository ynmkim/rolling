import React from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';

const { color } = DESIGN_TOKEN;

const AVATAR_SIZE = {
  small: '2.8rem',
  medium: '5.6rem',
  large: '8rem',
};

const Img = styled.img`
  display: flex;
  width: ${({ size }) => AVATAR_SIZE[size] ?? AVATAR_SIZE.medium};
  height: ${({ size }) => AVATAR_SIZE[size] ?? AVATAR_SIZE.medium};
  align-items: center;
  flex-shrink: 0;
  border-radius: 10rem;
  border: 1px solid ${color.gray[200]};
  background: ${color.gray[300]};
`;

function Avatar({ size = 'medium', profileImageURL, alt = '프로필 이미지', handleProfileClick }) {
  const onClick = () => handleProfileClick && handleProfileClick(profileImageURL);
  return <Img size={size} src={profileImageURL} alt={alt} onClick={onClick} />;
}

export default Avatar;
