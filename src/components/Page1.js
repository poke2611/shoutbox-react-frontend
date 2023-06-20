import React, { useState, useEffect, useCallback } from 'react';
import Product from './Product';
import '../css/Page1.css';

const Page1 = () => {
  const products = ["soap", "kurta", "salwar", "top"];
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4&page='+pageNumber);
        const json = await response.json();
        console.log("results Page 1", json);
        setData(prevData => [...prevData, ...json]);
        
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
          {data.map((prod, index) => (
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
