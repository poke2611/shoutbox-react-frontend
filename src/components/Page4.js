import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Page2.css';
import '../css/Page4.css';
import Page3 from './Page3';
import ProdBrandHeader from './ProdBrandHeader';
import bag from '../images/BAG.png';
import Footer from './Footer';

const Page4 = () => {

  const [data, setData] = useState([]);
  const [product, setProduct] =useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const popupRef = useRef(null);
  const sortedProducts = useSelector(state => state.sortedProducts);
  const filteredProducts = useSelector(state => state.filteredProducts);
  const sortFlag = useSelector(state => state.sortFlag);
  const filterFlag = useSelector(state => state.filterFlag);
  const sortOn = useSelector(state => state.sortOn);
  const selectedCategory = useSelector(state => state.selectedCategory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4&type=L&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&page='+pageNumber);
        const json = await response.json();
        console.log("results Page 4", json);
        setData(prevData => [...prevData, ...json]);
       // setProduct(json[0]);
      
        console.log("product page 4",json[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

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

  useEffect(() => {

    let displayedProducts = data;

    if (filterFlag && !sortFlag) {
      displayedProducts = filteredProducts;
    }
    if(sortFlag && !filterFlag){
      displayedProducts = sortedProducts;
    } 
    
    if(sortFlag && filterFlag){
      displayedProducts = filteredProducts;
      console.log("disp", displayedProducts);
    } 
    setData(displayedProducts);

  },[sortOn, filterFlag, sortFlag, filteredProducts, sortedProducts])

  const showPopup = () => {
    console.log('Div clicked!');
    setPopupOpen(true);   
  };

  const closePopup = () => {
   
    console.log('popup closed clicked!');
    setPopupOpen(false);
  };


  return (
    <div className="page4-comp">
       <div >
          <ProdBrandHeader />
            <div>
            {data.map((product, index) => (
              <div>
                <div className="page4-img-container">
                    <img src={product.link} className='page4-prod-img'/>
                </div>
                <div className='scrolling-product-wrapper'>
                      <div className='shop-all'>
                          <a className='shop-all-btn'>
                              <img src={bag} height={30} width={30} />
                          </a>
                          <a> SHOP ALL</a>
                      </div>
                      <div className='scp-all-wrapper'>
                      {product.products.map((prod, index) => (
                          <div className='scp-wrapper' onClick={()=>{setProduct(prod); showPopup()}}>
                              <div className='scp-image-div' style={{ backgroundImage: `url(${prod.imageUrl})`}}>
                              </div>
                              <div className='scp-desc'>
                                  <div className='scp-brand-name'><span>{prod.title}</span></div>
                                  <div className='scp-price'><span className='actual-price' >{prod.initialPrice != null ? (
                                      <>&#x20B9;{prod.initialPrice}</>
                                    ) : (
                                      ''
                                    )}</span>
                                  <span className='selling-price' > &#x20B9;{prod.finalPrice}</span></div>
                                  <div>
                                      <span className='scp-discount'>{prod.discountPercentage}</span>
                                       {/*<span className='rating'>4</span> */}
                                  </div>
                              </div> 
                          </div>
                      ))}
                          
                    </div>
                </div>
              </div>
              ))}
            </div>
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

export default Page4;
