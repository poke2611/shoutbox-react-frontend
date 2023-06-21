import React, { useState, useEffect } from 'react';
import './App.css';
import {Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page4 from './components/Page4';
import Footer from './components/Footer';

function App() {
  const [activePage, setActivePage] = useState('/');

  const handlePageChange = (pageName) => {
    console.log("pageName", pageName);
    setActivePage(pageName);
  };
 

  return (
      <div className="App">
        <div className="wrapper">
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

              {  
              
              /*  
                {activePage === 'page1' && <Page1 />}
                  {activePage === 'page2' && <Page2 />}
                  {activePage === 'page3' && <Page4 /> } 

                  
              */}
          
          
        </div>
      </div>

  );
}

export default App;
