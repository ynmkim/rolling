const shareKakao = (url, name, image) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init('d4e0d6aa8be82a57ce34a4b1e4bae59b');
    }

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: name,
        description: name,
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
