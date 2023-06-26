import React, { useState, useRef, useEffect } from 'react';
import '../css/Footer.css';
import { setSortedProds, setSortCriteria } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';


const SortPopup = ({handlePopup}) => {

  //const[sortOn, setSortOn] = useState("");
  const[sortedData, setsortedData] = useState([]);
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handlePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [])

  const sortProducts = (sortOn) => {
    console.log("sortOn", sortOn);
    dispatch(setSortCriteria(sortOn));
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
    <div className="sort-popup">
    <div className="sort-popup-content-wrapper" ref={popupRef}>
      <div className='sort-popup-header'>
        <span>Sort By</span>
      </div>
      <ul className="sort-popup-content">
          <li onClick={()=>sortProducts("lowToHigh")}>Price- low to high</li>
          <li onClick={()=>sortProducts("highToLow")}>Price- high to low</li>
      </ul>
    </div>
  </div>
  );
}

export default SortPopup;
