import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'

const Article = (props) => {

  /*
  news object: {
    articles: [
      author
      content
      description
      publishedAt: "2021-01-29T18:57:01Z"
      source: {
        id
        name
      }
      title:
      url:
      urlToImage:
    ]
  }

  */

  // useEffect(() => console.log("news", props.news))

  function handleTitleLength() {
    let shortTitle = []
    let { title } = props.article
    // console.log('title', title)
    let titleArr = title.split('')
    // console.log(titleArr)

    if (titleArr.length > 45) {
      for (let i = 0; i < 45; i++) {
        shortTitle.push(titleArr[i])
      }
      shortTitle.push('.')
      shortTitle.push('.')
      shortTitle.push('.')
      console.log('shortTitle', shortTitle)
      let titleJoined = shortTitle.join('')
      console.log(titleJoined)
      return titleJoined
    } else {
      console.log(title)
      return title
    }
  }

  return (
    <Card className='Article'>
      <Card.Body className='article-body'>
        <Card.Title className='article-title'>
          {handleTitleLength()}
        </Card.Title>
        <Card.Subtitle
        class='text-muted'  className='article-subtitle'>
          {props.article.source.name}
        </Card.Subtitle>
      </Card.Body>
      {props.article.urlToImage ? (
        <Card.Img
          src={props.article.urlToImage}
          variant='side'
          className='article-img'
        />
      ) : <div className='article-no-img'></div>}
    </Card>
  )
}

export default Article