import React, { useContext, useEffect } from 'react'
import { MutatingDots } from 'react-loader-spinner'
import { GlobalContext } from '../context/GlobalState'
import PropTypes from 'prop-types'

function TrendingSection ({ setHashTag }) {
  const {
    trendsLoading, getTrending, trending, getTweets
  } = useContext(GlobalContext)

  useEffect(() => {
    getTrending()
  }, [])

  const handleClick = (trendName) => {
    getTweets(trendName)
    setHashTag(trendName)
  }

  return (
    <div className='flex flex-col rounded-t-xl h-screen border'>
      <div className='p-2 rounded-t-xl bg-black text-white text-center'>
        Nationwide Trends
      </div>
      <div className='flex flex-col overflow-y-scroll'>
        {trendsLoading
          ? (
            <div className='flex h-full justify-center content-center'>
              <MutatingDots heigth='100' width='100' color='grey' ariaLabel='loading' />
            </div>
            )
          : trending.map((trend) => (
            <button className='border-gray-200 border-b p-2 hover:bg-gray-400 focus:bg-gray-500' key={trend.trend_name} onClick={() => handleClick(trend.trend_name)}>
              <div className='flex flex-row justify-between'>
                <span className='text-cente align-text-bottom pt-1'>{trend.trend_name}</span>
                <span className='bg-blue-200 rounded-xl text-xs text-center p-2'>{trend.tweet_volume}</span>
              </div>
            </button>
          ))}
      </div>
    </div>
  )
}

TrendingSection.propTypes = {
  setHashTag: PropTypes.func
}

export default TrendingSection
