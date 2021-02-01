import React from 'react'
import Twitter from './MediaComponent/Twitter'
import Articles from './MediaComponent/Articles'
import { Container } from 'react-bootstrap'

const Media = (props) => {

  return (
    <Container className='Media'>
      <Articles news={props.news}/>
      <Twitter tweets={props.tweets}/>
    </Container>
  )
}

export default Media