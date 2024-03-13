import React from 'react';
// import '../assets/styles/Structure.scss';
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
      <footer>{/* <Footer /> */}</footer>
    </>
  );
}

export default Structure;
