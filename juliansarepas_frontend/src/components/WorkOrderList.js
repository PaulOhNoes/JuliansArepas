const OrderList = ({ name, quanity, toggleRejected}) => {
  let displayAccept = {
          display: 'Reject',
          style: 'btn btn-danger btn-sm'
        } 

  return (
    <li>{name}: {quanity} arepas <button className={displayAccept.style} onClick={toggleRejected}> {displayAccept.display}</button></li>
  )
}

export default OrderList