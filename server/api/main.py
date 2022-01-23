from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import utils.tweets as tweets
from utils.predictor import tweet_predictor,launch_learner
import logging
log = logging.getLogger("uvicorn")

app = FastAPI()

@app.on_event("startup")
def load_model():
  launch_learner(tweet_predictor)
  log.info("learner_init")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
def add_tweepy(request:Request,call_next):
  request.state.api = tweets.initializeTweepy()
  response = call_next(request)
  return response


@app.get('/{name}')
def index(name: str):
  return {"content":f"Hello {name} from FastAPI"}

@app.get('/api/tweets')
def getTweets(trend:str,request:Request):
  result = tweets.getTweets(request.state.api,trend)
  response=[]
  for tweet in result:
    temp={ "id":tweet.id , "text":tweet.full_text, "username":tweet.user.screen_name }
    temp["prediction"],temp["score"]=tweet_predictor.getPrediction(tweet.full_text)
    response.append(temp)
  return {"content": response}

@app.get('/api/trending')
def getTrending(request:Request):
  trending=[]
  trends_result = tweets.getTrending(request.state.api)
  for trend in trends_result[0]['trends']:
        if(trend['tweet_volume']):
            if(trend['name'][0]=='#'):
                trending.append((trend['tweet_volume'],trend['name'][1:]))
            else:
                trending.append((trend['tweet_volume'],trend['name']))
  trending.sort(reverse=True)
  payload=[]
  for i in range(len(trending)):
      temp={}
      temp['tweet_volume'],temp['trend_name']=trending[i]
      payload.append(temp)
  return {"results": payload}