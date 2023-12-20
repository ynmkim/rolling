import React from 'react';
import styled from 'styled-components';
import MessagesCard from './MessageCard';
import AddCard from './AddCard';
import FONT_FAMILY from '../../constants/fontFamily';

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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 2.4rem;
  column-gap: 2.8rem;
  width: 120rem;
  margin: 0 auto;
  padding-bottom: 11.3rem;
`;
