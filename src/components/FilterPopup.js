import React, { useState, useEffect } from 'react';
import '../css/FilterPopup.css';
import { setPriceRange, setCreator, setContentType, setFilterCriteria, setFilterFlag } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import instagram from '../images/instagram.png';

function formatFollowerCount(count) {
  console.log("formatFollowerCount", formatFollowerCount);
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace('.0', '') + "m";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + "k";
  }
  return count.toString();
}

const FilterPopup = ({ handlePopup }) => {

  const dispatch = useDispatch();
  const categorySelected = useSelector(state => state.selectedCategory);
  const slctdPriceRange = useSelector(state => state.selectedPriceRange);
  const slctdCreator = useSelector(state => state.selectedCreator);
  const slctdContentType = useSelector(state => state.selectedContentType);
  console.log("prop variables", categorySelected,slctdPriceRange,slctdCreator, slctdContentType);
  const brandID = useSelector(state => state.brandID);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categorySelected);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("Categories");
  const priceRangeOptions = ["Under 999", "Under 1499", "Under 1999"];
  const [creatorOptions, setCreatorOptions] = useState([]);
  const contentTypeOptions = {'Creator Looks':'PRODUCT_REEL', 'In Depth Reviews':'PRODUCT_REVIEW', 'How to Style':'HOW_TO_STYLE'};
  const [selectedPriceRange, setSelectedPriceRange] = useState(slctdPriceRange);
  const [selectedCreator, setSelectedCreator] = useState(slctdCreator);
  const [selectedContentType, setSelectedContentType] = useState(slctdContentType);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cliptocart.co.in/category?brandId='+brandID);
        const json = await response.json();
        console.log("results filter", json.categories);
        setCategories(json.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCreatorData = async () => {
      try {
        const response = await fetch('https://cliptocart.co.in/creator?brandId='+brandID);
        const json = await response.json();
        console.log("results filter", json.categories);
        setCreatorOptions(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchCreatorData();
  }, []);

  

/* const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCategories([]);
    } else {
      const allCategoryIds = categories.map((category) => category.id);
      setSelectedCategories(allCategoryIds);
    }
    setSelectAll(!selectAll);
  };

const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      console.log("cat", categoryId);
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
*/

  const handleCategorySelect = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearAll = () => {
    dispatch(setFilterFlag(false)); 
    dispatch(setFilterCriteria(""));
    dispatch(setPriceRange(""));
    dispatch(setCreator(""));
    dispatch(setContentType(""));
    setSelectedCategory("");
    setSelectedCreator("");
    setSelectedContentType("");
    setSelectedPriceRange("");
   
  };


  const filterProducts = () => {
    console.log("filterON", selectedCategory, "selectedPriceRange",selectedPriceRange, "selectedCreator",selectedCreator );
    dispatch(setFilterCriteria(selectedCategory));
    dispatch(setPriceRange(selectedPriceRange));
    dispatch(setCreator(selectedCreator));
    dispatch(setContentType(selectedContentType));
    if(selectedCategory!=''){
      dispatch(setFilterFlag(true));
    }
      handlePopup();
    }

    const handlePriceRangeSelect = (option) => {
     console.log("preceRnage",option.split(' ')[1] );
      if (selectedPriceRange === option) {
        setSelectedPriceRange("");
      } else {
        setSelectedPriceRange(option);
      }
    };
  
    const handleCreatorSelect = (option) => {
      if (selectedCreator === option) {
        setSelectedCreator("");
      } else {
        setSelectedCreator(option);
      }
    };
  
    const handleContentTypeSelect = (option) => {
     console.log("contentyoe", option);
      if (selectedContentType === option) {
        setSelectedContentType("");
      } else {
        setSelectedContentType(option);
      }
    };

    return (
      <div className="filter-popup">
        <div className="filter-popup-content">
          <div className="filter-header">
            <span>Filter By</span>
            <a className='pink-font'  onClick={handleClearAll}>CLEAR ALL</a>
          </div>
          <div className='filter-section-wrapper'>
            <div className="filter-section-categories">
            <ul>
                <li className={activeTab === "Categories" ? "active" : ""} onClick={() => setActiveTab("Categories")}>Categories</li>
                <li className={activeTab === "Price Range" ? "active" : ""} onClick={() => setActiveTab("Price Range")}>Price Range</li>
                <li className={activeTab === "Creator" ? "active" : ""} onClick={() => setActiveTab("Creator")}>Creator</li>
                <li className={activeTab === "Content Type" ? "active" : ""} onClick={() => setActiveTab("Content Type")}>Content Type</li>
            </ul>

            </div>
            <div className="filter-section">

            {activeTab === "Categories" && (
                 filteredCategories.map((cat) => (
                  <div key={cat.id} className={`category-item ${selectedCategory === cat.id ? 'selected' : ''}`} onClick={() => handleCategorySelect(cat.id)}>
                    {selectedCategory === cat.id ? <span className="tick selected">&#10003;</span> : <span className="tick" />}
                    {cat.categoryName}
                  </div>
                
                ))
              )}
             {activeTab === "Price Range" && (
              <div className="price-range-content">
                {priceRangeOptions.map(option => (
                  <div
                    key={option.split(' ')[1] }
                    className={`category-item ${selectedPriceRange === option.split(' ')[1]  ? 'selected' : ''}`}
                    onClick={() => handlePriceRangeSelect(option.split(' ')[1] )}
                  >
                    {selectedPriceRange === option.split(' ')[1]  ? <span className="tick selected">&#10003;</span> : <span className="tick" />}
                    {option}
                  </div>
                ))}
              </div>
            )}
               
            {activeTab === "Creator" && (
              <div className="creator-content">
                {creatorOptions.map(option => (
                  <div
                    key={option.id}
                    className={`creator category-item ${selectedCreator === option.id ? 'selected' : ''}`}
                    onClick={() => handleCreatorSelect(option.id)}
                  >
                    {selectedCreator === option.id ? <span className="tick selected">&#10003;</span> : <span className="tick" />}
                     <div className='creator-div'>
                        <img className='creator-logo-img' src={option.displayPictureUrl} width={50} height={50}/>
                        <div>
                            <span>{option.firstName}</span>
                            <span  className='handle-span'>@{option.instagramHandle}</span>
                            <span className='insta-span'><img src={instagram} width={12} height={12}/>{formatFollowerCount(option.instagramFollowers)}</span>
                        </div>
                        
                      </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Content Type" && (
                <div className="content-type-div">
                  {Object.keys(contentTypeOptions).map(option => (
                    <div
                      key={option}
                      className={`category-item ${selectedContentType === option ? 'selected' : ''}`}
                      onClick={() => handleContentTypeSelect(option)}
                    >
                      {selectedContentType === option ? <span className="tick selected">&#10003;</span> : <span className="tick" />}
                      {option}
                    </div>
                  ))}
                </div>
             )}

             {/*
             <div className="search-bar">
                  <input
                      className='filter-search'
                      type="text"
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={handleSearch}
                  />
                </div> 
             <div className="category-item select-all" onClick={handleSelectAll}>
                    <span className={selectAll ? 'tick selected' : 'tick'}>{selectAll?(<>&#10003;</>):''}</span>
                    Select All
                </div>

                {filteredCategories.map((cat) => (
                    <div key={cat.id}
                    className={`category-item ${isCategorySelected(cat.id) ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(cat.id)}>
                        <span className={isCategorySelected(cat.id) ? 'tick selected' : 'tick'}>&#10003;</span>
                        {cat.categoryName}
                    </div> 
                ))}*/}   

            </div>
            
          </div>
          <div className="filter-footer">
            <a onClick={handlePopup}>CLOSE</a>
            <span>|</span>
            <a className='pink-font' onClick={filterProducts}>APPLY</a>
          </div>
          
        </div>
      </div>
    );
  };
  
  export default FilterPopup;