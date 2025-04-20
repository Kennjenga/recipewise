"use client";
import React, { useState } from "react";
import { Utensils, ChefHat, Leaf, Plus, X } from "lucide-react";

interface Recipe {
  recipe_name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  substitutions_and_tips: string;
}

const Home = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [customRestriction, setCustomRestriction] = useState("");
  const [availableIngredients, setAvailableIngredients] = useState<string[]>(
    []
  );
  const [ingredientInput, setIngredientInput] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeRecipe, setActiveRecipe] = useState<string | null>(null);

  const handleRestrictionChange = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(
        dietaryRestrictions.filter((r) => r !== restriction)
      );
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  };

  const handleAddCustomRestriction = () => {
    if (
      customRestriction.trim() &&
      !dietaryRestrictions.includes(customRestriction.trim())
    ) {
      setDietaryRestrictions([
        ...dietaryRestrictions,
        customRestriction.trim(),
      ]);
      setCustomRestriction("");
    }
  };

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientInput(e.target.value);
  };

  const handleAddIngredient = () => {
    if (
      ingredientInput.trim() &&
      !availableIngredients.includes(ingredientInput.trim())
    ) {
      setAvailableIngredients([
        ...availableIngredients,
        ingredientInput.trim(),
      ]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setAvailableIngredients(
      availableIngredients.filter((ing) => ing !== ingredient)
    );
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      // Add a small delay to showcase the animation (remove in production)
      if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/recipes/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dietary_restrictions:
              dietaryRestrictions.length > 0 ? dietaryRestrictions : null,
            available_ingredients:
              availableIngredients.length > 0 ? availableIngredients : null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch recipes");
      }

      const data = await response.json();
      if (data && Array.isArray(data.recommendations)) {
        setRecipes(data.recommendations);
      } else {
        setError(
          "Invalid response format: 'recommendations' array is missing or not an array."
        );
        setRecipes([]);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleRecipeDetails = (recipeName: string) => {
    setActiveRecipe(activeRecipe === recipeName ? null : recipeName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-yellow-50 py-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-4xl w-full p-8 bg-white rounded-xl shadow-2xl">
        <div className="flex items-center justify-center mb-6 text-purple-600">
          <ChefHat className="w-10 h-10 mr-3" />
          <h1 className="text-4xl font-bold">Recipe Wizard</h1>
        </div>

        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Get personalized recipe recommendations based on your dietary needs
          and what&apos;s in your pantry. Our magical AI chef will whip up
          perfect suggestions just for you!
        </p>

        {/* Dietary Restrictions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Leaf className="w-6 h-6 mr-2 text-green-500" />
            Dietary Restrictions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {[
              "Gluten Free",
              "Vegan",
              "Vegetarian",
              "Nut Free",
              "Dairy Free",
              "Shellfish Free",
              "Egg Free",
              "Soy Free",
              "Pescatarian",
            ].map((restriction) => (
              <label
                key={restriction}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                            ${
                              dietaryRestrictions.includes(restriction)
                                ? "bg-purple-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
              >
                <input
                  type="checkbox"
                  className="mr-2 h-5 w-5 rounded text-purple-500 focus:ring-purple-500"
                  checked={dietaryRestrictions.includes(restriction)}
                  onChange={() => handleRestrictionChange(restriction)}
                />
                {restriction}
              </label>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              placeholder="Add custom restriction (e.g., low sodium)"
              value={customRestriction}
              onChange={(e) => setCustomRestriction(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCustomRestriction();
              }}
            />
            <button
              onClick={handleAddCustomRestriction}
              className="px-6 py-2 rounded-r-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" /> Add
            </button>
          </div>
        </div>

        {/* Available Ingredients */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Utensils className="w-6 h-6 mr-2 text-purple-500" />
            Available Ingredients
          </h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              placeholder="What's in your pantry? (e.g., chicken, tomatoes, pasta)"
              value={ingredientInput}
              onChange={handleIngredientInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddIngredient();
              }}
            />
            <button
              onClick={handleAddIngredient}
              className="px-6 py-2 rounded-r-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" /> Add
            </button>
          </div>
          {availableIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-green-50 rounded-lg">
              {availableIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-1 text-sm font-medium text-gray-800
                             shadow-sm border border-yellow-200"
                >
                  {ingredient}
                  <button
                    type="button"
                    className="ml-2 h-6 w-6 rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-700
                               focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={() => handleRemoveIngredient(ingredient)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={fetchRecipes}
          className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
                     hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              {/* Cooking Animation */}
              <div className="relative w-24 h-24 mb-4">
                {/* Pot */}
                <div className="absolute bottom-0 w-full h-16 bg-gray-700 rounded-b-full overflow-hidden">
                  {/* Steam animations */}
                  <div className="absolute left-4 bottom-full">
                    <div className="w-2 h-8 bg-white rounded-full opacity-70 animate-steam-1"></div>
                  </div>
                  <div className="absolute left-10 bottom-full">
                    <div className="w-2 h-8 bg-white rounded-full opacity-70 animate-steam-2"></div>
                  </div>
                  <div className="absolute right-6 bottom-full">
                    <div className="w-2 h-8 bg-white rounded-full opacity-70 animate-steam-3"></div>
                  </div>

                  {/* Soup/contents */}
                  <div className="absolute bottom-0 w-full h-12 bg-orange-300 overflow-hidden">
                    {/* Bubbling effect */}
                    <div className="absolute left-3 top-2 w-3 h-3 bg-orange-200 rounded-full animate-bubble-1"></div>
                    <div className="absolute left-12 top-5 w-2 h-2 bg-orange-200 rounded-full animate-bubble-2"></div>
                    <div className="absolute right-5 top-3 w-4 h-4 bg-orange-200 rounded-full animate-bubble-3"></div>
                  </div>
                </div>

                {/* Pot handles */}
                <div className="absolute left-0 top-6 w-2 h-8 bg-gray-500 rounded-l-full"></div>
                <div className="absolute right-0 top-6 w-2 h-8 bg-gray-500 rounded-r-full"></div>

                {/* Pot lid */}
                <div className="absolute top-0 left-2 right-2 h-4 bg-gray-600 rounded-t-full"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
              <p className="text-white font-medium">
                Creating Your Magic Menu...
              </p>
            </div>
          ) : (
            "Cook Up Some Suggestions!"
          )}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 mr-2 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
              <ChefHat className="w-8 h-8 mr-2 text-purple-500" />
              Your Personalized Recipes
            </h2>
            <div className="space-y-6">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md
                             transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
                >
                  <div
                    className="p-5 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleRecipeDetails(recipe.recipe_name)}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {recipe.recipe_name}
                      </h3>
                      <p className="text-gray-600 mt-1">{recipe.description}</p>
                    </div>
                    <button
                      className={`p-2 rounded-full transition-colors duration-300
                                  ${
                                    activeRecipe === recipe.recipe_name
                                      ? "bg-purple-600 text-white hover:bg-purple-700"
                                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                                  }`}
                    >
                      {activeRecipe === recipe.recipe_name ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <Plus className="h-6 w-6" />
                      )}
                    </button>
                  </div>

                  {activeRecipe === recipe.recipe_name && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-purple-500 uppercase tracking-wider mb-3">
                          Ingredients
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 text-gray-700">
                          {recipe.ingredients.map((ingredient, i) => (
                            <li key={i} className="flex items-center">
                              <span className="w-3 h-3 rounded-full bg-orange-400 mr-2"></span>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-purple-500 uppercase tracking-wider mb-3">
                          Instructions
                        </h4>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {recipe.instructions}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-500 uppercase tracking-wider mb-3">
                          Tips & Substitutions
                        </h4>
                        <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          {recipe.substitutions_and_tips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          Recipe Wizard © {new Date().getFullYear()} • Delicious AI-Powered
          Recommendations
        </p>
      </footer>
    </div>
  );
};

export default Home;
