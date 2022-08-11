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
    <div className='row justify-content-center'>
      <div className='col-4'>
        <h2>Order Requests</h2>
        <ul className='text-start'>
          {orders.map((order) => 
            <Order key={order.id} name={order.name} quanity={order.quanity} accepted={order.accepted} toggleAccepted={() => toggleAccepted(order)}/> 
          )}
        </ul>
      </div>
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