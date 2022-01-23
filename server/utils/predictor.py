from fastai import *
from fastai.text import *
from utils.transformer_models import CustomTransformerModel,TransformerBaseTokenizer,TransformerVocab
import string
pad_idx=1

class Predictor():
  learner = None

  def getPrediction(self,tweet):
    tweet=self.__clean_tweet(tweet)
    preds = self.learner.predict(tweet)
    sentiment=str(preds[0])
    score = round(preds[2][1].item(),2)
    if(score>=0.4 and score<=0.6):
        sentiment="NUE"
    return (sentiment,score)

  def __clean_tweet(self,text):
    # Remove non text
    text = self.__remove_URL(text)
    text = self.__remove_HTML(text)
    text = self.__remove_not_ASCII(text)

    # Lower text, replace abbreviations
    text = text.lower()
    # text = replace_abbrev(text)
    text = self.__remove_mention(text)
    text = self.__remove_hashtag(text)
    text = self.__remove_number(text)
    text=  self.__remove_underscore(text)

    # Remove emojis / smileys
    text = self.__remove_emoji(text)
    text = self.__transcription_sad(text)
    text = self.__transcription_smile(text)
    text = self.__transcription_heart(text)
    text = self.__remove_repeat_punct(text)
    text = self.__remove_all_punct(text)
    text = self.__remove_elongated_words(text)
    return text

  def __remove_emoji(self,text):
    emoji_pattern = re.compile("["
                           u"\U0001F600-\U0001F64F"  # emoticons
                           u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                           u"\U0001F680-\U0001F6FF"  # transport & map symbols
                           u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           u"\U00002702-\U000027B0"
                           u"\U000024C2-\U0001F251"
                           "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'xxxemoji', text)

  def __remove_all_punct(self,text):
      table = str.maketrans('','',string.punctuation)
      return text.translate(table)

  def __remove_hashtag(self,text):
      hasht=re.compile(r'#')
      return hasht.sub('xxxhash_',text)

  def __remove_underscore(self,text):
      at=re.compile('_')
      return ' '.join(at.split(text))

  def __remove_mention(self,text):
      at=re.compile(r'@\S+')
      return at.sub(r'xxxuser',text)

  def __remove_HTML(self,text):
      html=re.compile(r'<.*?>')
      return html.sub(r'',text)

  def __remove_number(self,text):
      num = re.compile(r'[-+]?[.\d]*[\d]+[:,.\d]*')
      return num.sub(r'_xxxnumber_', text)

  def __remove_URL(self,text):
      url = re.compile(r'https?://\S+|www\.\S+')
      return url.sub(r'xxxurl',text)

  def __remove_repeat_punct(self,text):
      def _replace_rep_punct(m):
          c,cc = m.groups()
          return f' xxxrepeat {c}'
      rep = re.compile(r'([!?.])(\1{2,})')
      return rep.sub(_replace_rep_punct, text)

  def __remove_elongated_words(self,text):
      rep = re.compile(r'\b(\S*?)([a-z])\2{2,}\b')
      return rep.sub(r'\1\2 xxxelong', text)

  def __remove_not_ASCII(self,text):
      text = ''.join([word for word in text if word in string.printable])
      return text

  def __transcription_smile(self,text):
      eyes = "[8:=;]"
      nose = "['`\-]"
      smiley = re.compile(r'[8:=;][\'\-]?[)dDp]')
      #smiley = re.compile(r'#{eyes}#{nose}[)d]+|[)d]+#{nose}#{eyes}/i')
      return smiley.sub(r'xxxsmile', text)

  def __transcription_sad(self,text):
      eyes = "[8:=;]"
      nose = "['`\-]"
      smiley = re.compile(r'[8:=;][\'\-]?[(\\/]')
      return smiley.sub(r'xxxsadface', text)

  def __transcription_heart(self,text):
      heart = re.compile(r'<3')
      return heart.sub(r'xxxheart', text)

tweet_predictor = Predictor()

def launch_learner(predictor):
  predictor.learner = load_learner('/app/server/cloudshare/artifacts', 'transformer.pkl')
