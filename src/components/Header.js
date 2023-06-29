import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import { NavLink } from 'react-router-dom';



const Header = () => {

 const [data, setData] = useState([]);
 const [activePage, setActivePage] = useState('page1');

  const handleButtonClick = (pageName) => {   
    console.log("page chNGW", pageName);
    if (activePage !== pageName) {
      console.log("page chNGW", pageName);
         setActivePage(pageName);
         // onPageChange(pageName);
      }
  };

  
  useEffect(() => {
    console.log("header comp", activePage);
    const fetchData = async () => {
      try {
        const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/brand?id=4');
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
                <span onClick={()=>console.log("description")}>{data.brandDescription}</span>
            </div>
        </div>
        <div className='nav-wrap'>

            <NavLink className={'nav-heading'}  exact to="/">All Products</NavLink>
            <NavLink className={'nav-heading'}  to="/videos">Videos</NavLink>
            <NavLink className={'nav-heading'}  to="/styles">Styles</NavLink>
      
            
            {/*  
            
              <a className={activePage === 'page1' ? 'active' : ''}
                         onClick={(e) => handleButtonClick('page1', e)}>All Products</a>
            <a className={activePage === 'page2' ? 'active' : ''}
                          onClick={(e) => handleButtonClick('page2', e)}>Videos</a>
            <a className={activePage === 'page3' ? 'active' : ''}
                          onClick={(e) => handleButtonClick('page3', e)}>Styles</a>
            */}
        </div>
    </div>
  );
}

export default Header;
