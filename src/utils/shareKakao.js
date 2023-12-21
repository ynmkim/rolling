import LogoImg from '../assets/images/logo.png';

const shareKakao = (url, name, backgroundImageURL) => {
  const image = backgroundImageURL || LogoImg;

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.cleanup();
      kakao.init('d4e0d6aa8be82a57ce34a4b1e4bae59b');
    }
    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `Rolling | ${name}`,
        description: `${name}님에게 편지를 보내세요`,
        imageUrl: image,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: name,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  }
};

export default shareKakao;
