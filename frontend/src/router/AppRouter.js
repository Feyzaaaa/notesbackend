import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotePage from '../pages/NotePage';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../components/Layout';

/**
 * Main router component for the application
 * Defines all available routes
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home page - shows list of notes */}
          <Route index element={<HomePage />} />
          
          {/* Individual note page with id parameter */}
          <Route path="notes/:id" element={<NotePage />} />
          
          {/* Create new note */}
          <Route path="notes/new" element={<NotePage />} />
          
          {/* 404 page */}
          <Route path="404" element={<NotFoundPage />} />
          
          {/* Redirect any unknown paths to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;