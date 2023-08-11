import React, { useState, useEffect } from 'react';
import './App.css';
import { createStore } from 'redux';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import {Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import FixedHeader from './components/FixedHeader';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page4 from './components/Page4';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Cookies from 'js-cookie';



function App() {
  const isPopupOpen = true;
 // const cartID = useSelector(state => state.cartID);

  return (
   
      <div className="App" >
        <FixedHeader  />
            <div>
              <Header  />
            </div>
        <div className='wrapper-upper'>
          
          <div className="wrapper">
            
            <div className ='page-content'>
                  <Routes>
                   
                    <Route path={`/`} element={<Page2 />} />
                    <Route path={`/styles`} element={<Page4 />} />
                    <Route path={`/`} element={<Page2 />} />
                    <Route path={`/styles`} element={<Page4 />} />   
                           
                  </Routes>
            </div>
            
          </div>
        </div>
       
      </div>

  );
}

export default App;
