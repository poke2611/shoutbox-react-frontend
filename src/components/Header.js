import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageName } from '../store/actions';

const Header = () => {

 const [data, setData] = useState([]);
 const [activePage, setActivePage] = useState('page1');
 const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("header comp", activePage);
    const fetchData = async () => {
      try {
        const response = await fetch('https://cliptocart.co.in/brand?id=4');
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
        
        <div className='nav-wrap'>

            <NavLink className={'nav-heading'}  onClick={()=> dispatch(setPageName("P"))} exact to="/">All Products</NavLink>
            <NavLink className={'nav-heading'}  onClick={()=> dispatch(setPageName("V"))} to="/videos">Videos</NavLink>
            <NavLink className={'nav-heading'}  onClick={()=> dispatch(setPageName("L"))} to="/styles">Styles</NavLink>
      
        </div>
    </div>
  );
}

export default Header;