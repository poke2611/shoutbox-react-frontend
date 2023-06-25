export const togglePopup = (isOpen) => {
    return {
      type: 'TOGGLE_POPUP',
      payload: isOpen,
    };
  };

  export const setSortedProds = (sortedProds) => {
    return {
      type: 'SORT_PRODUCTS',
      payload: sortedProds,
    };
  };
  

  export const setFilteredProds = (filteredProds) => {
    return {
      type: 'FILTER_PRODUCTS',
      payload: filteredProds,
    };
  };