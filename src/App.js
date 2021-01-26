import React from 'react'
import Header from './Components/Header'
import Data from './Components/Data'
import Visuals from './Components/Visuals'
import Media from './Components/Media'
import { Container, Col, Row } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <Header />
      <Container className='display' fluid>
        <Row>
          <Col xs={12} md={3} className='Data'>
            <Data />
          </Col>
          <Col xs={12} md={6} className='Visuals'>
            <Visuals />
          </Col>
          <Col xs={12} md={3} className='Media'>
            <Media />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
