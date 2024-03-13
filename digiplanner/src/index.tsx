import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notes from './pages/Notes';
import Priority from './pages/Priority';
import Structure from './components/Structure';
import '../src/assets/styles/abstracts/_variables.scss';
import '../src/assets/styles/Index.scss';
import '../src/assets/styles/abstracts/_custom.scss';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Structure />}>
          <Route index element={<Notes />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/priority" element={<Priority />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
