import React from 'react'
import { ReactComponent as DashboardLogo } from '../assets/DashboardLogo.svg'
import { Navbar, Figure, Container } from 'react-bootstrap'

const Header = (props) => {

  return (
    <div>
      <Navbar className='Header'>
        <Navbar.Brand md={2}>
          <DashboardLogo
            className='logo'
          />
          <Navbar.Text>
            THE COVID-19 Dashboard
          </Navbar.Text>
        </Navbar.Brand>
        <Container className='header-data-icons'>
          <Container
            className='header-icon-infections'
          >
            <p>TOTAL US INFECTIONS</p>
          </Container>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header