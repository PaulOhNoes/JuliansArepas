import { Link, useLocation } from 'react-router-dom'
const NavigationBar = () => {
  let location = useLocation().pathname //Returns the web file path

  const navLinks = [
    {
      to: '/',
      display: 'Employee Dashboard'
    },
    {
      to: '/Orders',
      display: 'Orders'
    }, 
    {
      to: '/WorkOrders',
      display: 'Work Orders'
    }, 
    {
      to: '/NewOrder',
      display: 'New Order'
    }, 
    {
      to: '/About',
      display: 'About'
    },  
  ]
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map(navLink => {
                if(navLink.to === location){
                  return(
                    <li className="nav-item">
                      <Link className="nav-link active"  to={navLink.to}>{navLink.display}</Link>
                    </li> 
                  )
                }
                else{
                  return (
                    <li className="nav-item">
                      <Link className="nav-link"  to={navLink.to}>{navLink.display}</Link>
                    </li> 
                  )
                }
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
    
  )
}

export default NavigationBar