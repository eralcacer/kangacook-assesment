const endpoint = "http://localhost:8000";
export default class RecipesService {
  async getRecipesList(nextPage) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const recipeList = await fetch(
        endpoint + "/recipes/?page=" + nextPage,
        options
      );

      return recipeList.json();
    } catch (e) {
      console.error(e);
      return e.response;
    }
  }

  async getRecipeById(recipeId) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const recipe = await fetch(endpoint + "/recipe/" + recipeId, options);
      return await recipe.json();
    } catch (e) {
      console.error(e);
      return e.response;
    }
  }
}
