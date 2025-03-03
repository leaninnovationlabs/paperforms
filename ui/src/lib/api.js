const API_URL = "http://localhost:8080"; // TODO: add to environment

export const ocr = async (fields, file, formType) => {
    const body = new FormData();
    body.append("fields", fields);
    body.append("file", file);
    body.append("form_type", formType);
    const res = await fetch(`${API_URL}/paperforms/v1/ocr`, {
        method: 'POST',
        body
    })
    return await res.json()
}

export const validate = async (rules, formResponses, formType) => {
    const body = new FormData();
    body.append("rules", rules);
    body.append("form_responses", formResponses || "");
    body.append("form_type", formType);
    const res = await fetch(`${API_URL}/paperforms/v1/validator`, {
        method: 'POST',
        body
    })
    return await res.json()
}