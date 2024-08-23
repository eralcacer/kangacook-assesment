import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../auth/AuthWrapper";
import toast from "react-hot-toast";

export default function SignUp() {
  const { signup, user } = AuthData();
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated, navigate]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserInformation({
      ...userInformation,
      [id]: value,
    });
  };

  const submitSignUp = async () => {
    try {
      if (
        !userInformation.first_name ||
        !userInformation.username ||
        !userInformation.email ||
        !userInformation.password ||
        !userInformation.last_name
      ) {
        toast.error("You must filled up all the inputs.", {
          duration: 4000,
          style: {
            background: "#ff5252",
            color: "#fff",
          },
        });
      }
      await signup(userInformation);
    } catch (e) {
      console.error(e);
    }
  };

  const goSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="w-2/5 m-auto rounded bg-white p-12 h-fit">
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-left mb-2 text-gray-700"
        >
          First Name:
        </label>
        <div className="input w-full">
          <input
            id="first_name"
            className="p-2 border border-blue-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full"
            placeholder="First Name"
            type="text"
            value={userInformation.first_name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-left mb-2 text-gray-700"
        >
          Last Name:
        </label>
        <div className="input w-full">
          <input
            id="last_name"
            className="p-2 border border-blue-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full"
            placeholder="Last Name"
            type="text"
            value={userInformation.last_name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-left mb-2 text-gray-700"
        >
          Username:
        </label>
        <div className="input w-full">
          <input
            id="username"
            className="p-2 border border-blue-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full"
            placeholder="Username"
            type="text"
            value={userInformation.username}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-left mb-2 text-gray-700"
        >
          Email:
        </label>
        <div className="input w-full">
          <input
            id="email"
            className="p-2 border border-blue-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full"
            placeholder="Email"
            type="text"
            value={userInformation.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-left mb-2 text-gray-700"
        >
          Password:
        </label>
        <div className="input w-full">
          <input
            id="password"
            className="p-2 border border-blue-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full"
            placeholder="Password"
            type="password"
            value={userInformation.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button
        onClick={submitSignUp}
        className="w-full mb-8 uppercase bg-white border-solid border-2 border-blue hover:bg-blue-600 text-blue font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Sign Up
      </button>
      <button
        onClick={goSignIn}
        className="w-full uppercase bg-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Sign In
      </button>
    </div>
  );
}
