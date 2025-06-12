// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';
import TaskDetailPage from './pages/TaskDetailPage.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
