import React, { useState, useRef, useEffect } from 'react';
import '../css/Footer.css';
import { setSortedProds, setSortCriteria, setSortFlag, setFilteredProds } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';


const SortPopup = ({handlePopup}) => {

  //const[sortOn, setSortOn] = useState("");
  const [activeItem, setActiveItem] = useState();
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const sortOn = useSelector(state => state.sortOn);

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
    setActiveItem(sortOn);
    dispatch(setSortCriteria(sortOn));
    dispatch(setSortFlag(true));
   
        handlePopup();
      }

     
 
 
  return (
    <div className="sort-popup">
    <div className="sort-popup-content-wrapper" ref={popupRef}>
      <div className='sort-popup-header'>
        <span>Sort By</span>
      </div>
      <ul className="sort-popup-content">
          <li className={sortOn === "lowToHigh" ? "li-active" : ""} onClick={()=>sortProducts("lowToHigh")}>Price- low to high</li>
          <li className={sortOn === "highToLow" ? "li-active" : ""} onClick={()=>sortProducts("highToLow")}>Price- high to low</li>
      </ul>
    </div>
  </div>
  );
}

export default SortPopup;
