import React from 'react'
import { ReactComponent as DashboardLogo } from '../assets/DashboardLogo.svg'
import { Row, Container, Col } from 'react-bootstrap'

const Header = (props) => {

  return (
    <div>
      <Row className='Header'>
        <Col
          className='brand'
          md={4}
        >
          <DashboardLogo className='logo' />
          <p
            className='brand-text'
          >
            THE COVID-19 Dashboard
          </p>
        </Col>
        <Col
          className='header-white-space'
          md={2}
        >
        </Col>
        <Col
          className='header-icon-infections'
          md={2}
        >
          <p className='header-text-infections'>TOTAL US INFECTIONS</p>
        </Col>
        <Col
          className='header-icon-deaths'
          md={2}
        >
          <p className='header-text-deaths'>TOTAL US DEATHS</p>
        </Col>
        <Col
          className='header-icon-vaccinations'
          md={2}
        >
          <p className='header-text-vaccinations'>TOTAL US VACCINATIONS</p>
        </Col>
      </Row >
    </div >
  )
}

export default Header