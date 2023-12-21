import React, { styled, css } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Button from '../components/elements/Button';
import checkIcon from '../assets/icons/check.svg';
import DESIGN_TOKEN from '../styles/tokens';
import { createRecipient } from '../api/posts';
import useAsync from '../hooks/useAsync';

const { color, typography, layout } = DESIGN_TOKEN;
const COLOR_VALUES = ['beige', 'green', 'purple', 'blue'];
const IMAGE_VALUES = [
  'https://ymkimstorage.s3.ap-northeast-2.amazonaws.com/optionImage1.png',
  'https://ymkimstorage.s3.ap-northeast-2.amazonaws.com/optionImage2.png',
  'https://ymkimstorage.s3.ap-northeast-2.amazonaws.com/optionImage3.png',
  'https://ymkimstorage.s3.ap-northeast-2.amazonaws.com/optionImage4.png',
];
const VARIANT_STYLE = {
  color: css`
    background: ${({ value }) => value && color[value][200]};
    &:hover {
      border: 3px solid ${({ value }) => color[value][300]};
    }
  `,
  image: css`
    background-image: ${({ value }) => `url('${value}')`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
};

function CreatePage() {
  const [isLoading, isError, createRecipientAsync] = useAsync(createRecipient);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const nameInput = useRef();
  const [errorMessage, setErrorMessage] = useState(false);
  const [values, setValues] = useState({
    name: '',
    backgroundColor: 'beige',
    backgroundImageURL: null,
  });

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleTabClick(index);
    }
  };

  const handleChangeValues = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage(false);
    setDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.name.length < 1) {
      nameInput.current.focus();
      setErrorMessage(true);
      setDisabled(true);
      return;
    }

    createRecipientAsync(values).then(({ id }) => {
      navigate(`/post/${id}`);
    });
  };

  const TABS = [
    {
      label: '컬러',
      content: (
        <InputRadioGroup>
          {COLOR_VALUES.map((colors, index) => (
            <InputLabel htmlFor={`optionColor-${index}`} key={colors} value={colors} $variant="color">
              <InputRadio
                type="radio"
                id={`optionColor-${index}`}
                name="backgroundColor"
                value={colors}
                onChange={handleChangeValues}
                defaultChecked={index === 0}
              />
            </InputLabel>
          ))}
        </InputRadioGroup>
      ),
    },
    {
      label: '이미지',
      content: (
        <InputRadioGroup>
          {IMAGE_VALUES.map((image, index) => (
            <InputLabel htmlFor={`optionImage-${index}`} key={image} value={image} $variant="image">
              <InputRadio
                type="radio"
                id={`optionImage-${index}`}
                name="backgroundImageURL"
                value={image}
                onChange={handleChangeValues}
                defaultChecked={index === 0}
              />
            </InputLabel>
          ))}
        </InputRadioGroup>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>롤링페이퍼 만들기 | Rolling</title>
      </Helmet>
      <Container>
        <form>
          <Recipient>
            <Title htmlFor="recipient">To.</Title>
            <InputText
              type="text"
              id="recipient"
              name="name"
              value={values.name}
              onChange={handleChangeValues}
              ref={nameInput}
              placeholder="받는 사람 이름을 입력해주세요."
              autoComplete="name"
            />
            <ErrorMessage style={{ display: errorMessage ? 'block' : 'none' }}>값을 입력해주세요.</ErrorMessage>
          </Recipient>
          <Title>배경화면을 선택해주세요.</Title>
          <Description>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</Description>
          <TabList role="tablist">
            {TABS.map((item, index) => (
              <Tab
                role="tab"
                key={item.label}
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={index}
              >
                <TabButton type="button" className={index === activeTab ? 'active' : ''}>
                  {item.label}
                </TabButton>
              </Tab>
            ))}
          </TabList>
          <TabPanel role="tabpanel">{TABS[activeTab].content}</TabPanel>
          <StyledButton>
            <Button type="submit" $variant="primary" height="x-large" onClick={handleSubmit} disabled={!values.name}>
              생성하기
            </Button>
          </StyledButton>
        </form>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  padding: 5.7rem 2.4rem;
  max-width: ${layout.breakpoint.mobile};
  @media screen and (max-width: ${layout.breakpoint.mobile}) {
    padding-bottom: 8rem;
  }
`;

const Recipient = styled.div`
  margin-bottom: 5rem;
  label {
    margin-bottom: 1.2rem;
  }
`;

const Title = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  ${typography.font24Bold}
`;

const Description = styled.p`
  margin-bottom: 2.4rem;
  color: ${color.gray[500]};
  ${typography.font16Regular};
`;

const InputText = styled.input`
  width: 100%;
  height: 5rem;
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

const ErrorMessage = styled.span`
  margin-top: 0.8rem;
  color: ${color.error};
  ${typography.font15Regular};
`;

const TabList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 24.4rem;
  margin-bottom: 4.5rem;
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

const TabButton = styled.button`
  width: 100%;
  height: 4rem;
  background-color: ${color.gray[100]};
  ${typography.font16Regular};
  border-radius: 0.6rem;
  color: ${color.gray[900]};
`;

const TabPanel = styled.div`
  margin-bottom: 6.9rem;
`;

const InputRadioGroup = styled.div`
  display: grid;
  width: 100%;
  grid-template: repeat(1, 16.8rem) / repeat(4, 16.8rem);
  gap: 1.6rem;

  @media screen and (max-width: ${layout.breakpoint.mobile}) {
    grid-template: auto / repeat(2, minmax(15.4rem, 35.2rem));
  }
`;

const InputLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1.2rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  ${({ $variant }) => css`
    ${VARIANT_STYLE[$variant]}
  `};
`;

const InputRadio = styled.input`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:checked {
    display: block;
    width: 4.4rem;
    height: 4.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:checked:after {
    content: '';
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 50%;
    cursor: pointer;
    background: ${color.gray[500]} url('${checkIcon}') no-repeat center/ 2.4rem 2.4rem;
  }
`;

const StyledButton = styled.div`
  @media screen and (max-width: ${layout.breakpoint.mobile}) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 2.4rem;
    padding: 0 2.4rem;
  }
`;

export default CreatePage;
