import React from 'react';
import { styled, css } from 'styled-components';
import DESIGN_TOKEN from '../../styles/tokens';

const { color, typography } = DESIGN_TOKEN;
function InputText({ id, name, value, disabled, error, placeholder, onChange, onBlur }) {
  return (
    <>
      <Input
        type="text"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        $error={error}
      />
      {error && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
    </>
  );
}

export default InputText;

const Input = styled.input`
  width: 100%;
  height: 100%;
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

  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid ${color.gray[300]};
      background-color: ${color.gray[300]};
      color: ${color.white};
      pointer-events: none;
    `}

  ${({ $error }) =>
    $error &&
    css`
      border: 1px solid ${color.error};
      background-color: ${color.white};
      color: ${color.black};

      &:hover,
      &:focus {
        border: 1px solid ${color.error};
        outline: none;
      }

      &:active {
        border: 1px solid ${color.error};
      }
    `}
`;

const ErrorMessage = styled.div`
  margin-top: 0.4rem;
  color: ${color.error};
  ${typography.font15Regular};
`;
