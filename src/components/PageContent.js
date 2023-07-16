import React, { useState, useEffect } from 'react';
import Product from './Product';

const PageContent = () => {
  const products = ["soap", "kurta", "salwar", "top"];

  return (
    <div className="all-prods-wrapper">
       <div className="all-prods">
          {products.map((name, index) => (
              <Product productName ={name}/>
            ))}
       </div>
       
    </div>
  );
}

export default PageContent;
