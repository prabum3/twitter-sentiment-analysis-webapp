import React, { createContext, useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  GET_TWEETS,
  GET_TRENDING,
  TWEETS_LOADING,
  TRENDS_LOADING,
  FILTER_CLEAR,
  FILTER_NEG,
  FILTER_POS,
  FILTER_NUE
} from './actions'
import AppReducer from './AppReducer'

const initialState = {
  tweets: [],
  showTweets: [],
  trending: [],
  tweetsLoading: false,
  trendsLoading: false,
  isFiltered: false
}

export const GlobalContext = createContext(initialState)

export function GlobalProvider ({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getTweets = async (hashtag) => {
    dispatch({ type: TWEETS_LOADING })
    try {
      const tweetResponse = await axios.get(`/api/tweets?trend=${hashtag}`)
      dispatch({
        type: GET_TWEETS,
        payload: tweetResponse.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getTrending = async () => {
    dispatch({ type: TRENDS_LOADING })
    try {
      const trendingResponse = await axios.get('/api/trending')
      dispatch({
        type: GET_TRENDING,
        payload: trendingResponse.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  const filterTweets = (category) => {
    switch (category) {
      case 'POS':
        dispatch({ type: FILTER_POS })
        break
      case 'NUE':
        dispatch({ type: FILTER_NUE })
        break
      case 'NEG':
        dispatch({ type: FILTER_NEG })
        break
      default:
        dispatch({ type: FILTER_CLEAR })
    }
  }

  const clearFilter = () => {
    dispatch({ type: FILTER_CLEAR })
  }

  const value = useMemo(() => ({
    tweets: state.tweets,
    showTweets: state.showTweets,
    isFiltered: state.isFiltered,
    trending: state.trending,
    tweetsLoading: state.tweetsLoading,
    trendsLoading: state.trendsLoading,
    getTweets,
    getTrending,
    filterTweets,
    clearFilter
  }), [state.tweets, state.showTweets, state.isFiltered, state.trending, state.tweetsLoading, state.trendsLoading])

  return (
    <GlobalContext.Provider
      value={value}
    >
      {children}
    </GlobalContext.Provider>
  )
}

GlobalProvider.propTypes = {
  children: PropTypes.element
}
