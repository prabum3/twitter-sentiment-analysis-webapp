from fastai import *
import torch.nn as nn
from fastai.text import *
from transformers import PreTrainedModel, PreTrainedTokenizer, PretrainedConfig
from transformers import RobertaForSequenceClassification, RobertaTokenizer, RobertaConfig
pad_idx=1

class CustomTransformerModel(nn.Module):
  def __init__(self, transformer_model: PreTrainedModel):
    super(CustomTransformerModel,self).__init__()
    self.transformer = transformer_model

  def forward(self, input_ids, attention_mask=None):
    attention_mask = (input_ids!=pad_idx).type(input_ids.type())
    logits = self.transformer(input_ids,
                              attention_mask = attention_mask)[0]
    return logits

class TransformerBaseTokenizer(BaseTokenizer):
  def __init__(self,pretrained_tokenizer,model_type='roberta',**kwargs):
    self._pretrained_tokenizer=pretrained_tokenizer
    self.model_type=model_type
    self.max_seq_len=pretrained_tokenizer.max_len
  def __call__(self,*args,**kwargs):
    return self
  def __name__(self,*args,**kwargs):
    return "TranformerBaseTokenizer!"
  def tokenizer(self,t):
    CLS=self._pretrained_tokenizer.cls_token
    SEP=self._pretrained_tokenizer.sep_token
    tokens=self._pretrained_tokenizer.tokenize(t,add_prefix_space=True,)[:self.max_seq_len-2]
    tokens=[CLS] + tokens + [SEP]
    return tokens

class TransformerVocab(Vocab):
  def __init__(self,tokenizer:PreTrainedTokenizer):
    super(TransformerVocab,self).__init__(itos=[])
    self._tokenizer=tokenizer

  def numericalize(self,t):
    return self._tokenizer.convert_tokens_to_ids(t)

  def textify(self,nums,sep=' '):
    nums=np.array(nums).tolist()
    return sep.join(self._tokenizer.convert_ids_to_tokens(nums)) if sep is not None else  self._tokenizer.convert_ids_to_tokens(nums)

  def __getstate__(self):
    return {'itos':self.itos,'tokenizer':self._tokenizer}

  def __setstate__(self,state):
    self.itos=state['itos']
    self._tokenizer=state['tokenizer']
    self.stoi=collections.defaultdict(int,{v:k for k,v in enumerate(self.itos)})
    return

def launch_learner():
  learner=load_learner('./server/artifacts/','transformer2.pkl')
  return learner