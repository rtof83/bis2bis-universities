import React, { useState } from 'react';
import Home from './pages/home';
import Customer from './pages/customer';
import Product from './pages/product';
import ListCust from './lists/listCust';
import ListProd from './lists/listProd';
import ListOrder from './lists/listOrder';
import Footer from './components/footer';
import Header from './components/header';
import UserContext from './contexts/UserContext';
import ListContext from './contexts/ListContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/cart';

const App = () => {
  const [ user, setUser ] = useState([]);
  const [ list, setList ] = useState([]);

  return (
    <UserContext.Provider value={[ user, setUser ]}>
      <ListContext.Provider value={[ list, setList ]}>

        <Router>
          <Header />
             <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/customer' element={<Customer />} />
              <Route path='/customer/:id' element={<Customer />} />
              <Route path='/product' element={<Product />} />
              <Route path='/product/:sku' element={<Product />} />
              <Route path='/listCust' element={<ListCust />} />
              <Route path='/listProd' element={<ListProd />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/listOrder' element={<ListOrder />} />
            </Routes>
          <Footer />
        </Router>

      </ListContext.Provider>
    </UserContext.Provider>
  )
};

export default App;
