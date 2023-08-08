import React, { useState, useEffect } from 'react';
import '../css/FilterPopup.css';
import { setFilteredProds, setFilterCriteria, setFilterFlag } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';


const FilterPopup = ({ handlePopup }) => {

  const dispatch = useDispatch();
  const categorySelected = useSelector(state => state.selectedCategory);
  const brandID = useSelector(state => state.brandID);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categorySelected);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("Categories");


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

    fetchData();
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
    setSelectedCategory(categoryId);
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
    setSelectedCategory("");
   
  };


  const filterProducts = () => {
    console.log("filterON", selectedCategory);
    dispatch(setFilterCriteria(selectedCategory));
    if(selectedCategory!=''){
      dispatch(setFilterFlag(true));
    }
   
   
      handlePopup();
    }

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
                 
              </div>
            )}
               
           {activeTab === "Creator" && (
              <div className="creator-content">
                {/* Render price range content */}
              </div>
           )}

          {activeTab === "Content Type" && (
              <div className="content-type-div">
                {/* Render price range content */}
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