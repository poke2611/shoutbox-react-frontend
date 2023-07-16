import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandId } from '../store/actions';

const Header = () => {

 const [id, setID] = useState([]);
 const [activePage, setActivePage] = useState('page1');
 const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("header comp", activePage);
    const fetchData = async () => {
      try {
        const response = await fetch('https://cliptocart.co.in/brand?id=4');
        const json = await response.json();
        console.log("Header", json[0]);
        setID(json[0].id);
        setBrandId(json[0].id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="header-wrapper">
        
        <div className='nav-wrap'>

        <NavLink className={'nav-heading'} exact to={`/`}>All Products</NavLink>
        <NavLink className={'nav-heading'} to={`/videos`}>Videos</NavLink>
        <NavLink className={'nav-heading'} to={`/styles`}>Styles</NavLink>
      
        </div>
    </div>
  );
}

export default Header;