import os
from langchain_openai.chat_models import ChatOpenAI
from api.util.types import DocumentType
from api.util.prompts import construct_validation_prompt, construct_cleanup_prompt
import json

class LlmService:
    def __init__(self, doc_type, fields, key_values: dict):
        self.openai_key = os.getenv("OPENAI_API_KEY")
        
        self.llm = ChatOpenAI(
            api_key=self.openai_key,
            model="gpt-4o",
            temperature=0,
            max_tokens=1000,
            streaming=True,
            timeout=None,
            max_retries=2
        )
        
        self.doc_type = doc_type
        self.fields = fields
        # self.rules = rules
        self.key_values = key_values
        
    def clean_fields(self):
        print("-- Cleanup Step --")
        prompt = construct_cleanup_prompt(self.fields, self.key_values)
        print(f"Prompt: {prompt}")
        
        response = self.llm.invoke(prompt)
        print(f"Response: {response.content}")
        
        return response.content

    def validate_with_llm(self):
        print("-- Validation Step --")
        prompt = construct_validation_prompt(self.doc_type, self.rules, self.key_values)
        print(f"Prompt: {prompt}")
        
        response = self.llm.invoke(prompt)

        print(f"Response: {response}")
        json_cleaned = response.content.replace('```json', '').replace('```', '')
        json_output = json.loads(json_cleaned)

        return json_output