import React from 'react'
import Twitter from './MediaComponent/Twitter'
import Articles from './MediaComponent/Articles'
import { Container } from 'react-bootstrap'

const Media = (props) => {

  return (
    <div>
      <Container className='Articles'>
        <Articles />
      </Container>
      <Container className='Twitter'>
        <Twitter />
      </Container>
    </div>
  )
}

export default Media