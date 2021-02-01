import React from 'react'
import CountryData from './DataComponent/CountryData'
import StateData from './DataComponent/StateData'
import { Container } from 'react-bootstrap'
import Loading from './Loading'

const Data = (props) => {

  return (
    <Container  className='Data'>
      <CountryData />
      <StateData />
    </Container>
  )
}

export default Data