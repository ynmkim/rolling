import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';
import PlusButton from '../../assets/images/plusbutton.png';

const { color, boxShadow } = DESIGN_TOKEN;

function AddCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const onClick = () => navigate(`/post/${id}/message`);

  return (
    <Button type="button" onClick={onClick}>
      <PlusImg />
    </Button>
  );
}

const Button = styled.button`
  width: 38.4rem;
  height: 28rem;
  border-radius: 1.6rem;
  box-shadow: ${boxShadow.card};
  background-color: ${color.white};
  position: relative;
`;

const PlusImg = styled.div`
  background: url(${PlusButton});
  background-size: cover;
  width: 5.6rem;
  height: 5.6rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default AddCard;
