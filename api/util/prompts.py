def construct_cleanup_prompt(fields: str, key_values: dict) -> str:
    return f"""
    You are a helpful assistant responsible for cleaning up a series of key value pairs. Remove any keys that are not found in the list of fields. Also simplify the field names in the key value pairs to match the names used in the fields string Return the result as a bulleted list of fields with their corresponsing responses. Offer no introduction or explanation.

    Here is the list of key-value pairs: {key_values}

    Here is the list of field names: {fields}
    """

def construct_validation_prompt(doc_type, rules: str, form_responses: str) -> str:    
    return f"""
    You are a helpful assistant responsible for validating a {doc_type} tax form with a given set of rules. Using the form responses and rules, provide a list of required changes to the document, written only in JSON, using double quotes. Do not send back any response that is not JSON. **Only send back errors found in the list of rules!** If there are no errors, send back an empty object. The {doc_type} form will be given as a set of question-answer pairs, with the following example structure:
    ```[{'Full name': 'John Doe'}, {'Date': '6/1/2024'}]```

    Here is an example of a valid output:\n ```[{'Date': 'Date must be in MM/DD/YYYY format'}, {'Social security number': 'Social security number cannot be blank'}]```

    Here is the list of form responses: \n{form_responses}

    Here is the list of rules: \n{rules}
    """
