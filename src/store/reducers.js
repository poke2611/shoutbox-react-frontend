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
  brandID: "",
  items: [],
  itemId:"",
  cartID:"",
  muteFlag: false
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

          case 'SET_MUTE_FLAG':
          console.log("MUTE_FLAG",  action.payload );
          return {
            ...state,
            muteFlag: action.payload,
          };

        case 'SET_BRAND_ID':
          console.log("SET_BRAND_ID",  action.payload );
          return {
            ...state,
            brandID: action.payload,
          };

        case 'SET_CART':
          console.log("SET_CART",  action.payload );
          return {
            ...state,
            items: [...state.sortedProducts, ...action.payload],
          };
        
        case 'REMOVE_ITEM':
          console.log("REMOVE_ITEM",  action.payload );
          return {
            ...state,
            brandID: action.payload,
          };

        case 'SET_CART_IDENTIFIER':
          console.log("SET_CART_IDENTIFIER",  action.payload );
          return {
            ...state,
            cartID: action.payload,
          };
          

        default:
          return state;
  
    }
  };
  
  export default rootReducer;
  