const initialState = {
  isPopupOpen: false,
  filterFlag: false,
  allProducts: [],
  sortedProducts: [],
  hightToLowSortedProducts: [],
  filteredProducts: [],
  sortFlag: false,
  sortOn: "",
  selectedCategories: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_POPUP':
      return {
        ...state,
        isPopupOpen: action.payload,
      };
    
      case 'SORT_PRODUCTS':
        console.log("SORT_PRODUCTS", state.sortFlag, state.sortedProducts, action.payload );
        return {
          ...state,
          sortFlag: true,
          filterFlag: false,
         // sortedProducts: [...state.sortedProducts, ...action.payload],
          sortedProducts: action.payload,
          allProducts: state.sortedProducts,
        };
        
        case 'FILTER_PRODUCTS':
          console.log("FILTER_PRODUCTS", state.filterFlag, state.filteredProducts, action.payload );
          return {
            ...state,
            filterFlag: true,
            sortFlag: false,
            filteredProducts: action.payload,
            allProducts: state.filteredProducts,
          };
        
        case 'SORT_ON':
          return {
            ...state,
            sortOn: action.payload,
          };

        case 'FILTER_ON':
          console.log("FILTER_ON",  action.payload );
          return {
            ...state,
            selectedCategories: action.payload,
          };
      
      default:
        return state;

  }
};

export default rootReducer;
