import React, { useState } from 'react';
import { css, styled } from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';

const { typography, color } = DESIGN_TOKEN;

const TABS = [{ text: '컬러' }, { text: '이미지' }];

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  ${({ width }) => (width ? `width: ${width / 10}rem;` : 'width: 100%;')}
  border-radius: 0.6rem;
  background-color: ${color.gray[100]};
`;

const Tab = styled.li`
  flex: 1 1 0;
  button {
    &.active {
      border: 2px solid ${color.purple[600]};
      background-color: ${color.white};
      font-weight: 700;
      color: ${color.purple[600]};
    }
  }
`;

const Button = styled.button`
  width: 100%;
  height: 4rem;
  background-color: ${color.gray[100]};
  ${typography.font16Regular};
  border-radius: 0.6rem;
  color: ${color.gray[900]};
`;

function TabList({ width, onClick }) {
  const [isActiveIndex, setIsActiveIndex] = useState(0);

  const activeTabHandlder = (index) => {
    setIsActiveIndex(index);
  };

  return (
    <Container width={width} onClick={onClick} role="tablist">
      {TABS.map((item, index) => (
        <Tab key={item.text} onClick={() => activeTabHandlder(index)} role="tab">
          <Button type="button" className={isActiveIndex === index ? 'active' : ''}>
            {item.text}
          </Button>
        </Tab>
      ))}
    </Container>
  );
}

export default TabList;
