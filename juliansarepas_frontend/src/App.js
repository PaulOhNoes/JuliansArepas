import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { initializeOrders, createOrder, updateOrder } from './reducers/orderReducer'
import { createOrder as createWorkOrder,
  initializeOrders as initializeWorkOrders,
  removeWorkOrder} from './reducers/workOrderReducer'

import OrderList from './components/OrderList'
import WorkOrderList from './components/WorkOrderList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeOrders())
    dispatch(initializeWorkOrders())
  }, [dispatch])

  const orders = useSelector(({orders}) => orders)
  const workOrders = useSelector(({workOrders}) => workOrders)


  // Accept or Reject Orders // updates the WorkOrders Table
  const toggleAccepted = (order) => {
    const updatedOrder = {...order, accepted: !order.accepted}

    dispatch(updateOrder(order.id, updatedOrder))
    dispatch(createWorkOrder(updatedOrder))
  }

  const toggleRejected = (workOrder) => {
    const updatedWorkOrder = {...workOrder, accepted: !workOrder.accepted}
    
    dispatch(updateOrder(workOrder.id, updatedWorkOrder))
    dispatch(removeWorkOrder(workOrder.id))
  }

  const addNewOrder = async (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const quanity = event.target.quanity.value

    event.target.name.value = ''
    event.target.quanity.value = ''
    dispatch(createOrder(name, Number(quanity)))
  }
  return(
    <div>
      <h1>Create an Order</h1>
      <form onSubmit={addNewOrder}>
        <div>
          name: <input name='name'/>
        </div>
        <div>
          quanity: <input name='quanity' /> 
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <h1>Order Requests</h1>
      <ul>
        {orders.map((order) => 
          <OrderList key={order.id} name={order.name} quanity={order.quanity} accepted={order.accepted} toggleAccepted={() => toggleAccepted(order)}/> 
        )}
      </ul>
      <h1>Work Orders</h1>
      <ul>
      {workOrders.map((workOrder) => 
          <WorkOrderList key={workOrder.id} name={workOrder.name} quanity={workOrder.quanity} accepted={workOrder.accepted} toggleRejected={() => toggleRejected(workOrder)}/>
        )}
      </ul>
    </div>  
  )
}

export default App;
