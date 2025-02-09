An AI pipeline to validate W9 tax forms. Built on the following technologies:

- uv (Project and package management)
- uvicorn / FastAPI (REST API)
- Amazon Textract (Parsing W9 forms)
- OpenAI (Validating text)
- React / Vite (Frontend)

## Setup

To run the API, run:

```
    uv run uvicorn server:app --reload --host 0.0.0.0 --port 8080
```


To run the frontend, run:

```
    cd client
    npm run dev
```