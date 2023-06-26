const initialState = {
  isPopupOpen: false,
  sortedProducts: [],
  filteredProducts: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_POPUP':
      return {
        ...state,
        isPopupOpen: action.payload,
      };
    
      case 'SORT_PRODUCTS':
        return {
          ...state,
          sortedProducts: [...state.sortedProducts, ...action.payload],
        };
        
        case 'FILTER_PRODUCTS':
          return {
            ...state,
            filteredProducts: [...state.filteredProducts, ...action.payload],
          };
      
      default:
        return state;

  }
};

export default rootReducer;
