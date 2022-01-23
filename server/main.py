import uvicorn
from utils.transformer_models import CustomTransformerModel,TransformerBaseTokenizer,TransformerVocab

if __name__=="__main__":
    uvicorn.run("api.main:app",host='0.0.0.0', port=8000, reload=True, debug=True)