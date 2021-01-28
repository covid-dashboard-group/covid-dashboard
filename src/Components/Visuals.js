import React from 'react'
import { Container } from 'react-bootstrap'
import Map from './VisualsComponent/Map'
import Graph from './VisualsComponent/Graph'

const Visuals = (props) => {

  return (
    <Container>
      <Map />
      <Graph />
    </Container>
  )
}

export default Visuals