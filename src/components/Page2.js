import React, { useState, useRef, useEffect } from 'react';
import '../css/Page2.css';
import Page3 from './Page3';
import ProdBrandHeader from './ProdBrandHeader';
import ProductVideoPlayer from './ProductVideoPlayer';
import Catalog from './Catalog';
import bag from '../images/BAG.png';
import star from '../images/star.png';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './Footer';


const Page2 = () => {
 // const [videos, setVideos] = ["soap", "kurta", "salwar", "top","any","many"];
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState([]);
  const [product, setProduct] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCatOpen, setCatOpen] = useState(false);
  const [upcomingData, setUpcomingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const brandID = useSelector(state => state.brandID);

  const popupRef = useRef(null);
  const catRef = useRef(null);
  const dispatch = useDispatch();

  const sortFlag = useSelector(state => state.sortFlag);
  const filterFlag = useSelector(state => state.filterFlag);
  const sortOn = useSelector(state => state.sortOn);
  const selectedCategory = useSelector(state => state.selectedCategory);


  const fetchInitialData = async () => {
    try {
      setPageNumber(1);
      setVideos([]);
      console.log("pagenumer", pageNumber, "if selectedCategory", selectedCategory);
      console.log("brandID", brandID);
      const response = await fetch('https://cliptocart.co.in/content?brandId='+brandID+'&type=V&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&page=1');
      const json = await response.json();
      setVideos(json);
      setUpcomingData(json);
      setIsLoading(false);
      console.log("setIsLoading(false);");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  useEffect(() => {
    fetchInitialData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortOn, filterFlag, sortFlag, selectedCategory]);
 
  
  useEffect(() => {
/*
    const fetchData = async () => {
      try {
        if(pageNumber>1){
          console.log("pageNumber", pageNumber);
          const response = await fetch('https://cliptocart.co.in/content?brandId=15&type=V&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&page='+pageNumber);
          const json = await response.json();
          console.log("results Page videos", json);
          setVideos(prevData => [...prevData, ...json]);
          setUpcomingData(json);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
 */
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
    setPopupOpen(true);   
  };

  const toggleCatalog = (vid) => {
    console.log('Div toggleCatalogclicked!', vid);
    setVideo(vid);
    setCatOpen(!isCatOpen);   
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleVideoReady = () => {
    console.log("handleVideoReady");
    setIsLoading(false);
  };
 

  useEffect(() => {
    console.log("prevPageNumber", pageNumber);
    
     const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
    };
    console.log("current", pageNumber);
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, 
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const target = document.querySelector('.loadmore-div');
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
     
   const handleClickOutside = (event) => {
     if (catRef.current && !catRef.current.contains(event.target)) {
        setCatOpen(false);
     }
   };
   document.addEventListener('mousedown', handleClickOutside);

   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);

 const getMoreData = async () => {
  
    try {
      if(pageNumber>1){
        console.log("pageNumber", pageNumber);
        const response = await fetch('https://cliptocart.co.in/content?brandId='+brandID+'&type=V&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&page='+pageNumber);
        const json = await response.json();
        console.log("results Page videos", json);
        setVideos(prevData => [...prevData, ...json]);
        setUpcomingData(json);
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
 }
  

  return (
    <div>
       <div className="video-comp">

       {isLoading ? (
        <div>Loading...</div>
      ) : (         
            <div>
            {videos.map((vid, index) => (
              <div className='prod-vid-wrap'>
                <ProdBrandHeader creator={vid.creator}/>
                <div className="video-div">
                    <ProductVideoPlayer videoUrl={vid.link} fullscreen={false} onReady={handleVideoReady} prodImg={vid.products[0].imageUrl}/>
                </div>
                <div className='scrolling-product-wrapper'>
                      <div className='shop-all' onClick={()=> toggleCatalog(vid)}>
                          <a className='shop-all-btn' onClick={()=> console.log("videor url", vid.link)}>
                              <img src={bag} height={25} width={25} />
                          </a>
                          <a> View Products</a>
                      </div>
                      <div className='scp-all-wrapper'>
                      {vid.products.map((prod, index) => (
                          <div className='scp-wrapper' onClick={()=>{setProduct(prod); showPopup()}}>
                              <img className='scp-image-div' src={prod.imageUrl} height={30}  />
                            { /* <div className='scp-image-div' style={{ backgroundImage: `url(${prod.imageUrl})`}}>
                              </div>*/}
                              <div className='scp-desc'>
                                  <div className='scp-brand-name'><span>{(prod.title).toUpperCase()}</span></div>
                                  <div className='scp-price'><span className='actual-price' >{prod.initialPrice != null ? (
                                          <>&#x20B9;{prod.initialPrice}</>
                                        ) : (
                                          ''
                                        )}</span>
                                      <span className='selling-price' > &#x20B9;{prod.finalPrice}</span>
                                      <span className='scp-discount'>{prod.discountPercentage}</span>
                                      <div className='rating-div'> 
                                        <span className='rating'>4</span> 
                                        <img src={star} height={12} width={12} />
                                      </div>
                                  </div> 
                              </div> 
                          </div>
                      ))}
                          
                    </div>
                </div>
              </div>
              ))}
            </div>
            )}
          </div>
          { 
          videos.length>0?
            (
              upcomingData.length>0 ?
                  <div className='loadmore-div'>
                      <a onClick={getMoreData}>Load More...</a>
                  </div>:<div className='loadmore-div'></div>
              ):
                    <div className='loadmore-div'>                        
                    </div>
          }
          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content" ref={popupRef}>
              <div className='close-popup-btn'><a className='' onClick={closePopup}>x</a></div>
                <Page3 product={product} onClose={closePopup}/>
              </div>
            </div>
          )}

          {isCatOpen && (
            <div className="popup">
              <div className="cat-popup-content" ref={catRef}>
                <Catalog video={video} onClose={toggleCatalog}/>
              </div>
            </div>
          )}
    </div>
  );
}

export default Page2;