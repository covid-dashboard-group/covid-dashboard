import React, { useEffect } from 'react'
import { ReactComponent as DashboardLogo } from '../assets/DashboardLogo.svg'
import Graphic1 from '../assets/Graphic-1.png'
import Graphic2 from '../assets/Graphic-2.png'
import Graphic3 from '../assets/Graphic-3.png'
import Graphic4 from '../assets/Graphic-4.png'
import { Row, Container, Col } from 'react-bootstrap'

const Header = (props) => {

  // useEffect(() => console.log(props.natData))

  return (
    <Container fluid>
      <Row className='Header'>
        <Col
          className='brand-logo'
          md={2}
          xs={12}
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
          xs={12}
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
            className='header-icon-active-infections'
          >
            <Container
              className='header-icon-data'
            >
              <p>{props.natData['Active Cases_text']}</p>
              <img
                src={Graphic1}
                className='header-graphic'
              />
            </Container>
            <p className='header-icon-text'>ACTIVE INFECTIONS</p>
          </Container>

          <Container
            className='header-icon-total-infections'
          >
            <Container
              className='header-icon-data'
            >
              <p>{props.natData['Total Cases_text']}</p>
              <img
                src={Graphic4}
                className='header-graphic'
              />
            </Container>
            <p className='header-icon-text'>TOTAL INFECTIONS</p>
          </Container>

          <Container
            className='header-icon-deaths'
          >
            <Container
              className='header-icon-data'
            >
              <p>{props.natData['Total Deaths_text']}</p>
              <img
                src={Graphic3}
                className='header-graphic'
              />
            </Container>
            <p className='header-icon-text'>TOTAL DEATHS</p>
          </Container>

        </Col>

      </Row >
    </Container >
  )
}

export default Header