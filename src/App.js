import React, { useState, useEffect } from 'react';
import './App.css';
import { createStore } from 'redux';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import {Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page4 from './components/Page4';
import Footer from './components/Footer';

const store = createStore(rootReducer);

function App() {
  const isPopupOpen = true;
  
  return (
    <Provider store={store}>
      <div className="App" >
        <div className={`wrapper ${isPopupOpen ? 'blur' : ''}`}>
          <div>
            <Header  />
          </div>
          <div className ='page-content'>
                <Routes>
                  <Route path="/" element={<Page1 />} />
                  <Route path="/videos" element={<Page2 />} />
                  <Route path="/styles" element={<Page4 />} />             
                </Routes>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
