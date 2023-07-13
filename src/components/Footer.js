import React, { useState, useEffect } from 'react';
import '../css/Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopup } from '../store/actions';
import SortPopup from './SortPopup';
import FilterPopup from './FilterPopup';


const Footer = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const reduxIsPopupOpen = useSelector(state => state.isPopupOpen);
  const sortFlag = useSelector(state => state.sortFlag);
  const filterFlag = useSelector(state => state.filterFlag);

  const handlePopupToggle = () => {
    setPopupOpen(!isPopupOpen);
    dispatch(togglePopup(!isPopupOpen));
  };

  const handleFilterPopup = () => {
    setFilterPopupOpen(!isFilterPopupOpen);
  //  dispatch(togglePopup(!isPopupOpen));
  };

  return (
    <div>
      <div className="footer-wrapper">
          <div className="option-wrapper">
              <a onClick={handlePopupToggle}>Sort{sortFlag?<span className='blue-dot'></span>:''}</a>
              <a onClick={handleFilterPopup}>Filter{filterFlag?<span className='blue-dot'></span>:''}</a>
          </div>
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

export default Footer;