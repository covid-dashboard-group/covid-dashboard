import React from 'react'
import { ReactComponent as DashboardLogo } from '../assets/DashboardLogo.svg'
import { Row, Container, Col } from 'react-bootstrap'

const Header = (props) => {

  return (
    <Container fluid>
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
          className='header-icons'
          md={8}
        >
          <Container
            className='header-national-title'
          >
            <p className='NATIONAL'>
              NATIONAL
          </p>
            <p className="USSTATS">
              U.S. STATS:
          </p>
          </Container>
          <Container
            className='header-icon-infections'
          >
            <p className='header-icon-text'>TOTAL US INFECTIONS</p>
          </Container>

          <Container
            className='header-icon-deaths'
          >
            <p className='header-icon-text'>TOTAL US DEATHS</p>
          </Container>

          <Container
            className='header-icon-vaccinations'
          >
            <p className='header-icon-text'>TOTAL US VACCINATIONS</p>
          </Container>
        </Col>
      </Row >
    </Container >
  )
}

export default Header