import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { initializeOrders } from './reducers/orderReducer'
import { initializeOrders as initializeWorkOrders} from './reducers/workOrderReducer'

import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'

import OrderList from './components/OrderList'
import WorkOrderList from './components/WorkOrderList'
import OrderForm from './components/OrderForm'
import NavigationBar from './components/NavigationBar'
import EmployeeDashBoard from './components/EmployeeDashBoard'
import About from './components/About'

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
      <NavigationBar />
      <div className='container text-center'>
        <div className='my-5 row justify-content-md-center'>
          <h1 className='col-md-auto'>Employee Dashboard</h1>
        </div>
          <Routes>
            <Route path='/' element={<EmployeeDashBoard />} />
            <Route path='/Orders' element={<OrderList orders={orders} />} />
            <Route path='/WorkOrders' element={<WorkOrderList workOrders={workOrders} />} />
            <Route path='/NewOrder' element={<OrderForm />} />
            <Route path='/About' element={<About />} />
          </Routes>
      </div>
    </div>
  )
}

export default App
