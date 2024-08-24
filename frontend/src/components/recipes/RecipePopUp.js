import React, { useEffect, useState } from "react";
import RecipesService from "../../services/RecipesService";
import toast from "react-hot-toast";

export default function RecipePopUp({ recipeId, onClose }) {
  const [recipeInformation, setRecipeInformation] = useState();
  const recipesService = new RecipesService();

  useEffect(() => {
    queryRecipeInfo();
  }, [recipeId]);

  const queryRecipeInfo = async () => {
    try {
      const recipeResp = await recipesService.getRecipeById(recipeId);
      setRecipeInformation(recipeResp.recipe);
    } catch (e) {
      console.error(e);
      toast.error("Unable to load recipe", {
        duration: 4000,
        style: {
          background: "#ff5252",
          color: "#fff",
        },
      });
      onClose();
    }
  };

  const imageUrl = recipeInformation
    ? `http://localhost:8000${recipeInformation.image}`
    : null;

  return (
    <>
      {recipeInformation ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-4">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-blue hover:text-gray-300 text-4xl z-10"
            >
              &times;
            </button>
            <img
              src={imageUrl}
              alt={recipeInformation.title}
              className="w-full max-h-60 object-cover rounded"
            />
            <div className="mt-4">
              <h1 className="text-xl font-semibold">
                {recipeInformation.title}
              </h1>
              <p className="mt-2 text-gray-700">
                {recipeInformation.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
