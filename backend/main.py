from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recipes

app = FastAPI(title="Personalized Recipe Recommender")

# CORS middleware to allow communication between frontend and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in a production environment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipes.router)