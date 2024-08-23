import React, { useEffect } from "react";
import { AuthData } from "../auth/AuthWrapper";
import { useNavigate } from "react-router-dom";
import RecipesList from "../components/recipes/RecipesList";

export default function Home() {
  const { user } = AuthData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/account");
    }
  }, [user.isAuthenticated, navigate]);
  return <div className="home-comp w-full blue"></div>;
}
