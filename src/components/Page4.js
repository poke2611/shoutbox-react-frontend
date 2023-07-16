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
  const [upcomingData, setUpcomingData] = useState([]);
  const popupRef = useRef(null);
  const sortFlag = useSelector(state => state.sortFlag);
  const filterFlag = useSelector(state => state.filterFlag);
  const sortOn = useSelector(state => state.sortOn);
  const selectedCategory = useSelector(state => state.selectedCategory);


  const fetchInitialData = async () => {
    try {
      setPageNumber(1);
      setData([]);
      console.log("pagenumer", pageNumber, "if selectedCategory", selectedCategory, "filterCriteria");
      console.log("sortOn", sortOn, "sortCriteria");
      const response = await fetch('https://cliptocart.co.in/content?brandId=4&type=L&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&page=1');
      const json = await response.json();
      setData(json);
      setUpcomingData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInitialData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortOn, filterFlag, sortFlag, selectedCategory]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(pageNumber>1){
        const response = await fetch('https://cliptocart.co.in/content?brandId=4&type=L&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&page='+pageNumber);
        const json = await response.json();
        console.log("results Page 4", json);
        setData(prevData => [...prevData, ...json]);
       // setProduct(json[0]);
       setUpcomingData(json);
      
        console.log("product page 4",json[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


  }, []);

  useEffect(() => {

    const handleIntersection = (entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         setPageNumber(prevPageNumber => prevPageNumber + 1);
       }
     });
   };

   const options = {
     root: null,
     rootMargin: '0px',
     threshold: 0.5, 
   };

   const observer = new IntersectionObserver(handleIntersection, options);
   const target = document.querySelector('.loadmore-div');
   observer.observe(target);

   const handleClickOutside = (event) => {
     if (popupRef.current && !popupRef.current.contains(event.target)) {
       setPopupOpen(false);
     }
   };

   document.addEventListener('mousedown', handleClickOutside);


   return () => {
     observer.unobserve(target);
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
    <div className="page4-comp">
       <div >
          
            {data.map((product, index) => (
              <div className='prod-vid-wrap'>
                <ProdBrandHeader product={product}/>
                <div className="page4-img-container">
                    <img src={product.link} className='page4-prod-img'/>
                </div>
                <div className='scrolling-product-wrapper'>
                      <div className='shop-all'>
                          <a className='shop-all-btn'>
                              <img src={bag} height={25} width={25} />
                          </a>
                          <a> SHOP ALL</a>
                      </div>
                      <div className='scp-all-wrapper'>
                      {product.products.map((prod, index) => (
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
      
          { data.length>19?
                (
                  upcomingData.length>0 ?
                      <div className='loadmore-div'>
                          <a>Load More...</a>
                      </div>:<div className='loadmore-div'></div>
                      ):
                      <div className='loadmore-div'>
                          
                      </div>
                }
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