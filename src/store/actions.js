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

  export const setSortCriteria = (sortCriteria) => {
    return {
      type: 'SORT_ON',
      payload: sortCriteria,
    };
  };

  export const setFilterCriteria = (filterCriteria) => {
    return {
      type: 'FILTER_ON',
      payload: filterCriteria,
    };
  };

  export const setFilterFlag = (flag) => {
    return {
      type: 'SET_FILTER_FLAG',
      payload: flag,
    };
  };

  export const setSortFlag = (flag) => {
    return {
      type: 'SET_SORT_FLAG',
      payload: flag,
    };
  };

  export const setMuteFlag = (flag) => {
    return {
      type: 'SET_MUTE_FLAG',
      payload: flag,
    };
  };

  export const setBrandId = (id) => {
    return {
      type: 'SET_BRAND_ID',
      payload: id,
    };
  };

  export const setCart = (product) => {
    return {
      type: 'SET_CART',
      payload: product,
    };
  };

  export const handleRemoveItem = (id) => {
    return {
      type: 'REMOVE_ITEM',
      payload: id,
    };
  };

  export const handleCheckout = () => {
    return {
      type: 'CHECKOUT',
    };
  };

  export const setCartIdentifier = (id) => {
    return {
      type: 'SET_CART_IDENTIFIER',
    };
  };

  export const setPriceRange = (price) => {
    return {
      type: 'SET_PRICE_RANGE',
    };
  };

  export const setCreator = (creator) => {
    return {
      type: 'SET_CREATOR',
    };
  };

  export const setContentType = (content) => {
    return {
      type: 'SET_CONTENT_TYPE',
    };
  };