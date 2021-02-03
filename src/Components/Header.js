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
          <p>About</p>
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
          <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Information Sources</h3>
          <p>https://covidtracking.com/data/api</p>
          <p>https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest</p>
          <p>https://api.covidactnow.org/</p>
          <p>https://newsapi.org/</p>
          <p>https://covid-19.dataflowkit.com/</p>
          <p>https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html</p>

          <h3>Creators</h3>
          <p>James Florea</p>
          <p>Jeddy Hwang</p>
          <p>Rob Graczyk</p>
          <p>Mark Carey</p>

        </Modal.Body>
      </Modal>
    </Container >
  )
}

export default Header