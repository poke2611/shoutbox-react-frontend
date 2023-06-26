import React, { useState, useEffect } from 'react';
import '../css/FilterPopup.css';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { setFilteredProds, setFilterCriteria } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';


const FilterPopup = ({ handlePopup }) => {

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
 // const [filteredData, setFilteredData]= useState([]);
  const isCategorySelected = (categoryId) => selectedCategories.includes(categoryId);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/category?level=L3');
        const json = await response.json();
        console.log("results filter", json.categories);
        setCategories(json.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectAll = () => {
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterProducts = () => {
    console.log("filterON", selectedCategories);
    dispatch(setFilterCriteria(selectedCategories[0]));
    fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?categoryId='+selectedCategories[0]+'&brandId=4')
      .then(response => response.json())
      .then(data => {
        console.log("filtered data", data);
        dispatch(setFilteredProds(data));
      })
      .catch(error => {
        // Handle any errors that occurred during the API request
           console.error(error);
      });
      handlePopup();
    }

    return (
      <div className="filter-popup">
        <div className="filter-popup-content">
          <div className="filter-header">
            <span>Filter By</span>
            <a className='pink-font'>CLEAR ALL</a>
          </div>
          <div className='filter-section-wrapper'>
            <div className="filter-section-categories">
                <ul>
                    <li className="active">Categories</li>
                    <li>Price Range</li>
                </ul>
            </div>
            <div className="filter-section">
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
                ))}

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