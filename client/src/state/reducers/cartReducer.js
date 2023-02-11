const initialState = {
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    case "CART_ADD_PRICES": {
      const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
      const itemsPrice = round2(
        state.cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
      );
      const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
      const taxPrice = round2(0.15 * itemsPrice);
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
      return {
        ...state,
        cart: {
          ...state.cart,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
      };
    }

    default:
      return state;
  }
}

export default cartReducer;
