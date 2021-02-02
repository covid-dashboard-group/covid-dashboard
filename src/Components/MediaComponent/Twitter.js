import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Loading from '../Loading'
import Tweet from './Tweet'

const Twitter = (props) => {

  // useEffect(() => console.log(props.tweets))
  
  return (
    <Container className='Twitter'>
      <Container className='twitter-header'>
        <img src='https://pbs.twimg.com/profile_images/1286024647171956736/bJ4lH6YI_400x400.png' />
        <h1>@COVID19Tracking</h1>
      </Container>
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