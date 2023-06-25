import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import { setSortedProds } from '../store/actions';
import '../css/Page1.css';

const Page1 = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const sortedProducts = useSelector(state => state.sortedProducts);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4&page='+pageNumber);
        const json = await response.json();
        console.log("results Page 1", json);
        setData(prevData => [...prevData, ...json]);
        dispatch(setSortedProds(json));
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [pageNumber]);
  

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };
   

  return (
    <div className="all-prods-wrapper">
       <div className="all-prods">
          {sortedProducts.map((prod, index) => (
              <Product product ={prod}/>
            ))}
       </div>
       <div className='loadmore-div'>
            <a onClick={loadMore}>Load More...</a>
        </div>
     
       
    </div>
  );
}

export default Page1;
