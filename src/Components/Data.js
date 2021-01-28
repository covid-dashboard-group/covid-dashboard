import React from 'react'
import USData from './DataComponent/USData'
import StateData from './DataComponent/StateData'
import { Container } from 'react-bootstrap'
import Loading from './Loading'

const Data = (props) => {
  
  return (
    <div>
      <Container>
        <USData />
      </Container>
      <Container>
        <StateData />
      </Container>
    </div>
  )
}

export default Data