import React, { useState, useEffect } from 'react';
import '../css/ProdBrand.css';
import instagram from '../images/instagram.png';


function formatFollowerCount(count) {
  
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1).replace('.0', '') + "m";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1).replace('.0', '') + "k";
    }
    return count.toString();
  }

const ProdBrandHeader = (props) => {
const formattedFollowerCount = formatFollowerCount(props.creator.instagramFollowers);
 const [data, setData] = useState([]);
  return (
    <div className="bheader-wrapper">
            <div className='prod-brand-info'>
                <a className='prod-brand-logo'>
                    <img  src={props.creator.displayPictureUrl} className='prod-brand-image'/>
                </a>
                <div className='prod-brand-title'>
                    <div className='pbt'>
                       
                        <span className='prod-brand-name'>{props.creator.firstName}</span>
                        <div className='uploaded-time'>
                           <span> @{props.creator.instagramHandle} </span>
                        </div>
                       
                    </div>
                       {/* <a className='grey-dot'></a>
                        <span className='follow-span'>Follow</span>
                    </div>
                    <div className='uploaded-time'>
                        <span> 12 hours ago </span> */
                       }
                    
                    <div className='followers-div'>
                          <img  src={instagram} width={14} height={14}/>
                          <span>{formattedFollowerCount}</span>
                    </div>
                   
                </div>
            </div>

    </div>
  );
}

export default ProdBrandHeader;