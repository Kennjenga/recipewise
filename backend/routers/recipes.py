import json
from fastapi import APIRouter, HTTPException
from models.recipe_request import RecipeRequest
from utils.llm_integration import generate_recipe_recommendation

router = APIRouter(prefix="/recipes", tags=["Recipes"])


@router.post("/recommend")
async def recommend_recipes(request_data: RecipeRequest):
    try:
        recommendation = await generate_recipe_recommendation(
            dietary_restrictions=request_data.dietary_restrictions,
            available_ingredients=request_data.available_ingredients
        )

        # Return raw JSON data instead of wrapping it in a string
        try:
            parsed_recommendation = json.loads(recommendation)
            return {"recommendations": parsed_recommendation}
        except json.JSONDecodeError:
            # Fallback to returning as string if parsing fails
            return {"recommendations": recommendation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
