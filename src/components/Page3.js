import React, { useState, useEffect } from 'react';
import '../css/Page3.css';


const Page3 = (props) => {


  return (
    <div className="page3-comp"> 
            <div className='prod-other-img'>
                <div>
                      <img src={props.product.imageUrl} className='page3-prod-img'/>
                </div>
                <div>
                    <img src={props.product.imageUrl} className='page3-prod-img'/>
                </div>
            </div>
            <div className='page3-prod-info'>
                <div className='page3-brand-name'>{props.product.brandName}</div>
                <div className='page3-prod-detail'>{props.product.title}</div>
                {/* <div className='page3-rating'>4</div> */}
                <div className='partition-line'></div>
                <div className='page3-price-info'><span className='page3-actual-price' >{props.product.initialPrice != null ? (
                        <>&#x20B9;{props.product.initialPrice}</>
                      ) : (
                        ''
                      )}</span>
                    <span className='page3-selling-price' > &#x20B9;{props.product.finalPrice}</span>
                    <span className='page3-dis-per'>{" "}{props.product.discountPercentage}</span>
                </div>
                <div className='taxes'>Inclusive of all taxes</div>
                <div className='product-info-wrapper'>
                 {/* <div>
                    <span className='page3-heading'>Product Information</span>
                    <div className='product-info-sub-wrapper'>
                      <div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                      </div>
                      <div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  */}
                  <div className='page3-product-desc'>
                    <span className='page3-heading'>Product Description</span>
                    <span className='page3-desc-span'>{props.product.description}</span>
                  </div>
                  
                    {/*
                    <div className='page3-material'>
                        <span className='page3-heading'>Material & Care</span>
                        <span className='page3-desc-span'>Machine wash in cold water</span>
                      </div>*/
                      } 
                </div>
                
            </div>
            <a className='buy-now' href='https://kamikubi.com/cart/add?id=42841423184061&quantity=1'>Buy Now</a>
            {/*<a className='buy-now' href={props.product.productUrl}>Buy Now</a> */}
        
    </div>
  );
}

export default Page3;