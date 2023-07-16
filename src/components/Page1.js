import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import Page3 from './Page3';
import '../css/Page1.css';
import Footer from './Footer';

const Page1 = () => {
  const [data, setData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [product, setProduct] = useState({});
  

  const popupRef = useRef(null);
  const dispatch = useDispatch();
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
      const response = await fetch(`https://cliptocart.co.in/content?categoryId=${selectedCategory}&brandId=4&${sortOn}=${sortFlag}&page=1`);
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
    console.log("flags Page 1", filterFlag, sortFlag);
     
    const fetchData = async () => {
      try {
       
        if(pageNumber>1){
          console.log("pagenumer",pageNumber, "if selectedCategory", selectedCategory, "filterCriteria");
          console.log("sortOn", sortOn, "sortCriteria");
         const response = await fetch('https://cliptocart.co.in/content?categoryId='+selectedCategory+'&brandId=4&'+sortOn+'='+sortFlag+'&page='+pageNumber);
          const json = await response.json();
          //dispatch(setFilteredProds(json));
          setData(prevData => [...prevData, ...json]);
          setUpcomingData(json);

        }
     
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    
  }, [pageNumber]);

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

  return (
    <div className="all-prods-wrapper">
       <div className="all-prods">
          {data.map((prod, index) => (
            <div onClick={()=>{setProduct(prod.products[0]); showPopup()}}>
              <Product product ={prod} />
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

export default Page1;