import React from 'react'
import { Container } from 'react-bootstrap'
import Map from './VisualsComponent/Map'
import Graph from './VisualsComponent/Graph'

const Visuals = (props) => {

  return (
    <div>
      <Container className='Map'>
        <Map />
      </Container>
      <Container className='Graph'>
        <Graph />
      </Container>
    </div>
  )
}

export default Visuals