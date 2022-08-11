import { useDispatch } from 'react-redux/es/exports'
import { updateOrder } from '../reducers/orderReducer'
import { removeWorkOrder } from '../reducers/workOrderReducer'

const WorkOrderList = ({workOrders}) => {
  const dispatch = useDispatch()

  const toggleRejected = (workOrder) => {
    const updatedWorkOrder = {...workOrder, accepted: !workOrder.accepted}
    
    dispatch(updateOrder(workOrder.id, updatedWorkOrder))
    dispatch(removeWorkOrder(workOrder.id))
  }
  return(
    <div className='row justify-content-center'>
      <div className='col-4'>
        <h2>Work Orders</h2>
          <ul className='text-start'>
          {workOrders.map((workOrder) => 
              <WorkOrder key={workOrder.id} name={workOrder.name} quanity={workOrder.quanity} toggleRejected={() => toggleRejected(workOrder)}/>
            )}
          </ul>
      </div>
    </div>
    
  )
}

const WorkOrder = ({ name, quanity, toggleRejected}) => {
  let displayAccept = {
          display: 'Reject',
          style: 'btn btn-danger btn-sm'
        } 

  return (
    <li>{name}: {quanity} arepas <button className={displayAccept.style} onClick={toggleRejected}> {displayAccept.display}</button></li>
  )
}

export default WorkOrderList