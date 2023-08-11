import React, { useState, useEffect } from 'react';
import imge from '../images/9.jpeg';
import '../css/Product.css';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';


const Product = (prod) => {
  
  const [isClicked, setIsClicked] = useState(false);
  const product = prod.product;
  const handleIconClick = (event) => {
    console.log("product.brandName", product);
    event.stopPropagation();
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    // Effect logic here
    console.log('Component mounted',product.brandName);
    // Cleanup function
    
  }, [])
  
  const iconStyle ={color: isClicked ? 'red' : '#9b9b9b' , 
                    fontSize: '17px',
                    float: 'right',
                    cursor:'pointer'
                  }
                 

  return (
    <div className="product-wrapper">
       <div className='prod-img'>
          <a>
            <div className='imageContainer' style={{ backgroundImage: `url(${product.imageUrl})`}}> 
            </div>
          </a>
       </div>
       
       <div className='prod-desc'>
            <a className='prod-name'>{product.brandName}</a> 
            
            {/*isClicked ? (
                <RiHeartFill style={iconStyle} onClick={handleIconClick} />
            ) : (
                <RiHeartLine style={iconStyle} onClick={handleIconClick} />
            )*/}     
            
            <span className='prod-metadata'>{product.title}</span>
            <div className='price-info'><span className='actual-price' >{product.initialPrice != null ? (
                            <>&#x20B9;{product.initialPrice}</>
                          ) : (
                            ''
                          )}</span>
                        <span className='selling-price' > &#x20B9;{product.finalPrice}</span>
                        <span className='dis-per'>{" "}{product.discountPercentage}</span>
            </div>
       </div>
       
    </div>
  );
}

export default Product;
