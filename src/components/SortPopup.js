import React, { useState, useEffect } from 'react';
import '../css/Footer.css';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';


const SortPopup = ({handlePopup}) => {
 
  return (
    <div className="sort-popup" id="unblurred">
    <div className="sort-popup-content-wrapper" >
      <div className='sort-popup-header'>
        <span>Sort By</span>
        <a onClick={handlePopup}>x</a>
      </div>
      <ul className="sort-popup-content">
          <li>Popularity</li>
          <li>Price- low to high</li>
          <li>Price- high to low</li>
      </ul>
    </div>
  </div>
  );
}

export default SortPopup;
