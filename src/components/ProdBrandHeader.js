import React, { useState, useEffect } from 'react';
import '../css/ProdBrand.css';

const ProdBrandHeader = (props) => {

    const [data, setData] = useState([]);
  
    useEffect(() => {
                    
                    console.log("prod comp", props);
        const fetchData = async () => {
          try {
            const response = await fetch('https://cliptocart.co.in/brand?id=4');
            const json = await response.json();
            console.log("results", json[0]);
            setData(json[0]);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <div className="bheader-wrapper">
            <div className='prod-brand-info'>
                <a className='prod-brand-logo'>
                    <img  src={props.product.displayPictureUrl} className='prod-brand-image'/>
                </a>
                <div className='prod-brand-title'>
                    <div className='pbt'>
                        <span className='prod-brand-name'>{props.product.contentOwner}</span>
                       {/* <a className='grey-dot'></a>
                        <span className='follow-span'>Follow</span>
                    </div>
                    <div className='uploaded-time'>
                        <span> 12 hours ago </span> */
                       }
                    </div>
                </div>
            </div>

    </div>
  );
}

export default ProdBrandHeader;