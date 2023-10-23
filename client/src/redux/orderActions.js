// orderActions.js

export const placeOrder = (orderData) => {
    return {
      type: 'PLACE_ORDER',
      payload: orderData,
    };
  };
  