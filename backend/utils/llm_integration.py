import os
from typing import List, Optional
from dotenv import load_dotenv
import google.generativeai as genai
import json

# Load environment variables from .env file
load_dotenv()

# Load API key from environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable not set")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')


async def generate_recipe_recommendation(dietary_restrictions: Optional[List[str]] = None,
                                         available_ingredients: Optional[List[str]] = None):
    prompt = f"""
    Generate a list of up to 5 recipe recommendations in JSON format. Use the following structure:
    [
      {{
        "recipe_name": "Recipe Name",
        "description": "A brief description",
        "ingredients": [
          "Ingredient 1 (Provided)",
          "Ingredient 2",
          "Ingredient 3 (Provided)",
          ...
        ],
        "instructions": "Step-by-step instructions...",
        "substitutions_and_tips": "Potential ingredient substitutions or cooking tips..."
      }},
      ...
    ]
    
    Clearly indicate which ingredients are from the provided available_ingredients.
    
    Dietary Restrictions: {', '.join(dietary_restrictions) if dietary_restrictions else "None"}
    Available Ingredients: {', '.join(available_ingredients) if available_ingredients else "None"}
    
    Return ONLY valid JSON without any markdown formatting or text outside the JSON array. Do not wrap your response in code blocks or backticks.
    """

    try:
        response = model.generate_content(prompt)
        response_text = response.text

        # Clean the response in case the model still includes markdown formatting
        if response_text.startswith("```"):
            # Extract content between markdown code blocks if present
            import re
            match = re.search(r"```(?:json)?\n([\s\S]*?)\n```", response_text)
            if match:
                response_text = match.group(1)

        # Validate that it's proper JSON before returning
        try:
            json.loads(response_text)  # Test if it's valid JSON
            return response_text
        except json.JSONDecodeError:
            raise Exception("Model returned invalid JSON format")

    except Exception as e:
        raise Exception(f"Error generating recipe recommendation: {e}")
