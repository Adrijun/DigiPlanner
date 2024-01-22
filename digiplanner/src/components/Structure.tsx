import React from 'react';
import '../Sass components/Structure.scss';
import { Outlet } from 'react-router-dom';
import Header from './Header';
function Structure() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default Structure;
