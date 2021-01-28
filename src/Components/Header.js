import React from 'react'
import { ReactComponent as DashboardLogo } from '../assets/DashboardLogo.svg'
import { Row, Container, Col } from 'react-bootstrap'

const Header = (props) => {

  return (
    <div>
      <Row className='Header'>
        <Col
          className='brand-logo'
          md={2}
        >
          <DashboardLogo className='logo' />
        </Col>
        
        <Col
          className='header-white-space'
          md={2}
        >
        </Col>

        <Col
          className='header-national-title'
          md={2}
        >
          <p className='NATIONAL'>
            NATIONAL
          </p>
          <p className="USSTATS">
            U.S. STATS:
          </p>
        </Col>

        <Col
          className='header-icon-infections'
          md={2}
        >
          <p className='header-icon-text'>TOTAL US INFECTIONS</p>
        </Col>

        <Col
          className='header-icon-deaths'
          md={2}
        >
          <p className='header-icon-text'>TOTAL US DEATHS</p>
        </Col>

        <Col
          className='header-icon-vaccinations'
          md={2}
        >
          <p className='header-icon-text'>TOTAL US VACCINATIONS</p>
        </Col>
      </Row >
    </div >
  )
}

export default Header