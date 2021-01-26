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
      <Container className='display'>
        <Row>
          <Col md={3}>
            <Data className='Data'/>
          </Col>
          <Col md={6}>
            <Visuals className='Visuals'/>
          </Col>
          <Col md={3}>
            <Media className='Media'/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
