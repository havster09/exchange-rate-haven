import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rates from './Pages/Rates';

import MainLayout from './Layouts/MainLayout';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/rates"
          element={
            <MainLayout title={'Rates'}>
              <Rates />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout title={'Rates'}>
              <Rates />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
