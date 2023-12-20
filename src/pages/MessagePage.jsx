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
    <Form>
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
        <Wrapper>
          <Avatar size="large" profileImageURL={selectedProfile} />
          <Section>
            <Description>프로필 이미지를 선택해주세요!</Description>
            <ProfileWrapper>
              {profileData?.map((item) => (
                <Avatar key={item} size="medium" profileImageURL={item} handleProfileClick={handleProfileClick} />
              ))}
            </ProfileWrapper>
          </Section>
        </Wrapper>
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
          variant="primary"
          height="x-large"
          disabled={!values.sender || !values.content || isPostLoading}
          onClick={handleSubmit}
        >
          생성하기
        </Button>
      </SubmitButton>
    </Form>
  );
}

export default MessagePage;

const { color, typography, layout } = DESIGN_TOKEN;

const Form = styled.form`
  margin: 0 auto;
  padding: 5.7rem 2.4rem;
  max-width: ${layout.breakpoint.mobile};
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.label`
  ${typography.font24Bold}
  margin-bottom: 1.2rem;
`;
const Description = styled.p`
  color: ${color.gray[500]};
  ${typography.font16Regular};
  margin-bottom: 1.2rem;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 3.2rem;
  align-items: center;
`;
const ProfileWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
`;
const SubmitButton = styled.div`
  margin-top: 1.2rem;
`;
