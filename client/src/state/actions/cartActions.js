export const cartAddItem = (data) => {
  return {
    type: "CART_ADD_ITEM",
    payload: data,
  };
};

export const cartRemoveItem = (data) => {
  return {
    type: "CART_REMOVE_ITEM",
    payload: data,
  };
};

export const cartClear = (data) => {
  return {
    type: "CART_CLEAR",
    payload: data,
  };
};

export const saveShippingAddress = (data) => {
  return {
    type: "SAVE_SHIPPING_ADDRESS",
    payload: data,
  };
};

export const savePaymentMethod = (data) => {
  return {
    type: "SAVE_PAYMENT_METHOD",
    payload: data,
  };
};

export const cartAddPrices = (data) => {
  return {
    type: "CART_ADD_PRICES",
    payload: data,
  };
};
