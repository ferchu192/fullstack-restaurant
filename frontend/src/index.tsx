import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

// Pages
import Home from './pages/home'
import Menu from './pages/menu';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/restaurant/:idRestaurant" Component={Menu} />
        <Route path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);