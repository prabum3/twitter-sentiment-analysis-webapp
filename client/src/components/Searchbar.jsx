import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { GlobalContext } from '../context/GlobalState'

function Searchbar ({ hashTag, setHashTag }) {
  const { getTweets } = useContext(GlobalContext)

  return (
    <div className='bg-blue-200 p-5'>
      <h1 className='text-xl text-center py-5'>Twitter Sentiment Analyzer</h1>
      <div className='py-5'>
        <div className='w-1/2 mx-auto rounded-md bg-white'>
          <input
            type='text'
            className='w-4/5 pl-2 py-2 rounded-md placeholder-gray-300 text-gray-600 outline-none'
            placeholder='Hashtag'
            value={hashTag}
            onChange={(e) => setHashTag(e.target.value)}
          />
          <button className='w-1/5 py-2 rounded-md h-full bg-black text-white hover:bg-blue-900' type='button' onClick={() => getTweets(hashTag)}>Search</button>
        </div>
      </div>
    </div>
  )
}

Searchbar.propTypes = {
  hashTag: PropTypes.string,
  setHashTag: PropTypes.func
}

export default Searchbar
