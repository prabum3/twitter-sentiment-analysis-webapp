import tweepy
from dotenv import load_dotenv
import os

load_dotenv()

os.getenv("MONGODB_URL", "")

ACCESS_KEY=os.getenv("ACCESS_KEY", "")
ACCESS_SECRET=os.getenv("ACCESS_SECRET", "")
CONSUMER_KEY=os.getenv("CONSUMER_KEY", "")
CONSUMER_SECRET_KEY=os.getenv("CONSUMER_SECRET_KEY", "")

def initializeTweepy():
  auth = tweepy.OAuthHandler(CONSUMER_KEY,CONSUMER_SECRET_KEY)
  auth.set_access_token(ACCESS_KEY,ACCESS_SECRET)
  api = tweepy.API(auth, wait_on_rate_limit=True,wait_on_rate_limit_notify=True)
  return api

def getTweets(api, keyword):
  payload = tweepy.Cursor(api.search,q=keyword+" -filter:retweets",lang="en",rpp=5,tweet_mode="extended").items(50)
  return payload

def getTrending(api):
  # 23424848 is the region code for India
  trends_result = api.trends_place(23424848)
  return trends_result




