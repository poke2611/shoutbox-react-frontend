import React, { useState, useEffect } from 'react';
import '../css/Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopup } from '../store/actions';
import SortPopup from './SortPopup';
import FilterPopup from './FilterPopup';
import { setPageName } from '../store/actions';


const Footer = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const reduxIsPopupOpen = useSelector(state => state.isPopupOpen);

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
              <a onClick={handlePopupToggle}>Sort</a>
              <a onClick={handleFilterPopup}>Filter</a>
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