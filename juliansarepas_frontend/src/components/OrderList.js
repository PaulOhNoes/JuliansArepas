import { useDispatch } from 'react-redux/es/exports'
import { updateOrder } from '../reducers/orderReducer'
import { createOrder as createWorkOrder} from '../reducers/workOrderReducer'
const OrderList = ({orders}) => {
  const dispatch = useDispatch()

  const toggleAccepted = (order) => {
    const updatedOrder = {...order, accepted: !order.accepted}

    dispatch(updateOrder(order.id, updatedOrder))
    dispatch(createWorkOrder(updatedOrder))
  }

  return(
    <div>
      <h1>Order Requests</h1>
      <ul>
        {orders.map((order) => 
          <Order key={order.id} name={order.name} quanity={order.quanity} accepted={order.accepted} toggleAccepted={() => toggleAccepted(order)}/> 
        )}
      </ul>
    </div>
  )
}

const Order = ({ name, quanity, accepted, toggleAccepted}) => {
  let displayAccept = {
          display: 'Accept',
          style: 'btn btn-success btn-sm'
        }

  if(accepted){
    return (
      <li>{name}: {quanity} arepas </li>
    ) 
  }
  else {
    return (
      <li>{name}: {quanity} arepas <button className={displayAccept.style} onClick={toggleAccepted}> {displayAccept.display}</button></li>
    ) 
  }
}

export default OrderList