def construct_cleanup_prompt(fields: str, key_values: dict) -> str:
    initial_task = """You are cleaning up extracted form field data. Your task is to:
1. Remove any keys not found in the provided list of fields
2. Standardize field names to match exactly those in the fields list
3. Return a clean, bulleted list of fields with their corresponding values
4. Provide no introduction or explanation in your response"""

    key_value_input = f"""
INPUT KEY-VALUE PAIRS:
{key_values}"""

    fields_input = f"""
VALID FIELD NAMES:
{fields}"""
    
    prompt = f"{initial_task}\n{key_value_input}\n{fields_input}"
    return prompt

def construct_validation_prompt(doc_type, rules: str, form_responses: str) -> str:    
    initial_task = f"""You are validating a {doc_type} tax form against specific rules. Your task is to:
1. Analyze the form responses
2. Check if they comply with the provided rules
3. For the fields that do not comply, return ONLY the validation errors in JSON format

Return an empty array [] if no errors are found. Only report errors that violate the rules provided.

Note: The examples below are for illustrative purposes only. Generate validation outputs based solely on the actual form responses and rules provided."""

    example_section = f"""
Example form responses:
```
[{{"Full name": "John Doe"}}, {{"Date": "6/1/2024"}}]
```

Example validation output (when errors are found):
```json
[
  {{"Date": "Date must be in MM/DD/YYYY format"}},
  {{"Social security number": "Social security number cannot be blank"}}
]
```

Example validation output (when no errors are found):
```json
[]
```"""

    form_responses_section = f"""
FORM RESPONSES:
{form_responses}"""

    rules_section = f"""
VALIDATION RULES:
{rules}"""
    
    prompt = f"{initial_task}\n{example_section}\n{form_responses_section}\n{rules_section}"
    return prompt
