import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ConnectLLM } from './pages/ConnectLLM';
import { Chat } from './pages/Chat';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/connect-llm" element={<ConnectLLM />} />
        </Route>

        {/* Protected App Routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<div className="p-8">Home Dashboard</div>} />
          <Route path="chat" element={<Chat />} />
          <Route path="projects" element={<div className="p-8">Projects Listing</div>} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<div className="p-8">Support Center</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;