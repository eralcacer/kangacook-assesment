import React from "react";
import { AuthData } from "../auth/AuthWrapper";
import RecipesList from "../components/recipes/RecipesList";

export default function Account() {
  const { user } = AuthData();

  return (
    <div className="home-comp w-full blue p-12">
      <h1 className="text-white mb-8 text-3xl font-bold text-center">
        Welcome Back {user.first_name}
      </h1>
      <RecipesList />
    </div>
  );
}
