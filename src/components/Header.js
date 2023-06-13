import React, { useState, useEffect } from 'react';
import '../css/Header.css';

const Header = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="header-wrapper">
        <div className='header-sub-wrap'>
            <div>
                <a className='brand-logo'></a>
            </div>
            <div className='brand-desc'>
                <a> Daily objects </a>
                <span>
                Delightful and Inspiring products for the possibilities of Every day. 
                Because, Every day is special. Every day deserves something special.
                </span>
            </div>
        </div>
        <div className='nav-wrap'>
            <a>All Product</a>
            <a>Videos</a>
            <a>Styles</a>
        </div>
    </div>
  );
}

export default Header;
