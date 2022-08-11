import { createSlice} from '@reduxjs/toolkit'
import workOrderService from '../services/WorkOrders'


const workOrderSlice = createSlice({
  name: 'workOrders',
  initialState: [],
  reducers: {
    rejectOrder(state, action) {
      const id = action.payload
      const filteredWorkOrders = state.filter(workOrder => workOrder.id !== id)
      return filteredWorkOrders
    },
    addNewOrder(state, action){
      const order = action.payload
      state.push(order)
    },
    setOrders(state, action){
      return action.payload
    }
  }
})

export const { rejectOrder, addNewOrder, setOrders } = workOrderSlice.actions

export const initializeOrders = () => {
  return async dispatch => {
    const orders = await workOrderService.getAll()
    console.log(orders, 'Testing work order reducer')
    dispatch(setOrders(orders))
  }
}

export const createOrder = (orderObject) => {
  return async dispatch => {
    const orderCreated = await workOrderService.create(orderObject)
    dispatch(addNewOrder(orderCreated))
  }
}

// export const updateOrder = (id, orderObject) => {
//   return async dispatch => {
//     const updatedOrder = await workOrderService.update(id, orderObject)
//     dispatch(toggleAccept(updatedOrder))
//   }
// }

export const removeWorkOrder = (id) => {
  return async dispatch => {
    await workOrderService.terminate(id)
    dispatch(rejectOrder(id))
  }
}

export default workOrderSlice.reducer