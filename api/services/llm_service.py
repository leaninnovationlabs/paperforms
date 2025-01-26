import os
from langchain_openai.chat_models import ChatOpenAI

class LlmService:
    def __init__(self):
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

    async def validate_with_llm(self):
        print("-- Validation Step --")
