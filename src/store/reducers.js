const initialState = {
  isPopupOpen: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_POPUP':
      return {
        ...state,
        isPopupOpen: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
