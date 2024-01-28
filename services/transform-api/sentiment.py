from dotenv import find_dotenv, load_dotenv
from langchain.llms import OpenAI
import key_param
load_dotenv(find_dotenv())
llm = OpenAI(openai_api_key=key_param.openai_api_key, temperature=0)
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

#1 prompt template
template = """
do sentiment analysis on the following text: "{sentiment}" and output the sentiment score. If sentiment is positive output 1, if negative output -1, if neutral output 0. Output sentiment: {sentiment} and if it contains politics, sex or insult, output flagged: 1, else output flagged: 0 in json format.
        """
prompt = PromptTemplate(template=template, input_variables=["sentiment"])
llm_chain = LLMChain(prompt=prompt, llm=llm)
sentiment = " i love it"
response = llm_chain.run({"sentiment": sentiment})
print(response)
