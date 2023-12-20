import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditCard from './EditCard';
import { deleteMessage } from '../../api/delete';
import DESIGN_TOKEN from '../../styles/tokens';
import FONT_FAMILY from '../../constants/fontFamily';

const { layout } = DESIGN_TOKEN;

function CardList({ results }) {
  const [cards, setCards] = useState(results);

  const handleDeleteMessage = async (id) => {
    await deleteMessage(id);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  useEffect(() => {
    setCards(results);
  }, [results]);

  return (
    <Container>
      {cards?.map((item) => (
        <EditCard
          key={item.id}
          sender={item.sender}
          profileImageURL={item.profileImageURL}
          relationship={item.relationship}
          content={item.content}
          createdAt={item.createdAt}
          fontFamily={FONT_FAMILY[item.font]}
          handleDeleteMessage={() => handleDeleteMessage(item.id)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 2rem;
  column-gap: 2.4rem;
  width: 120rem;
  margin: 0 auto;
  padding-bottom: 11.3rem;

  @media (max-width: ${layout.breakpoint.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
    width: 76.8rem;
  }

  @media (max-width: ${layout.breakpoint.mobile}) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1.6rem;
    width: 36rem;
  }
`;

export default CardList;
