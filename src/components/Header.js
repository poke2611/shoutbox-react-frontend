import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandId } from '../store/actions';
import sort from '../images/sort.png';
import filter from '../images/filter.png';
import SortPopup from './SortPopup';
import FilterPopup from './FilterPopup';

const Header = () => {

 const [isPopupOpen, setPopupOpen] = useState(false);
 const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);
 const dispatch = useDispatch();

  const handlePopupToggle = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleFilterPopup = () => {
    setFilterPopupOpen(!isFilterPopupOpen);
  //  dispatch(togglePopup(!isPopupOpen));
  };

  return (
    <div className="header-wrapper">
        
        <div className='nav-wrap'>

     { /*  <NavLink className={'nav-heading'} exact to={`/`}>All Products</NavLink> */}
          <NavLink className={'nav-heading'} to={`/`}>Videos</NavLink>
          <NavLink className={'nav-heading'} to={`/styles`}>Styles</NavLink>
          <a className={'sort-icon'} onClick={handlePopupToggle}><img src={sort} width={20} height={20}/></a>
          <a className={'filter-icon'} onClick={handleFilterPopup}><img src={filter} width={20} height={20}/></a>
        </div>

        {isPopupOpen && (
            <SortPopup handlePopup={handlePopupToggle}/>
          )}
      {isFilterPopupOpen && (
            <FilterPopup handlePopup={handleFilterPopup}/>
          )}
    </div>
  );
}

export default Header;