import React, { useState, useEffect } from 'react';
import imge from '../images/9.jpeg';
import '../css/Product.css';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';


const ProdCards = (props) => {
 
  return (
    <div className="scproduct-wrapper">
       <div className='scp-image-div'>
          <img />
       </div>
       <div className='scp-dec'>
          <span className='scp-brand-name'></span>
          <span className='scp-price'></span>
          <span className='scp-discount'></span>
       </div>
    </div>
  );
}

export default Product;
