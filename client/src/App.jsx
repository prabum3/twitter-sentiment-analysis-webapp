import React, { useState } from 'react'
import Searchbar from './components/Searchbar'
import TrendingSection from './components/TrendingSection'
import Tweets from './components/Tweets'
import Summary from './components/Summary'
import { GlobalProvider } from './context/GlobalState'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function App () {
  const [hashTag, setHashTag] = useState('')

  return (
    <GlobalProvider>
      <Searchbar hashTag={hashTag} setHashTag={setHashTag} />
      <div className='flex flex-row mt-4 px-4 space-x-8'>
        <div className='flex-none basis-1/4'>
          <TrendingSection hashTag={hashTag} setHashTag={setHashTag} />
        </div>
        <div className='grow'>
          <Tweets />
        </div>
        <div className='flex-none basis-1/5 justify-self-end'>
          <Summary />
        </div>
      </div>
    </GlobalProvider>
  )
}

export default App
