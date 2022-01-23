import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

function Summary () {
  const {
    tweets, isFiltered, filterTweets, clearFilter
  } = useContext(GlobalContext)
  const pos = tweets.filter((tweet) => tweet.prediction === 'POS').length
  const nue = tweets.filter((tweet) => tweet.prediction === 'NUE').length
  const neg = tweets.filter((tweet) => tweet.prediction === 'NEG').length

  return (
    <div className='flex flex-col rounded-t-xl border'>
      <div className='p-2 rounded-t-xl bg-black text-white text-center'>
        Summary
      </div>
      <div className='flex flex-col'>
        <button className='border-gray-200 border-b p-2 hover:bg-gray-400 focus:bg-gray-500' onClick={() => filterTweets('POS')}>
          <div className='flex flex-row justify-between'>
            <span className='text-cente align-text-bottom pt-1'>Positive</span>
            <span className='bg-green-200 rounded-xl text-xs text-center p-2'>{pos}</span>
          </div>
        </button>
        <button className='border-gray-200 border-b p-2 hover:bg-gray-400 focus:bg-gray-500' onClick={() => filterTweets('NUE')}>
          <div className='flex flex-row justify-between'>
            <span className='text-cente align-text-bottom pt-1'>Nuetral</span>
            <span className='bg-yellow-200 rounded-xl text-xs text-center p-2'>{nue}</span>
          </div>
        </button>
        <button className='border-gray-200 border-b p-2 hover:bg-gray-400 focus:bg-gray-500' onClick={() => filterTweets('NEG')}>
          <div className='flex flex-row justify-between'>
            <span className='text-cente align-text-bottom pt-1'>Negative</span>
            <span className='bg-red-200 rounded-xl text-xs text-center p-2'>{neg}</span>
          </div>
        </button>
      </div>
      {isFiltered &&
        <button className='border-b p-2 hover:bg-gray-400 focus:bg-black' onClick={() => clearFilter()}>Clear Filter</button>}
    </div>
  )
}

export default Summary
