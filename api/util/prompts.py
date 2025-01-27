from api.util.types import DocumentType
from api.util.rules import RulesUtil

def construct_validation_prompt(doc_type, key_values: dict) -> str:
    # Role, Task, Requirements, Instructions
    if (doc_type == DocumentType.W2):
        rules = RulesUtil.get_w2_rules()
    
    if (doc_type == DocumentType.W9):
        rules = RulesUtil.get_w9_rules()
    
    initial_task = "Provide a list of necessary changes to the following form (which is presented as a set of key-value pairs), based on the list of rules which follows. Present your list as a JSON object with the following structure: \n"
    desired_output = "``` { form_label: necessary_change } ```\n\n"
    example_output = "For example, ``` { 'Date': 'Date must be in MM/DD/YYYY format' } ```\n\n"
    key_values = f"Here is the list of key-value pairs: \n{key_values}\n\n"
    rules = f"Here is the list of rules: \n{rules}"
    
    prompt = f"{initial_task}{desired_output}{example_output}{key_values}{rules}"
    return prompt