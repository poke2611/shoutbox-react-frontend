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
  const sortedProducts = useSelector(state => state.sortedProducts);
  const filteredProducts = useSelector(state => state.filteredProducts);
  const sortFlag = useSelector(state => state.sortFlag);
  const filterFlag = useSelector(state => state.filterFlag);
  const sortOn = useSelector(state => state.sortOn);
  const selectedCategory = useSelector(state => state.selectedCategory);
  

  
  useEffect(() => {
    setPageNumber(1);
    setData([]);
    let displayedProducts = data;
    

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
    setData(displayedProducts);
    console.log("reset page", data, pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });

  },[sortOn, filterFlag, sortFlag, filteredProducts, sortedProducts])

 
  useEffect(() => {
    console.log("flags Page 1", filterFlag, sortFlag);

  
    const fetchData = async () => {
      try {
        console.log("filterFlag", filterFlag);
        const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?categoryId='+selectedCategory+'&brandId=4&'+sortOn+'='+sortFlag+'&page='+pageNumber);
          const json = await response.json();
          //dispatch(setFilteredProds(json));
          setData(prevData => [...prevData, ...json]);
          setUpcomingData(json);
     
      /*  if(filterFlag && !sortFlag){
          console.log("filterFlag", filterFlag);
          const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?categoryId='+selectedCategories+'&brandId=4&page='+pageNumber);
          const json = await response.json();
          //dispatch(setFilteredProds(json));
          setData(prevData => [...prevData, ...json]);
        }
        else if(sortFlag && !filterFlag){
          console.log("sortFlag", sortFlag);
          const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4&'+sortOn+'=true&page='+pageNumber);
          const json = await response.json();
         // dispatch(setSortedProds(json));
         setData(prevData => [...prevData, ...json]);
        }
        else if(sortFlag && filterFlag){
          
          console.log("sortFlag", sortFlag);
          const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?categoryId='+selectedCategory+'&brandId=4&'+sortOn+'='+sortFlag+'&page='+pageNumber);
          const json = await response.json();
         // dispatch(setSortedProds(json));
         setData(prevData => [...prevData, ...json]);
        }
      else{
            const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?categoryId='+selectedCategory+'&brandId=4&'+sortOn+'='+sortFlag+'&page='+pageNumber);
            const json = await response.json();
            console.log("results Page 1", json);
            setData(prevData => [...prevData, ...json]);
        } 
        */
       // dispatch(setSortedProds(json));
        
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
       { data.length>0?
          (
            data.length>19 && (
              <div className='loadmore-div'>
                  <a >Load More...</a>
              </div>
            )
          ):(
            <div className='loadmore-div'>
              <a >No Content Found</a>
          </div>
          )
          
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
