import React, { useState, useEffect } from 'react';
import Product from './Product';

const Page1 = () => {
  const products = ["soap", "kurta", "salwar", "top"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4');
        const json = await response.json();
        console.log("results Page 1", json);
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="all-prods-wrapper">
       <div className="all-prods">
          {data.map((prod, index) => (
              <Product product ={prod}/>
            ))}
       </div>
       
    </div>
  );
}

export default Page1;
