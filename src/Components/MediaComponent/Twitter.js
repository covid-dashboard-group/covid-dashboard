import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Loading from '../Loading'
import Tweet from './Tweet'

const Twitter = (props) => {

  useEffect(() => console.log(props.tweets))
  
  return (
    <Container className='Twitter'>
      {props.tweets.length !== 0 ? (
        props.tweets.map(element => {
          return (
            <Tweet
              key={element.id}
              tweet={element}
            />
          )
        })
      ) : <Loading />}
    </Container>
  )
}

export default Twitter