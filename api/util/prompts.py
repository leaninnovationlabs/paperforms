def construct_validation_prompt(doc_type, rules: str, key_values: dict) -> str:    
    initial_task = f"Given a {doc_type} tax form and a list of validation rules written in plain English, provide a list of required changes to the document, written only in JSON. Do not send back any response that is not JSON. Only send back errors that can be found in the list of rules, do not extrapolate. If there are no errors, send back an empty object. The {doc_type} form will be given as a set of question-answer pairs, with the following example structure:\n"
    example_input="```[{'Full name': 'John Doe'}, {'Social security number': '555-55-5555'}]```\n\n"
    desired_output = f"The output should also be a set of key-value pairs in JSON format. The key should be the name of the field as it appears in the {doc_type} form. The value should be the required change based on the validation rules, sticking as closely to the language in the rules as possible.\n"
    example_output = "Here is an example of a valid output:\n ```[{'Date': 'Date must be in MM/DD/YYYY format'}, {'Social security number': 'Social security number cannot be blank'}]```\n\n"
    key_values = f"Here is the list of key-value pairs: \n{key_values}\n\n"
    rules_section = f"Here is the list of rules: \n{rules}"
    
    prompt = f"{initial_task}{example_input}{desired_output}{example_output}{key_values}{rules_section}"
    return prompt