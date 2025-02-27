const API_URL = "http://localhost:8080"; // TODO: add to environment

export const ocr = async (fields, file) => {
    const body = new FormData();
    body.append("fields", fields);
    body.append("file", file);
    const res = await fetch(`${API_URL}/paperforms/v1/ocr`, {
        method: 'POST',
        body
    })
    return await res.json()
}

export const validate = async (rules, formResponses) => {
    const body = new FormData();
    body.append("rules", rules);
    body.append("form_responses", formResponses || "");
    const res = await fetch(`${API_URL}/paperforms/v1/validator`, {
        method: 'POST',
        body
    })
    return await res.json()
}