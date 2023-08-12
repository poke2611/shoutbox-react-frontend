import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Catalog.css';
import Product from './Product';
import Page3 from './Page3';

const Catalog = (props) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [product, setProduct] = useState({});
    const popupRef = useRef(null);
    let video= props.video;
    console.log("Catalog video",video);

      useEffect(() => {

        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            setPopupOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
     
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const showPopup = () => {
        setPopupOpen(true);   
      };

      const closePopup = () => {
        setPopupOpen(false);
      };

  return (
    <div className="product-catalog-wrapper"> 
        <div className='prods-div'>
            <div className='catalog-heading'>
                <span>Products in Videos</span>
                <a className={"close-catalog-btn"} onClick={props.onClose}>x</a></div>
            <div className='prods-scroll-div'>
             
              {  video.products.map((prod)=> (
                <div onClick={()=>{setProduct(prod); showPopup()}}>
                     <Product product ={prod} />
                </div>
                ))}
                
            </div>
        </div>
        {  
         video.similarProducts!=null&&video.similarProducts.length>0?
                <div className='sim-prods-div'>
                    <div className='catalog-heading'><span>Similar Products</span></div>
                    <div className='sim-prods-scroll-div'>
                        {  video.similarProducts.map((prod)=> (
                            <div onClick={()=>{setProduct(prod); showPopup()}}>
                                <Product product ={prod} />
                            </div>
                            ))}
                    </div>
                </div>:''
        }   
        {isPopupOpen && (
            <div className="popup">
              <div className="popup-content" ref={popupRef}>
              <div className='close-popup-btn'><a className='' onClick={closePopup}>x</a></div>
                <Page3 product={product}/>
              </div>
            </div>
          )}
            
    </div>
  );
}

export default Catalog;