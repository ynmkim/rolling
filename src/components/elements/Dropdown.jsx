import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';
import upArrow from '../../assets/icons/arrow_up.svg';
import downArrow from '../../assets/icons/arrow_down.svg';

const { color, layout } = DESIGN_TOKEN;

const Container = styled.div`
  position: relative;
  ${layout.zIndex.dropdown};
  button {
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 0.8rem;
    border: 1px solid ${color.gray[300]};
    background: ${color.white};
    width: 32rem;
    @media screen and (max-width: ${layout.breakpoint.mobile}) {
      width: 100%;
    }
    padding: 1.2rem 1.6rem;

    &:hover,
    &:focus {
      border: 1px solid ${color.gray[500]};
      outline: none;
    }

    &:active {
      border: 1px solid ${color.gray[700]};
    }

    &:disabled {
      border: 1px solid ${color.gray[300]};
      background: ${color.gray[100]};
      color: ${color.gray[400]};
    }

    img {
      position: absolute;
      right: 1rem;
    }
  }
`;

const Ul = styled.ul`
  list-style: none;
  border-radius: 0.8rem;
  border: 1px solid ${color.gray[300]};
  background: ${color.white};
  width: 32rem;
  @media screen and (max-width: ${layout.breakpoint.mobile}) {
    width: 100%;
  }
  margin-top: 0.8rem;
`;

const Li = styled.li`
  display: flex;
  width: 31.8rem;
  @media screen and (max-width: ${layout.breakpoint.mobile}) {
    width: 100%;
  }
  border-radius: 0.8rem;
  padding: 1.2rem 1.6rem;
  align-items: center;
  border: none;
  gap: 10px;

  &:hover {
    background: ${color.gray[100]};
  }
`;

function Dropdown({ name, setValues, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [containerRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsOpen(false);
    setValues((preValues) => ({ ...preValues, [name]: menuItem }));
  };

  return (
    <Container ref={containerRef}>
      <button type="button" onClick={toggleDropdown}>
        {selectedMenuItem || items[0]}
        <img src={isOpen ? upArrow : downArrow} alt="Arrow" />
      </button>
      {isOpen && (
        <Ul>
          {items?.map((item) => (
            <Li key={item} name={name} onClick={() => handleMenuItemClick(item)}>
              {item}
            </Li>
          ))}
        </Ul>
      )}
    </Container>
  );
}
export default Dropdown;
