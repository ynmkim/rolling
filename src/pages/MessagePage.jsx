import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import DESIGN_TOKEN from '../styles/tokens';
import InputText from '../components/elements/InputText';
import Dropdown from '../components/elements/Dropdown';
import Avatar from '../components/elements/Avatar';
import TextEdit from '../components/message/TextArea';
import Button from '../components/elements/Button';
import useAsync from '../hooks/useAsync';
import { getProfileImage } from '../api/users';
import { createMessage } from '../api/posts';

const RELATIONSHIP = ['지인', '동료', '친구', '가족'];
const FONT = ['Noto Sans', 'Pretendard', '나눔명조'];

const INITIAL = {
  sender: '',
  profileImageURL: '',
  relationship: RELATIONSHIP[0],
  content: '',
  font: FONT[0],
};
function MessagePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProfileLoading, isProfileError, getProfileImageAsync] = useAsync(getProfileImage);
  const [isPostLoading, isPostError, postMessageAsync] = useAsync(createMessage);
  const [values, setValues] = useState(INITIAL);
  const [profileData, setProfileData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [isBlank, setIsBlank] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessageAsync(id, values).then(() => {
      navigate(`/post/${id}`);
    });
  };

  const handleProfileClick = (value) => {
    setValues((preValues) => ({ ...preValues, profileImageURL: value }));
    setSelectedProfile(value);
  };

  const handleBlur = (e) => {
    setIsBlank(!e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => ({ ...preValues, [name]: value }));
    setIsBlank(!e.target.value);
  };

  useEffect(() => {
    const handleProfileLoad = async () => {
      const result = await getProfileImageAsync();
      if (!result) return;
      const { imageUrls } = result;
      setProfileData(imageUrls);
      setSelectedProfile(imageUrls[0]);
      setValues((preValues) => ({ ...preValues, profileImageURL: imageUrls[0] }));
    };

    handleProfileLoad();
  }, [getProfileImageAsync, isBlank]);

  return (
    <Container>
      <form>
        <Section>
          <Title htmlFor="sender">From.</Title>
          <InputText
            id="sender"
            name="sender"
            value={values.sender}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isBlank}
          />
        </Section>
        <Section>
          <Title>프로필 이미지</Title>
          <OptionProfile>
            <Avatar size="large" profileImageURL={selectedProfile} />
            <Section>
              <Description>프로필 이미지를 선택해주세요!</Description>
              <StyledAvatar>
                {profileData?.map((item) => (
                  <Avatar key={item} size="medium" profileImageURL={item} handleProfileClick={handleProfileClick} />
                ))}
              </StyledAvatar>
            </Section>
          </OptionProfile>
        </Section>
        <Section>
          <Title>상대와의 관계</Title>
          <Dropdown name="relationship" setValues={setValues} items={RELATIONSHIP} />
        </Section>
        <Section>
          <Title htmlFor="content">내용을 입력해 주세요</Title>
          <TextEdit id="content" name="content" value={values.content} onChange={handleChange} />
        </Section>
        <Section>
          <Title>폰트 선택</Title>
          <Dropdown name="font" setValues={setValues} items={FONT} />
        </Section>
        <SubmitButton>
          <Button
            type="submit"
            $variant="primary"
            height="x-large"
            disabled={!values.sender || !values.content || isPostLoading}
            onClick={handleSubmit}
          >
            생성하기
          </Button>
        </SubmitButton>
      </form>
    </Container>
  );
}

export default MessagePage;

const { color, typography, layout } = DESIGN_TOKEN;

const Container = styled.div`
  max-width: ${layout.breakpoint.mobile};
  margin: 0 auto;
  padding: 5.7rem 2.4rem;
  @media screen and (max-width: ${layout.breakpoint.mobile}) {
    padding-bottom: 22.6rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 5rem;
`;

const Title = styled.label`
  ${typography.font24Bold}
`;

const Description = styled.p`
  grid-area: image;
  ${typography.font16Regular};
  color: ${color.gray[500]};
`;

const OptionProfile = styled.div`
  display: grid;
  grid-template:
    'img text'
    'img image' / auto 1fr;
  column-gap: 3.2rem;
`;

const StyledAvatar = styled.div`
  grid-area: image;
  display: flex;
  gap: 0.4rem;
  align-items: center;

  img {
    cursor: pointer;
  }

  @media screen and (max-width: ${layout.breakpoint.mobile}) {
    flex-wrap: wrap;
  }
`;

const SubmitButton = styled.div`
  position: fixed;
  left: 2.4rem;
  right: 2.4rem;
  bottom: 2.4rem;
  margin-top: 1.2rem;
`;
