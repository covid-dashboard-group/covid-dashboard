import React from 'react'
import { Container } from 'react-bootstrap'
import { ReactComponent as LoadingBox } from '../assets/Loading-Box.svg'
import { ReactComponent as LoadingText } from '../assets/Loading-Text.svg'

const Loading = (props) => {

  return (
    <Container className='Loading'>
      <LoadingBox className='LoadingBox' />
      <LoadingText className='LoadingText' />
    </Container>
  )
}

export default Loading