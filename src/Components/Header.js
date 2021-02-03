import React, { useEffect, useState } from 'react'
import { ReactComponent as DashboardLogo } from '../assets/DashboardLogo.svg'
import Graphic1 from '../assets/Graphic-1.png'
import Graphic2 from '../assets/Graphic-2.png'
import Graphic3 from '../assets/Graphic-3.png'
import Graphic4 from '../assets/Graphic-4.png'
import Graphic5 from '../assets/Graphic-5.png'
import { Row, Container, Col, Modal, Button } from 'react-bootstrap'

const Header = (props) => {

  // useEffect(() => console.log(props.natData))

  const [show, setShow] = useState(false)
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  function numberWithCommas(x) {
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

  return (
    <Container fluid>
      <Row className='Header'>
        <Col
          className='brand-logo'
          md={1}
          xs={12}
        >
          <DashboardLogo className='logo' />
        </Col>

        <Col
          className='header-info-sources'
          md={1}
          onClick={handleShow}
        >
          <p>see info sources</p>
        </Col>

        <Col
          className='header-icons'
          md={10}
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
              <p>{props.natData['Active Cases_text']||props.natData2['hospitalizedCurrently']}</p>
              <img
                src={Graphic1}
                className='header-graphic'
              />
            </Container>
            <p className='header-icon-text'>{props.natData['Active Cases_text']?'ACTIVE INFECTIONS':'CURRENTLY HOSPITALIZED'}</p>
          </Container>

          <Container
            className='header-icon-total-infections'
          >
            <Container
              className='header-icon-data'
            >
              <p>{props.natData['Total Cases_text']||props.natData2['positive']}</p>
              <img
                src={Graphic4}
                className='header-graphic'
              />
            </Container>
            <p className='header-icon-text'>{props.natData['Total Cases_text']?'TOTAL INFECTIONS':'POSITIVE'}</p>
          </Container>

          <Container
            className='header-icon-hospitalizations'
          >
            <Container
              className='header-icon-data'
            >
              <p>{numberWithCommas(props.natData2['hospitalized'])}</p>
              <img
                src={Graphic5}
                className='header-graphic'
              />
            </Container>
            <p className='header-icon-text'>HOSPITALIZATIONS</p>
          </Container>

          <Container
            className='header-icon-deaths'
          >
            <Container
              className='header-icon-data'
            >
              <p>{props.natData['Total Deaths_text']||props.natData2['death']}</p>
              <img
                src={Graphic3}
                className='header-graphic'
              />
            </Container>
            <p className='header-icon-text'>TOTAL DEATHS</p>
          </Container>

        </Col>

      </Row >

      <Modal show={show} onHide={handleClose} className='sources-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Information Sources</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          These are all our sources
        </Modal.Body>
      </Modal>
    </Container >
  )
}

export default Header