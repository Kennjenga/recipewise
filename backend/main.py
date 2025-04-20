import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recipes
from dotenv import load_dotenv  # Import load_dotenv

load_dotenv()  # Load variables from .env file

app = FastAPI(title="Personalized Recipe Recommender")

# Get CORS origins from the environment variable
cors_origins_str = os.environ.get(
    "CORS_ORIGINS", "http://localhost:3000")  # Default if not set
cors_origins = [origin.strip()
                for origin in cors_origins_str.split(",")]  # split

# CORS middleware to allow communication between frontend and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipes.router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
