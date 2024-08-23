import React from "react";

import Logo from "../../assets/logo.png";

export default function RenderHeader() {
  return (
    <header className="header m-auto py-4 bg-blue">
      <div className="">
        <img className="m-auto w-16" src={Logo} alt="Kangacook logo" />
      </div>
    </header>
  );
}
