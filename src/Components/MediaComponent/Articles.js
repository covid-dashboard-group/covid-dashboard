import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Article from './Article'
import Loading from '../Loading'

const Articles = (props) => {

  /*
  news object: {
    Articles: [
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
  
  // useEffect(() => {
  //   if (props.news.articles) {
      
  //   } else {
  //     return null
  //   }
  // })

  return (
    <Container className='Articles'>
      {props.news.articles ? (
        props.news.articles.map(element => {
          return (
            <Article
              key={element.id}
              article={element}
            />
          )
        })
      ) : <Loading />}
    </Container>
  )
}

export default Articles