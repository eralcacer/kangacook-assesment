import React, { useCallback, useEffect, useState } from "react";
import RecipesService from "../../services/RecipesService";
import CardRecipe from "./CardRecipe";
import toast from "react-hot-toast";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const recipesService = new RecipesService();
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      if (nextPage === Infinity) return;
      const recipeListResp = await recipesService.getRecipesList(nextPage);
      if (recipeListResp.success) {
        setRecipesList((prevRecipes) => [
          ...prevRecipes,
          ...recipeListResp.results,
        ]);
        if (recipeListResp.count / 10 < nextPage + 1) setNextPage(false);
        setNextPage(nextPage + 1);
      } else {
        toast.error("Unable to get list of recipes.", {
          duration: 4000,
          style: {
            background: "#ff5252",
            color: "#fff",
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {recipesList &&
          recipesList.map((recipe) => {
            return <CardRecipe recipeInformation={recipe} />;
          })}
      </div>
      <div className="flex justify-center mt-4">
        {nextPage !== false ? (
          <button
            onClick={getRecipes}
            className="px-4 border-solid py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
          >
            Load More
          </button>
        ) : null}
      </div>
    </>
  );
}
