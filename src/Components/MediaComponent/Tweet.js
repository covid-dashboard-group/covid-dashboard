import React from 'react'
import { Container, Card } from 'react-bootstrap'
import TwitterLogo from '../../assets/TwitterLogo.png'

const Tweet = (props) => {

  return (
    <Card className='Tweet' onClick='window.open('>
      <Card.Img
        src={TwitterLogo}
        variant='side'
        className='tweet-img'
      />
      <Card.Body className='tweet-body'>
        {props.tweet.text}
      </Card.Body>
    </Card>
  )
}

export default Tweet