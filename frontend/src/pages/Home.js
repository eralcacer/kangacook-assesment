import React from "react";
import { AuthData } from "../auth/AuthWrapper";

export default function Home() {
  const { user } = AuthData();
  return <div className="home-comp w-100 blue"></div>;
}
