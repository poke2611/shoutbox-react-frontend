import React, { useState, useEffect } from 'react';
import imge from '../images/9.jpeg';
import '../css/Product.css'


const Product = (props) => {
  const count = 4;

  return (
    <div className="product-wrapper">
       <img src= {imge} height={272} width={165}/>
       <div className='prod-desc'>
            <a className='prod-name'>{props.productName}</a>
            <a className='prod-metadata'></a>
            <a className='prod-metadata'><del>&#x20B9;49000</del><strong> &#x20B9;49000</strong>
            </a>
       </div>
       
    </div>
  );
}

export default Product;
