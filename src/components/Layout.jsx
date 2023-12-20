import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyles from '../styles/globalStyle';
import GNB from './GNB';

function Layout() {
  return (
    <>
      <GlobalStyles />
      <GNB />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
