import {useState, useEffect} from 'react'
import OrderList from './components/OrderList'
import ordersService from './services/Orders'
import workOrdersService from './services/WorkOrders'


const App = () => {
  const [orders, setOrders] = useState([])
  const [workOrders, setWorkOrders] = useState([])
  const [name, setName] = useState('')
  const [quanity, setQuanity] = useState(1)

  useEffect(() => {
    ordersService
        .getAll()
        .then(returnedOrders => {
          setOrders(returnedOrders)
        })
        .catch(error => console.log('Server is not up. Error: ', error))
    workOrdersService
        .getAll()
        .then(returnedWorkOrders => {
          setWorkOrders(returnedWorkOrders)
        })
        .catch(error => console.log('Server is not up. Error: ', error))
  }, [])


  // Accept or Reject Orders // updates the WorkOrders Table
  const toggleAccepted = (order) => {
    const updatedOrder = {...order, accepted: !order.accepted}
    ordersService
        .update(order.id, updatedOrder)
        .then(returnedOrder => {
          console.log('Order updated!')
          // updates the orders state
          setOrders(orders.map(orderItem => orderItem.id !== returnedOrder.id ? orderItem : updatedOrder))

          //update the WorkOrders array
          if(order.accepted){
            workOrdersService.terminate(returnedOrder.id).then(() => {
              setWorkOrders(workOrders.filter(workOrderItem => workOrderItem.id !== returnedOrder.id))
            })
          }
          else{
            workOrdersService.create(updatedOrder).then(returnedWorkOrder => setWorkOrders(workOrders.concat(returnedWorkOrder)))
          }
        })
        .catch(error => console.log('Could not update order: ', error))
  }

  const addNewOrder = (event) => {
    event.preventDefault()
    const newOrderObject = {
      id: orders.length + 1,
      name: name,
      quanity: quanity
    }

    ordersService
        .create(newOrderObject)
        .then(returnedOrder => {
          setOrders(orders.concat(returnedOrder))
          setName('')
          setQuanity(1)
        })
        .catch(error => console.log('Could not create the order. Error: ', error))
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleQuanityChange = (event) => {
    setQuanity(event.target.value)
  }


  return(
    <div>
      <h1>Create an Order</h1>
      <form onSubmit={addNewOrder}>
        <div>
          name: <input value={name} onChange={handleNameChange}/>
        </div>
        <div>
          quanity: <input value={quanity} onChange={handleQuanityChange}/>
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
      {workOrders.map((order) => 
          <OrderList key={order.id} name={order.name} quanity={order.quanity} accepted={order.accepted} toggleAccepted={() => toggleAccepted(order)}/>
        )}
      </ul>
    </div>  
  )
}

export default App;
