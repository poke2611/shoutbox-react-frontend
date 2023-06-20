import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PageContent from './components/PageContent';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Footer from './components/Footer';

function App() {
  const [activePage, setActivePage] = useState('page1');

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
    console.log("pageName", pageName);
  };


  return (
    <div className="App">
      <div className="wrapper">
        <div>
          <Header activePage = {activePage} onPageChange={handlePageChange} />
        </div>
        <div className ='page-content'>

        <Page4 />
         {/* {activePage === 'page1' && <Page1 />}
          {activePage === 'page2' && <Page2 />}
  {activePage === 'page3' && <PageContent /> }*/}
         
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
