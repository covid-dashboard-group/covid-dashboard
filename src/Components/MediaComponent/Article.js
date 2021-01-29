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

  return (
    <Card className='Article'>
      <Card.Body>
        <Card.Image
          src={props.article.urlToImage}
        />
        <Card.Title className='article-title'>
          {props.article.title}
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {props.article.source.name}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default Article