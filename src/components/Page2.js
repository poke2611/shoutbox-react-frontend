import React, { useState, useEffect } from 'react';
import '../css/Page2.css';
import ProdBrandHeader from './ProdBrandHeader';
import ProductVideoPlayer from './ProductVideoPlayer';
import bag from '../images/BAG.png';


const Page2 = () => {
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
    <div className="video-comp">
       <ProdBrandHeader />
       <div className="video-div">
          <ProductVideoPlayer videoUrl="https://shoutbox-bucket.s3.ap-south-1.amazonaws.com/SaveInsta.App+-+3117733904101277365_47663837449.mp4" />
       </div>
       <div className='scrolling-product-wrapper'>
            <div className='shop-all'>
                <a className='shop-all-btn'>
                    <img src={bag} height={30} width={30} />
                </a>
                <a> SHOP ALL</a>
            </div>
            <div className='scp-all-wrapper'>
             {data.map((prod, index) => (
                <div className='scp-wrapper'>
                    <div className='scp-image-div' style={{ backgroundImage: `url(${prod.products[0].imageUrl})`}}>
                    </div>
                    <div className='scp-desc'>
                        <div className='scp-brand-name'><span>{prod.products[0].brandName}</span></div>
                        <div className='scp-price'><span className='actual-price' >{prod.products[0].initialPrice != null ? (
                            <>&#x20B9;{prod.products[0].initialPrice}</>
                          ) : (
                            ''
                          )}</span>
                        <span className='selling-price' > &#x20B9;{prod.products[0].finalPrice}</span></div>
                        <div>
                            <span className='scp-discount'>{prod.products[0].discountPercentage}</span>
                            <span className='rating'>4</span>
                        </div>
                    </div> 
                </div>
            ))}
                
           </div>
       </div>
    </div>
  );
}

export default Page2;
