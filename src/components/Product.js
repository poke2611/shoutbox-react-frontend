import React, { useState, useEffect } from 'react';
import imge from '../images/9.jpeg';
import '../css/Product.css';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';


const Product = (props) => {
  
  const [isClicked, setIsClicked] = useState(false);

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    // Effect logic here
    console.log('Component mounted',props.product.products[0].brandName);

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
            <div className='imageContainer' style={{ backgroundImage: `url(${props.product.products[0].imageUrl})`}}>
                
            </div>
          </a>
       </div>
       
       <div className='prod-desc'>
            <a className='prod-name'>{props.product.products[0].brandName}</a> 
            
            {isClicked ? (
                <RiHeartFill style={iconStyle} onClick={handleIconClick} />
            ) : (
                <RiHeartLine style={iconStyle} onClick={handleIconClick} />
            )}     
            
            <a className='prod-metadata'>{props.product.products[0].description}</a>
            <div className='price-info'><span className='actual-price' >{props.product.products[0].initialPrice != null ? (
                            <>&#x20B9;{props.product.products[0].initialPrice}</>
                          ) : (
                            ''
                          )}</span>
                        <span className='selling-price' > &#x20B9;{props.product.products[0].finalPrice}</span>
                        <span className='dis-per'>{" "}{props.product.products[0].discountPercentage}</span>
            </div>
       </div>
       
    </div>
  );
}

export default Product;
