import React from 'react';
import { Helmet } from 'react-helmet';
import Intro from '../components/main/Feature';

function MainPage() {
  return (
    <>
      <Helmet>
        <title>Rolling</title>
      </Helmet>
      <Intro />
    </>
  );
}

export default MainPage;
