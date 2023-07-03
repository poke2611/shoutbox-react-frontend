const initialState = {
  isPopupOpen: false,
  filterFlag: false,
  allProducts: [],
  sortedProducts: [],
  hightToLowSortedProducts: [],
  filteredProducts: [],
  sortFlag: false,
  sortOn: "lowToHigh",
  currentPage: "P",
  selectedCategory: "",
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
         // sortedProducts: [...state.sortedProducts, ...action.payload],
          sortedProducts: action.payload,
          allProducts: state.sortedProducts,
        };
        
        case 'FILTER_PRODUCTS':
          console.log("FILTER_PRODUCTS", state.sortFlag, state.filterFlag, state.filteredProducts, action.payload );
          return {
            ...state,
            filterFlag: true,
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
            selectedCategory: action.payload,
          };

        case 'SET_PAGE_NAME':
          console.log("SET_PAGE_NAME",  action.payload );
          return {
            ...state,
            currentPage: action.payload,
            
          };

        case 'SET_FILTER_FLAG':
        console.log("SET_FILTER_FLAG",  action.payload );
        return {
          ...state,
          filterFlag: action.payload,
        };

        case 'SET_SORT_FLAG':
          console.log("SET_SORT_FLAG",  action.payload );
          return {
            ...state,
            sortFlag: action.payload,
          };

        case 'SET_PAGE_NAME':
          console.log("SET_PAGE_NAME",  action.payload );
          return {
            ...state,
            currentPage: action.payload,
            
          };

        case 'SET_FILTER_FLAG':
        console.log("SET_FILTER_FLAG",  action.payload );
        return {
          ...state,
          filterFlag: action.payload,
        };

        case 'SET_SORT_FLAG':
          console.log("SET_SORT_FLAG",  action.payload );
          return {
            ...state,
            sortFlag: action.payload,
          };
        
        default:
          return state;
  
    }
  };
  
  export default rootReducer;
  