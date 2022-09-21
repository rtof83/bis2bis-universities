import React from 'react';
import Home from './pages/home';
import University from './pages/university';
import ListUniversity from './lists/listUniversity';
import Footer from './components/footer';
import Header from './components/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
          <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/university' element={<University />} />
          <Route path='/university/:id' element={<University />} />
          <Route path='/listUniversity' element={<ListUniversity />} />
        </Routes>
      <Footer />
    </Router>
  )
};

export default App;
