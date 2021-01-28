import React from 'react'
import Twitter from './MediaComponent/Twitter'
import Articles from './MediaComponent/Articles'
import { Container } from 'react-bootstrap'

const Media = (props) => {

  return (
    <Container>
      <Articles />
      <Twitter />
    </Container>
  )
}

export default Media