import React from 'react'
import { ReactComponent as DashboardLogo } from '../assets/DashboardLogo.svg'
import { Navbar } from 'react-bootstrap'

const Header = (props) => {

  return (
    <div>
      <Navbar className='Header'>
          <Navbar.Brand className='logo'>
            <DashboardLogo />
          </Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Header