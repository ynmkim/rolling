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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 28rem;
  padding: 2.4rem;
  box-shadow: ${boxShadow.card};
  border-radius: 1.6rem;
  background-color: ${color.white};
`;

const PlusImg = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  background: url(${PlusButton});
  background-size: cover;
`;

export default AddCard;
