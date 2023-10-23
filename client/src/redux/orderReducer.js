// orderReducer.js

const initialState = {
    orderData: null,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PLACE_ORDER':
        return {
          ...state,
          orderData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  