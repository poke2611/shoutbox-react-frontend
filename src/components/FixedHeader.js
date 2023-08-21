import React, { useState, useEffect } from 'react';
import '../css/FixedHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import bag from '../images/foot-Bag.png';
import heart from '../images/heart.png';
import search from '../images/search-interface-symbol.png';
import persona from '../images/user.png';
import Cookies from 'js-cookie';


const FixedHeader = () => {

  useSelector(state => state.cart)
 const [data, setData] = useState([]);
 const [activePage, setActivePage] = useState('page1');
 const dispatch = useDispatch();
 let cartCookie = Cookies.get('cart');
 if(cartCookie){
  cartCookie = JSON.parse(cartCookie);
 }
 console.log("cartCookie", cartCookie);
 const itemParams = (cartCookie!=undefined && cartCookie.length>0)?cartCookie.map((item) => `items[][id]=${item.variantId}&items[][quantity]=${item.quantity}&items[][properties][POWERED_BY]=C2C`).join('&'):'';
  const apiUrl = cartCookie!=undefined && cartCookie.length > 0 ? 'https://theaayna.com/cart/add?'+itemParams : 'https://theaayna.com/cart';
    
  useEffect(() => {
    console.log("header comp", activePage);
    Cookies.remove('cart');
    const fetchData = async () => {
      try {
        const response = await fetch('https://cliptocart.co.in/brand?id=15');
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
                 <a className='fh-brand-logo' href="https://theaayna.com/">
                    <img  src={data.logoUrl} className='fh-brand-image'/>
                </a>
                <div className='icons-div'>
                    <img src={search} width={22} height={22}/>
                    <img src={heart} width={22} height={22}/>
                    <img src={persona} width={22} height={22}/>
                    <a className='cart-count-header' href={apiUrl} data-count={cartCookie ? cartCookie.length : 0}><img src={bag} height={18} width={18} /></a>
                   
                </div>
            </div>
            {/*<div className='fh-brand-desc'>
                <a> {data.brandName} </a>
                 <a href= {apiUrl}><img src={bag} width={20} height={20}/></a>
                <span onClick={()=>console.log("description")}>{data.brandDescription}</span>
            </div> */}
     
    </div>
  );
}

export default FixedHeader;
