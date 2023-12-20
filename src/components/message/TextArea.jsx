import React from 'react';
import styled from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';

function TextEdit({ id, name, value, onChange }) {
  return <TextArea id={id} name={name} value={value} onChange={onChange} />;
}

export default TextEdit;

const { color } = DESIGN_TOKEN;

const TextArea = styled.textarea`
  width: 100%;
  height: 26rem;
  resize: none;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  border: 1px solid ${color.gray[300]};
  background: ${color.white};
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    border: 1px solid ${color.gray[500]};
    outline: none;
  }
  &:active {
    border: 1px solid ${color.gray[700]};
  }
`;
