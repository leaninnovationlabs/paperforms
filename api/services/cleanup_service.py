import os
from langchain_openai.chat_models import ChatOpenAI
from api.util.types import DocumentType
from api.util.prompts import construct_validation_prompt, construct_cleanup_prompt
import re

class CleanupService:
    def __init__(self, doc_type, key_values: dict, fields):
        self.openai_key = os.getenv("OPENAI_API_KEY")
        if not self.openai_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        
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
        self.key_values = key_values
        
    def clean_fields(self):
        print("-- Cleanup Step --")
        prompt = construct_cleanup_prompt(self.fields, self.key_values)
        print(f"Prompt: {prompt}")
        
        response = self.llm.invoke(prompt)
        print(f"Response: {response.content}")
        
        trimmed_content = re.sub(r'(\d)\s+-\s+(\d)', r'\1-\2', response.content)
        return trimmed_content
