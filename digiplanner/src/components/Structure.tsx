import React from 'react';
import '../SassComponents/Structure.scss';
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
