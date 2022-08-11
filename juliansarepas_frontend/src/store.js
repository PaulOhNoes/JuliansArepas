import { configureStore } from "@reduxjs/toolkit"

import orderReducer from "./reducers/orderReducer"
import workOrderReducer from "./reducers/workOrderReducer"

const store = configureStore({
  reducer: {
    orders: orderReducer,
    workOrders: workOrderReducer,
  }
})

export default store