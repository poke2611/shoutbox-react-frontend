import React, { useState, useEffect } from 'react';
import '../css/Page3.css';
import ProdBrandHeader from './ProdBrandHeader';
import ProductVideoPlayer from './ProductVideoPlayer';
import bag from '../images/BAG.png';


const Page3 = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4');
        const json = await response.json();
        console.log("results Page 3", json[0].products[0]);
        setData(json[0].products[0]);
        console.log("data",data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="page3-comp"> 
            <div className='prod-other-img'>
                <div>
                      <img src={data.imageUrl} className='page3-prod-img'/>
                </div>
                <div>
                    <img src={data.imageUrl} className='page3-prod-img'/>
                </div>
            </div>
            <div className='page3-prod-info'>
                <div className='page3-brand-name'>{data.brandName}</div>
                <div className='page3-prod-detail'>{data.description}</div>
                <div className='page3-rating'>4</div>
                <div className='partition-line'></div>
                <div className='page3-price-info'><span className='page3-actual-price' >{data.initialPrice != null ? (
                        <>&#x20B9;{data.initialPrice}</>
                      ) : (
                        ''
                      )}</span>
                    <span className='page3-selling-price' > &#x20B9;{data.finalPrice}</span>
                    <span className='page3-dis-per'>{" "}{data.discountPercentage}</span>
                </div>
                <div className='taxes'>Inclusive of all taxes</div>
                <div className='product-info-wrapper'>
                  <div>
                    <span className='page3-heading'>Product Information</span>
                    <div className='product-info-sub-wrapper'>
                      <div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                      </div>
                      <div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='page3-product-desc'>
                    <span className='page3-heading'>Product Description</span>
                    <span className='page3-desc-span'>Made with sturdy tarpaulin, this square shaped stroller has a nostalgic appeal, that makes it a flawless fashion forward allure.</span>
                  </div>
                  <div className='page3-material'>
                    <span className='page3-heading'>Material & Care</span>
                    <span className='page3-desc-span'>Machine wash in cold water</span>
                  </div>
                </div>
                
    </div>
        
    </div>
  );
}

export default Page3;
