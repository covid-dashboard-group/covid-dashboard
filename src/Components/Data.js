import React from 'react'
import USData from './DataComponent/USData'
import StateData from './DataComponent/StateData'
import { Container } from 'react-bootstrap'

const Data = (props) => {
  
  return (
    <div>
      <Container className='USData'>
        <USData />
      </Container>
      <Container className='StateData'>
        <StateData />
      </Container>
    </div>
  )
}

export default Data