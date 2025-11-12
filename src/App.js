import React from 'react';
import LandingPage from './LandingPage'
import Portfolio from './Portfolio.jsx'
import Portfolio1 from './Portfolio1.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio2 from './Portfolio2.jsx'
import Portfolio3 from './Portfolio3.jsx'

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/saurabhgalgale" element={<Portfolio />} />
        <Route path="/saurabhgalgale1" element={<Portfolio1 />} />
        <Route path="/saurabhgalgale2" element={<Portfolio2 />} />
        <Route path="/saurabhgalgale3" element={<Portfolio3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
