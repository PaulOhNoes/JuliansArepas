import { createSlice } from '@reduxjs/toolkit'
import orderService from '../services/Orders'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    acceptOrder(state, action) {
      const id = action.payload.id
      const orderToChange = state.find(o => o.id === id)
      const changedOrder = { ...orderToChange, accepted: !orderToChange.accepted }
      return (
        state.map(order => order.id !== id ? order : changedOrder)
      )
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

export const { acceptOrder, addNewOrder, setOrders } = orderSlice.actions

export const initializeOrders = () => {
  return async dispatch => {
    const orders = await orderService.getAll()
    dispatch(setOrders(orders))
  }
}

export const createOrder = (name, quanity) => {
  return async dispatch => {
    const newOrderObject = {name, quanity, id: generateId()}
    const orderCreated = await orderService.create(newOrderObject)
    console.log(newOrderObject, orderCreated)
    dispatch(addNewOrder(orderCreated))
  }
}

export const updateOrder = (id, orderObject) => {
  return async dispatch => {
    const updatedOrder = await orderService.update(id, orderObject)
    dispatch(acceptOrder(updatedOrder))
  }
}

export default orderSlice.reducer