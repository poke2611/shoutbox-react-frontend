import React, { useState, useRef, useEffect } from 'react';
import '../css/Page2.css';
import Page3 from './Page3';
import ProdBrandHeader from './ProdBrandHeader';
import ProductVideoPlayer from './ProductVideoPlayer';
import bag from '../images/bag.png';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './Footer';


const Page2 = () => {
 // const [videos, setVideos] = ["soap", "kurta", "salwar", "top","any","many"];
  const [videos, setVideos] = useState([]);
  const [product, setProduct] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const sortedProducts = useSelector(state => state.sortedProducts);
  const filteredProducts = useSelector(state => state.filteredProducts);
  const sortFlag = useSelector(state => state.sortFlag);
  const filterFlag = useSelector(state => state.filterFlag);
  const sortOn = useSelector(state => state.sortOn);
  const selectedCategory = useSelector(state => state.selectedCategory);
  

  useEffect(() => {

    let displayedProducts = videos;

    if (filterFlag && !sortFlag) {
      displayedProducts = filteredProducts;
    }
    if(sortFlag && !filterFlag){
      displayedProducts = sortedProducts;
    } 
    
    if(sortFlag && filterFlag){
      console.log("disp");
      displayedProducts = filteredProducts;
      //displayedProducts = sortedProducts.filter(prod => filteredProducts.includes(prod));
     // displayedProducts = filteredProducts.filter(prod => sortedProducts.includes(prod));
      console.log("disp", displayedProducts);
    } 
    setVideos(displayedProducts);

  },[sortOn, filterFlag, sortFlag, filteredProducts, sortedProducts])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4&type=V&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&page='+pageNumber);
        const json = await response.json();
        console.log("results Page videos", json);
        setVideos(prevData => [...prevData, ...json]);
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

  }, [pageNumber]);


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
    console.log('Div clicked!');
    setPopupOpen(true);   
  };

  const closePopup = () => {
   
    console.log('popup closed clicked!');
    setPopupOpen(false);
  };


  return (
    <div>
       <div className="video-comp">
          
            <div>
            {videos.map((vid, index) => (
              <div className='prod-vid-wrap'>
                <ProdBrandHeader product={vid}/>
                <div className="video-div">
                    <ProductVideoPlayer videoUrl={vid.link} fullscreen={false}/>
                </div>
                <div className='scrolling-product-wrapper'>
                      <div className='shop-all'>
                          <a className='shop-all-btn' onClick={()=> console.log("videor url", vid.link)}>
                              <img src={bag} height={25} width={25} />
                          </a>
                          <a> SHOP ALL</a>
                      </div>
                      <div className='scp-all-wrapper'>
                      {vid.products.map((prod, index) => (
                          <div className='scp-wrapper' onClick={()=>{setProduct(prod); showPopup()}}>
                              <div className='scp-image-div' style={{ backgroundImage: `url(${prod.imageUrl})`}}>
                              </div>
                              <div className='scp-desc'>
                                  <div className='scp-brand-name'><span>{(prod.title).toUpperCase()}</span></div>
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

export default Page2;
