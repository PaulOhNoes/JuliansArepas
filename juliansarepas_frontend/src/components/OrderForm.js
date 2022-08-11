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
    <div className='row justify-content-center'>
      <div className='col-4'>
        <h2>Create an Order</h2>
        <form className='text-start'onSubmit={addNewOrder}>
          <div>
            Name: <input name='name'/>
          </div>
          <div>
            Quanity: <input name='quanity' /> 
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderForm