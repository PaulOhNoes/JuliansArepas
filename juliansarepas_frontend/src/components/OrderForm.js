import { useDispatch } from 'react-redux/es/exports'
import { createOrder } from '../reducers/orderReducer'
const OrderForm = () => {
  const dispatch = useDispatch()

  const addNewOrder = async (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const quanity = event.target.quanity.value

    event.target.name.value = ''
    event.target.quanity.value = ''
    dispatch(createOrder(name, Number(quanity)))
  }
  return (
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
    </div>
  )
}

export default OrderForm