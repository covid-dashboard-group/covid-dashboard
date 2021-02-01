import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'

const Article = (props) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
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

    if (title) {

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
    } else {
      return "[Title Unavailable]"
    }
  }

  function convertDate() {
    const dateArr = props.article.publishedAt.split('-')
    const day = dateArr[2][0] + dateArr[2][1]
    dateArr[2] = day

    const finalDate = `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`
    
    return finalDate
  }

  return (
    <div>
      <Card className='Article' onClick='window.open('>
        <Card.Body className='article-body'>
          <Card.Title className='article-title'>
            {handleTitleLength()}
          </Card.Title>
          <Card.Subtitle
            className='article-subtitle'>
            <div>
              {convertDate()}
            </div>
            <div>
              {props.article.source.name}
            </div>
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
{/* 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='modal-title'>
            <div>
              {props.article.title}
            </div>
            <div>
              {props.article.source.name}
            </div>
            <div>
              {props.article.author}
            </div>
            <div>
              {convertDate()}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.article.description}
          {props.article.content}
        </Modal.Body>
      </Modal> */}
    </div>
  )
}

export default Article