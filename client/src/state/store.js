import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./reducers/orderReducer";
import placeOrderReducer from "./reducers/placeOrderReducer";
import productReducer from "./reducers/productReducer";
import shopReducer from "./reducers/shopReducer";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import orderHistoryReducer from "./reducers/orderHistoryReducer";
import orderListReducer from "./reducers/orderListReducer";
import productEditReducer from "./reducers/productEditReducer";
import productListReducer from "./reducers/productListReducer";
import profileReducer from "./reducers/profileReducer";
import userEditReducer from "./reducers/userEditReducer";
import userListReducer from "./reducers/userListReducer";
import searchReducer from "./reducers/searchReducer";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    placeOrder: placeOrderReducer,
    product: productReducer,
    shop: shopReducer,
    user: userReducer,
    cart: cartReducer,
    dashboard: dashboardReducer,
    orderHistory: orderHistoryReducer,
    orderList: orderListReducer,
    productEdit: productEditReducer,
    productList: productListReducer,
    profile: profileReducer,
    userEdit: userEditReducer,
    userList: userListReducer,
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});
