const OrderList = ({ name, quanity, accepted, toggleAccepted}) => {
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