import React, { useState, useEffect } from 'react';
import '../css/FixedHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import bag from '../images/shopping-bag.png';
import heart from '../images/heart.png';
import search from '../images/loupe.png';
import persona from '../images/user.png';


const FixedHeader = () => {

 const [data, setData] = useState([]);
 const [activePage, setActivePage] = useState('page1');
 const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("header comp", activePage);
    const fetchData = async () => {
      try {
        const response = await fetch('https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/brand?id=4');
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
    <div className="fixed-header-wrapper">
        <div className='fixed-header-sub-wrap'>
                 <a className='fh-brand-logo' href="https://kamikubi.com/">
                    <img  src={data.logoUrl} className='fh-brand-image'/>
                </a>
                <div className='icons-div'>
                    <img src={search} width={20} height={20}/>
                    <img src={heart} width={20} height={20}/>
                    <img src={persona} width={20} height={20}/>
                    <img src={bag} width={20} height={20}/>
                </div>
            </div>
            {/*<div className='fh-brand-desc'>
                <a> {data.brandName} </a>
                <span onClick={()=>console.log("description")}>{data.brandDescription}</span>
            </div> */}
     
    </div>
  );
}

export default FixedHeader;
