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
    let titleArr = title.split('')

    if (titleArr.length > 50) {
      for (let i = 0; i < 50; i++) {
        shortTitle.push(titleArr[i])
      }
      shortTitle.push('.')
      shortTitle.push('.')
      shortTitle.push('.')
      let titleJoined = shortTitle.join('')
      return titleJoined
    } else {
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
          className='article-subtitle'>
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