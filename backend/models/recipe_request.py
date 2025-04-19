from typing import List, Optional
from pydantic import BaseModel


class RecipeRequest(BaseModel):
    dietary_restrictions: Optional[List[str]] = None
    available_ingredients: Optional[List[str]] = None
