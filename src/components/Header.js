import React, { useState, useEffect } from 'react';

import '../css/Header.css';


const Header = ({activePage, onPageChange}) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleButtonClick = (pageName) => {
    if (activePage !== pageName) {
        onPageChange(pageName);
      }
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/brand?id=4');
        const json = await response.json();
        console.log("results", json[0]);
        setData(json[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="header-wrapper">
        <div className='header-sub-wrap'>
            <div>
                <a className='brand-logo' style={{ backgroundImage: `url(${data.logoUrl})` }}></a>
            </div>
            <div className='brand-desc'>
                <a> {data.brandName} </a>
                <span>{data.brandDescription}</span>
            </div>
        </div>
        <div className='nav-wrap'>
            <a onClick={() => handleButtonClick('page1')}>All Product</a>
            <a onClick={() => handleButtonClick('page2')}>Videos</a>
            <a onClick={() => handleButtonClick('page3')}>Styles</a>
        </div>
    </div>
  );
}

export default Header;
