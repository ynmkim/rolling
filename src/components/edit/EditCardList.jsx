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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(30rem, 38.4rem));
  justify-content: space-between;
@media (max-width: ${layout.breakpoint.mobile}) {
    display: flex;
    flex-direction: column;
  }  gap: 2.8rem calc(1.6rem);

  @media (max-width: ${layout.breakpoint.tablet}) {
    grid-template-columns: repeat(2, minmax(30rem, 50rem));
    gap: 1.6rem;
  }
  
`;

export default CardList;
