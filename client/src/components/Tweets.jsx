import React, { useContext } from 'react'
import { MutatingDots } from 'react-loader-spinner'
import { GlobalContext } from '../context/GlobalState'
import Tweetcards from './Tweetcards'

function Tweets () {
  const { tweetsLoading, showTweets } = useContext(GlobalContext)

  return (
    <div className='h-screen overflow-auto'>
      {tweetsLoading
        ? (
          <div className='flex h-full justify-center items-center'>
            <MutatingDots heigth='100' width='100' color='grey' ariaLabel='loading' />
          </div>
          )
        : (
          <div>
            {showTweets.map((tweet) => (
              <div key={tweet.id} className='border-gray-200 border mb-4 rounded-xl'>
                <Tweetcards tweet={tweet} />
              </div>
            ))}
          </div>
          )}
    </div>
  )
}

export default Tweets
