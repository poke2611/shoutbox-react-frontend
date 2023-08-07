import React, { useState, useEffect } from 'react';
import '../css/ProdBrand.css';

const ProdBrandHeader = (props) => {

 const [data, setData] = useState([]);
  return (
    <div className="bheader-wrapper">
            <div className='prod-brand-info'>
                <a className='prod-brand-logo'>
                    <img  src={props.creator.displayPictureUrl} className='prod-brand-image'/>
                </a>
                <div className='prod-brand-title'>
                    <div className='pbt'>
                        <span className='prod-brand-name'>{props.creator.instagramHandle}</span>
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