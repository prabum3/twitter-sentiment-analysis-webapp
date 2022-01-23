import React from 'react'
import PropTypes from 'prop-types'

function Tweetcards ({ tweet }) {
  return (
    <>
      <TitleCard tweet={tweet} />
      <div className='p-4'>
        <p className='card-text'>{tweet.text}</p>
      </div>
    </>
  )
}

function TitleCard ({ tweet }) {
  const sentiment = tweet.prediction
  const score = tweet.score
  if (sentiment === 'POS') {
    return (
      <div className='bg-green-200 p-2 rounded-t-xl'>
        Predicted:Positive
        <span className='float-right'>
          Score:
          {score}
        </span>
      </div>
    )
  } if (sentiment === 'NEG') {
    return (
      <div className='bg-red-200 p-2 rounded-t-xl'>
        Predicted: Negative
        <span className='float-right'>
          Score:
          {score}
        </span>
      </div>
    )
  }
  return (
    <div className='bg-yellow-200 p-2 rounded-t-xl'>
      Predicted: Nuetral
      <span className='float-right'>
        Score:
        {score}
      </span>
    </div>
  )
}

Tweetcards.propTypes = {
  tweet: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    username: PropTypes.string,
    prediction: PropTypes.string,
    score: PropTypes.number
  })
}

TitleCard.propTypes = {
  tweet: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    username: PropTypes.string,
    prediction: PropTypes.string,
    score: PropTypes.number
  })

}

export default Tweetcards
