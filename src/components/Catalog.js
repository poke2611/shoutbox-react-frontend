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

  return (
    <div className="product-catalog-wrapper"> 
        <div className='prods-div'>
            <div className='catalog-heading'><span>Products in Videos</span></div>
            <div className='prods-scroll-div'>
             
              {  video.products.map((prod)=> (
                <div onClick={()=>{setProduct(prod); showPopup()}}>
                     <Product product ={prod} />
                </div>
                ))}
                
            </div>
        </div>
        <div className='sim-prods-div'>
            <div className='catalog-heading'><span>Similar Products</span></div>
            <div className='sim-prods-scroll-div'></div>
        </div>

        {isPopupOpen && (
            <div className="popup">
              <div className="popup-content" ref={popupRef}>
                <Page3 product={product}/>
              </div>
            </div>
          )}
            
    </div>
  );
}

export default Catalog;