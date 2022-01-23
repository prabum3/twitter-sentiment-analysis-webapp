import {
  GET_TWEETS,
  GET_TRENDING,
  TWEETS_LOADING,
  TRENDS_LOADING,
  FILTER_POS,
  FILTER_NUE,
  FILTER_NEG,
  FILTER_CLEAR
} from './actions'

function AppReducer (state, action) {
  switch (action.type) {
    case GET_TWEETS:
      return {
        ...state,
        tweets: [...action.payload.content],
        showTweets: [...action.payload.content],
        pos: action.payload.pos,
        neg: action.payload.neg,
        nue: action.payload.nue,
        tweetsLoading: false
      }
    case GET_TRENDING:
      return {
        ...state,
        trending: [...action.payload.results],
        trendsLoading: false
      }
    case TWEETS_LOADING:
      return {
        ...state,
        tweetsLoading: true
      }
    case TRENDS_LOADING:
      return {
        ...state,
        trendsLoading: true
      }
    case FILTER_POS:
      return {
        ...state,
        showTweets: state.tweets.filter((tweet) => tweet.prediction === 'POS'),
        isFiltered: true
      }
    case FILTER_NUE:
      return {
        ...state,
        showTweets: state.tweets.filter((tweet) => tweet.prediction === 'NUE'),
        isFiltered: true
      }
    case FILTER_NEG:
      return {
        ...state,
        showTweets: state.tweets.filter((tweet) => tweet.prediction === 'NEG'),
        isFiltered: true
      }
    case FILTER_CLEAR:
      return {
        ...state,
        showTweets: state.tweets,
        isFiltered: false
      }
    default:
      return state
  }
}

export default AppReducer
