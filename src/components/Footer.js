import React, { useState, useEffect } from 'react';
import '../css/Footer.css';

const Header = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="footer-wrapper">
        <div className="option-wrapper">
            <a>Sort</a>
            <a>Filter</a>
         </div>
    </div>
  );
}

export default Header;
