import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { initializeOrders } from './reducers/orderReducer'
import { initializeOrders as initializeWorkOrders} from './reducers/workOrderReducer'

import OrderList from './components/OrderList'
import WorkOrderList from './components/WorkOrderList'
import OrderForm from './components/OrderForm'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeOrders())
    dispatch(initializeWorkOrders())
  }, [dispatch])

  const orders = useSelector(({orders}) => orders)
  const workOrders = useSelector(({workOrders}) => workOrders)

  return(
    <div>
      <OrderForm />
      <OrderList orders={orders} />
      <WorkOrderList workOrders={workOrders}/>
    </div>  
  )
}

export default App
