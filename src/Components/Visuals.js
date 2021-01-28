import React from 'react'
import { Container } from 'react-bootstrap'
import Map from './VisualsComponent/Map'
import Graph from './VisualsComponent/Graph'

const Visuals = (props) => {

  return (
    <Container>
      <Container>
        <Map />
      </Container>
      <Container>
        <Graph />
      </Container>
    </Container>
  )
}

export default Visuals