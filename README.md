# Paperforms

An AI pipeline to validate all kinds of tax forms. Built on the following technologies:

- uv (Project and package management)
- uvicorn / FastAPI (REST API)
- Amazon Textract (Parsing tax forms)
- OpenAI (Validating text)
- React / Vite (Frontend)

## Setup

First, ensure you have [Python 3.12](https://www.python.org/downloads/) installed.

Next, [install uv](https://docs.astral.sh/uv/getting-started/installation/), a lightweight package manager for Python (we recommend installing it with Homebrew).

Run `uv sync` in the project's root directory. This will build a virtual environment (.venv), as well as install the API's dependencies.

To set up the client, go into the client directory and run `npm install`. This will install both the development server and all of the frontend's dependencies.

## Running the App

To run the API, run:

```
    uv run uvicorn server:app --reload --host 0.0.0.0 --port 8080
```


To run the frontend, run:

```
    cd client
    npm run dev
```

## Gemini integration with paperforms
- How to get Gemini API key? https://aistudio.google.com/apikey
- Pricing https://ai.google.dev/gemini-api/docs/pricing
- Once you generate an API key, set the following variables in your .env
    - GEMINI_API_KEY
    - GEMINI_MODEL_NAME (set this to `gemini-2.0-flash`)
- Run the fastapi as you normally would, and hit the endpoint at `http://localhost:8080/paperforms/v1/ner-extractor`
- See Bruno docs for examples, and expected request payload
    - For w2 form, use `docs/1099-validator/ner-extractor/W2_extract.bru` 
    - For w9 form, use `docs/1099-validator/ner-extractor/W9_extract.bru`
- See `api/sample_dummy_data/` for sample documents of w2 and w9 forms