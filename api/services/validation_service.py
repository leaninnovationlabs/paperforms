import os
from langchain_openai.chat_models import ChatOpenAI
from api.util.prompts import construct_validation_prompt, construct_cleanup_prompt
import json

class ValidationService:
    def __init__(self, doc_type, form_responses, rules):
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
        self.form_responses = form_responses
        self.rules = rules
        
    def validate_with_llm(self):
        print("-- Validation Step --")
        prompt = construct_validation_prompt(self.doc_type, self.rules, self.form_responses)
        print(f"Prompt: {prompt}")
        
        response = self.llm.invoke(prompt)

        print(f"Response: {response}")
        json_cleaned = response.content.replace('```json', '').replace('```', '')
        print("JSON cleaned: " + json_cleaned)
        json_output = json.loads(json_cleaned)

        return json_output