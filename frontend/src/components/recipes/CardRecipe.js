import React, { useState } from "react";
import RecipePopUp from "./RecipePopUp";

export default function CardRecipe({ recipeInformation }) {
  const [openRecipeView, setOpenRecipeView] = useState(false);

  const imageUrl = `http://localhost:8000${recipeInformation.image}`;
  const openPopUp = () => {
    setOpenRecipeView(true);
  };
  const closePopUp = () => {
    setOpenRecipeView(false);
  };

  return (
    <>
      {openRecipeView && (
        <RecipePopUp recipeId={recipeInformation.id} onClose={closePopUp} />
      )}
      <div
        onClick={openPopUp}
        className="cursor-pointer flex flex-col bg-white w-200 rounded-md overflow-hidden shadow-md"
      >
        {recipeInformation.image && (
          <img
            src={imageUrl}
            alt={recipeInformation.title}
            className="w-full h-auto object-cover max-h-24"
          />
        )}
        <div className="flex flex-col justify-between p-4 flex-1">
          <h1 className="text-xl font-semibold mb-2">
            {recipeInformation.title}
          </h1>
          <p>{recipeInformation.description}</p>
        </div>
      </div>
    </>
  );
}
