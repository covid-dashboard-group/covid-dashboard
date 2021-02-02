import React from 'react'
import { Container, Card } from 'react-bootstrap'
import TwitterLogo from '../../assets/TwitterLogo.png'

const Tweet = (props) => {
  const linkFinder=(str)=>{
    let link=str.match('http')
    if(link){
      return  str.split('').splice(link.index).join('')
    }
  }

  return (
    <Card className='Tweet' onClick='window.open('>
      <Card.Img
        src={TwitterLogo}
        variant='side'
        className='tweet-img'
      />
      <Card.Body className='tweet-body'>
        {linkFinder(props.tweet.text)?
     <div>{props.tweet.text.replace(linkFinder(props.tweet.text),"")}
     <a href={linkFinder(props.tweet.text)}>{linkFinder(props.tweet.text)}</a>
     </div>
     :props.tweet.text  
      }
      </Card.Body>
    </Card>
  )
}

export default Tweet