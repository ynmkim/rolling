import React from 'react';
import styled from 'styled-components';
import MessagesCard from './MessageCard';
import AddCard from './AddCard';
import FONT_FAMILY from '../../constants/fontFamily';
import DESIGN_TOKEN from '../../styles/tokens';

const { layout } = DESIGN_TOKEN;

function MessageCardList({ results }) {
  return (
    <Container>
      <AddCard />
      {results?.map((item) => (
        <div key={item.id}>
          <MessagesCard
            messageId={item.id}
            sender={item.sender}
            profileImageURL={item.profileImageURL}
            relationship={item.relationship}
            content={item.content}
            createdAt={item.createdAt}
            fontFamily={FONT_FAMILY[item.font]}
          />
        </div>
      ))}
    </Container>
  );
}

export default MessageCardList;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(30rem, 38.4rem));
  justify-content: space-between;
  @media (max-width: ${layout.breakpoint.mobile}) {
    display: flex;
    flex-direction: column;
  }
  gap: 2.8rem calc(1.6rem);

  @media (max-width: ${layout.breakpoint.tablet}) {
    grid-template-columns: repeat(2, minmax(30rem, 50rem));
    gap: 1.6rem;
  }
`;
