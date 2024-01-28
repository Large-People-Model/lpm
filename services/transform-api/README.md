# Install

1. Install the libs:
```
pip3 install --upgrade --quiet  langchain-openai tiktoken chromadb langchain
```

2. Set the credentials:
```
OPENAI_API_KEY = "xx"
MONGO_URI = "mongodb+srv://lpm:<pwd>@<host>.mongodb.net/?retryWrites=true&w=majority"
```
3. Do sentiment analysis using langchain and OpenAI:
```
python3 sentiment.py

```

4. Load into MongoDB:
```
python3 load_data.py
```

5. Extract from MongoDB:
```
python3 extract_information.py
```
