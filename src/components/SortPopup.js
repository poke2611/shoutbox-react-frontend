import React, { useState, useEffect } from 'react';
import '../css/Footer.css';
import { setSortedProds } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';


const SortPopup = ({handlePopup}) => {

  //const[sortOn, setSortOn] = useState("");
  const[sortedData, setsortedData] = useState([]);
  const dispatch = useDispatch();

  const sortProducts = (sortOn) => {
    console.log("sortOn", sortOn);
    fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4&'+sortOn+'=true')
      .then(response => response.json())
      .then(data => {
        console.log("data", data)
       setsortedData(data);
       dispatch(setSortedProds(data));
      })
      .catch(error => {
        // Handle any errors that occurred during the API request
        console.error(error);
      });
      handlePopup();
  }
 
  return (
    <div className="sort-popup" id="unblurred">
    <div className="sort-popup-content-wrapper" >
      <div className='sort-popup-header'>
        <span>Sort By</span>
        <a onClick={handlePopup}>x</a>
      </div>
      <ul className="sort-popup-content">
          <li onClick={()=>sortProducts("lowToHigh")}>Popularity</li>
          <li onClick={()=>sortProducts("lowToHigh")}>Price- low to high</li>
          <li onClick={()=>sortProducts("highToLow")}>Price- high to low</li>
      </ul>
    </div>
  </div>
  );
}

export default SortPopup;
