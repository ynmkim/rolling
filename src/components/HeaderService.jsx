import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import EmojiPicker from 'emoji-picker-react';
import DESIGN_TOKEN from '../styles/tokens';
import Avatars from './elements/Avatars';
import MessageCounter from './elements/MessageCounter';
import Emoji from './elements/Emoji';
import Button from './elements/Button';
import Icons from '../constants/Icons';
import RecipientName from './elements/RecipientName';
import { createReaction } from '../api/posts';
import { getReactions } from '../api/users';
import useAsync from '../hooks/useAsync';

const { add, share, arrow } = Icons;

function HeaderService({ name, messageCount, recentMessages, topReactions, id, emojiUpload, setEmojiUpload }) {
  const [isLoading, isError, getReactionsAsync] = useAsync(getReactions);
  const [isReactionLoading, isReactionError, createReactionAsync] = useAsync(createReaction);
  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [reactions, setReactions] = useState([]);
  const containerRef = useRef(null);

  const handleArrowButtonClick = () => {
    if (!isOpen && reactions.length !== 0) {
      setIsOpen(true);
      setEmojiOpen(false);
      setShareOpen(false);
      return;
    }
    setIsOpen(false);
  };
  const handleAddReactionClick = () => {
    if (!emojiOpen) {
      setEmojiOpen(true);
      setIsOpen(false);
      setShareOpen(false);
      return;
    }
    setEmojiOpen(false);
  };
  const handleShareClick = () => {
    if (!shareOpen) {
      setShareOpen(true);
      setEmojiOpen(false);
      setIsOpen(false);
      return;
    }
    setShareOpen(false);
  };

  useEffect(() => {
    const handleReactionsLoad = async (recipientId) => {
      const reactionData = await getReactionsAsync(recipientId);
      if (!reactionData) return;
      const { results } = reactionData;
      setReactions(results);
    };

    handleReactionsLoad(id);

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setEmojiOpen(false);
        setShareOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [id, getReactionsAsync, emojiUpload, containerRef]);

  const clickEmoji = async (emojiObject) => {
    await createReactionAsync(id, { emoji: emojiObject.emoji, type: 'increase' });
    setEmojiOpen(false);
    setEmojiUpload((prevEmojiUpload) => !prevEmojiUpload);
  };

  return (
    <>
      <Container ref={containerRef}>
        <RecipientName font="font28Bold" name={name} />
        <Wrapper>
          <Senders>
            <Avatars left="28" recentMessages={recentMessages} messageCount={messageCount} />
            <MessageCounter font="font18Regular" messageCount={messageCount} />
            <ColumnDivider />
          </Senders>
          <Reactions>
            <Emojis>
              <Emoji reactions={topReactions} />
            </Emojis>
            <Button width="36" height="medium" icon={arrow.down} onClick={handleArrowButtonClick} />
            {isOpen && (
              <EmojiExpanded>
                <Emoji reactions={reactions} />
              </EmojiExpanded>
            )}
          </Reactions>
          <AddButtonWrapper>
            <Button
              variant="outlined"
              width="90"
              height="medium"
              icon={disabled ? add.white : add.black}
              disabled={disabled}
              onClick={handleAddReactionClick}
            >
              추가
            </Button>
            {emojiOpen && (
              <EmojiPickerWrapper>
                <EmojiPicker width="100%" onEmojiClick={clickEmoji} />
              </EmojiPickerWrapper>
            )}
          </AddButtonWrapper>
          <ColumnDivider />
          <ShareWrapper>
            <Button variant="outlined" width="56" height="medium" icon={share} onClick={handleShareClick} />
            {shareOpen && (
              <Ul>
                <Li>카카오톡 공유</Li>
                <Li>URL 공유</Li>
              </Ul>
            )}
          </ShareWrapper>
        </Wrapper>
      </Container>
      <HorizontalDivider />
    </>
  );
}

export default HeaderService;

const { color, boxShadow, layout, typography } = DESIGN_TOKEN;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 124.8rem;
  width: 100%;
  padding: 0 2.4rem;
  height: 6.4rem;
  margin: 0 auto;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;

  @media (max-width: ${layout.breakpoint.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    height: 12.8rem;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HorizontalDivider = styled.div`
  height: 0.1rem;
  background-color: #ededed;
`;

const ColumnDivider = styled.div`
  height: 2.8rem;
  width: 0.1rem;
  background-color: ${color.gray[200]};
  margin: 0 1.3rem;
`;
const Senders = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;

  @media (max-width: ${layout.breakpoint.tablet}) {
    display: none;
  }
`;

const Emojis = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Reactions = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.8rem;
  position: relative;
`;
const EmojiExpanded = styled.span`
  background: ${color.white};
  padding: 2.4rem;
  position: absolute;
  right: 0;
  top: 4.3rem;
  display: grid;
  grid-template-columns: repeat(4, 5.6rem);
  grid-template-rows: repeat(auto-fit, 3.8rem);
  gap: 1rem 0.8rem;
  border-radius: 0.8rem;
  border: 1px solid #b6b6b6;
  box-shadow: ${boxShadow.card};
`;

const AddButtonWrapper = styled.div`
  position: relative;
  @media (max-width: ${layout.breakpoint.mobile}) {
    display: none;
  }
`;
const EmojiPickerWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 4.3rem;
`;

const ShareWrapper = styled.div`
  position: relative;
`;

const Ul = styled.ul`
  display: inline-flex;
  padding: 1rem 0.1rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.8rem;
  border: 1px solid ${color.gray[300]};
  background: ${color.white};
  ${boxShadow.card};
  position: absolute;
  right: 0;
  top: 4.3rem;
`;

const Li = styled.li`
  display: flex;
  width: 13.8rem;
  padding: 1.2rem 1.6rem;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  color: ${color.gray[900]};
  ${typography.font16Regular};

  &:hover {
    background: ${color.gray[100]};
  }
`;
