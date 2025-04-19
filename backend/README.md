# Backend Setup Instructions

## 1. Install Dependencies

Navigate to the backend directory in your terminal and run the following command:

```bash
pip install -r requirements.txt
```

## 2. Set Up Environment Variables

1. Obtain a Google Gemini API key from the [Google AI Studio](https://makersuite.google.com/app/apikey).
2. Create a `.env` file in the backend directory based on `.env.example`.
3. Replace `YOUR_GEMINI_API_KEY` in the `.env` file with your actual API key.

## 3. Run the Backend

Navigate to the backend directory in your terminal and run:

```bash
uvicorn main:app --reload
```

You should see the FastAPI application start. Access the Swagger UI at:

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
