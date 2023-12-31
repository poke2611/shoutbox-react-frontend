import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Page2.css';
import '../css/Page4.css';
import Page3 from './Page3';
import ProdBrandHeader from './ProdBrandHeader';
import bag from '../images/BAG.png';
import Carousel from './Carousel';
import Catalog from './Catalog';
import loader from '../images/down-arrow.png';

const Page4 = () => {

  const [data, setData] = useState([]);
  const [product, setProduct] =useState({});
  const [images, setImages] =useState({});
  const catRef = useRef(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [upcomingData, setUpcomingData] = useState([]);
  const [isCatOpen, setCatOpen] = useState(false);
  
  const [catProduct, setCatProduct] = useState(false);
  const popupRef = useRef(null);
  const sortFlag = useSelector(state => state.sortFlag);
  const filterFlag = useSelector(state => state.filterFlag);
  const brandID = useSelector(state => state.brandID);
  const sortOn = useSelector(state => state.sortOn);
  const selectedCategory = useSelector(state => state.selectedCategory);
  const selectedPriceRange = useSelector(state => state.selectedPriceRange);
  const selectedCreator = useSelector(state => state.selectedCreator);
  const selectedContentType = useSelector(state => state.selectedContentType);

  const fetchInitialData = async () => {
    try {
    
      setData([]);
      console.log("pagenumer", pageNumber, "if selectedCategory", selectedCategory, "filterCriteria");
      console.log("sortOn", sortOn, "sortCriteria");
      const response = await fetch('https://cliptocart.co.in/content?brandId='+brandID+'&type=L&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&lessThanPrice='+selectedPriceRange+'&creatorId='+selectedCreator+'&contentCategory='+selectedContentType+'&page=1');
      const json = await response.json();
      json.forEach(item => {
        item.imgArray = []; // Initialize an array for links within the item
        Object.keys(item).forEach(key => {
          if (key.startsWith('link') && item[key] !== null) {
            item.imgArray.push(item[key]);
          }
        });
      });
        setData(json);
        setUpcomingData(json);
        setPageNumber(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInitialData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortOn, filterFlag, sortFlag, selectedCategory]);
 
/*  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(pageNumber>1){
          const response = await fetch('https://cliptocart.co.in/content?brandId='+brandID+'&type=V&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&lessThanPrice='+selectedPriceRange+'&creatorId='+selectedCreator+'&contentCategory='+selectedContentType+'&page='+pageNumber);
          const json = await response.json();
          console.log("results Page 4", json);
          setData(prevData => [...prevData, ...json]);
          setUpcomingData(json);
        
          console.log("product page 4",json[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  */

  const toggleCatalog = (product) => {
    console.log('Div toggleCatalogclicked!', product);
    setCatProduct(product);
    setCatOpen(!isCatOpen);   
  };

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
  
    setPopupOpen(true);   
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const getMoreData = async () => {
  
    try {
      if(pageNumber>1){
        console.log("pageNumber", pageNumber);
        const response = await fetch('https://cliptocart.co.in/content?brandId='+brandID+'&type=L&categoryId='+selectedCategory+'&'+sortOn+'='+sortFlag+'&lessThanPrice='+selectedPriceRange+'&creatorId='+selectedCreator+'&contentCategory='+selectedContentType+'&page='+pageNumber);
        const json = await response.json();
        console.log("results Page videos", json);
       // setPageNumber(prevPageNumber => prevPageNumber + 1);
        json.forEach(item => {
          item.imgArray = []; // Initialize an array for links within the item
          Object.keys(item).forEach(key => {
            if (key.startsWith('link') && item[key] !== null) {
              item.imgArray.push(item[key]);
            }
          });
        });
        setData(prevData => [...prevData, ...json]);
        setUpcomingData(json);
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
 }
 


  return (
    <div className="page4-comp">
       <div >
          
            {data.map((product, index) => (
              <div className='prod-vid-wrap'>
                <ProdBrandHeader  creator={product.creator}/>
                <div className="page4-img-container">
                 
                    <Carousel className='page4-prod-img' images={product.imgArray} />
                   
                </div>
                <div className='scrolling-product-wrapper'>
                  <div className='shop-all' onClick={()=> toggleCatalog(product)}>
                          <a className='shop-all-btn'>
                              <img src={bag} height={25} width={25} />
                          </a>
                          <a> View Products</a>
                      </div>
                      <div className='scp-all-wrapper'>
                      {product.products.map((prod, index) => (
                          <div className='scp-wrapper' onClick={()=>{setProduct(prod); showPopup()}}>
                               <img className='scp-image-div' src={prod.imageUrl} height={30}  />
                              
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
      
            { 
              data.length>0?
                (
                  upcomingData.length>0 ?
                      <div className='loadmore-div'>
                          <a onClick={getMoreData}><img src={loader} height={30} width={30}/></a>
                      </div>:<div className='loadmore-div'></div>
                  ):
                        <div className='loadmore-div'>                        
                        </div>
          }
          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content" ref={popupRef}>
              <div className='close-popup-btn'><a className='' onClick={closePopup}>x</a></div>
                 <Page3 product={product}  onClose={closePopup}/>
              </div>
            </div>
          )}

        {isCatOpen && (
            <div className="popup">
              <div className="cat-popup-content" ref={catRef}>
                <Catalog video={catProduct} onClose={toggleCatalog}/>
              </div>
            </div>
          )}
          
    </div>
  );
}

export default Page4;