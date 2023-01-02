import React, { useState } from 'react';

import Home from './pages/home';
import University from './pages/university';
import User from './pages/user';
import Config from './pages/config';
import NotFound from './pages/notFound';

import ListUniversity from './lists/listUniversities';
import ListUsers from './lists/listUsers';
import ListLogs from './lists/listLogs';

import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchContext, UserContext } from './contexts/Contexts';

const App = () => {
  const [ user, setUser ] = useState([]);
  const [ search, setSearch ] = useState([]);

  return (
    <SearchContext.Provider value={[ search, setSearch ]}>
    <UserContext.Provider value={[ user, setUser ]}>

      <Router>
        <Header />
            <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/listUniversity' element={<ListUniversity />} />

            { user.auth && <>
            <Route path='/user' element={<User />} />
            <Route path='/user/:id' element={<User />} />
            <Route path='/listUsers' element={<ListUsers />} />

            <Route path='/config' element={<Config />} />
            <Route path='/listLogs' element={<ListLogs />} />
            
            <Route path='/university' element={<University />} />
            <Route path='/university/:id' element={<University />} />
            </> }

            <Route path='*' exact={true} element={<NotFound />} />
          </Routes>
        <Footer />
      </Router>

    </UserContext.Provider>
    </SearchContext.Provider>
  )
};

export default App;
