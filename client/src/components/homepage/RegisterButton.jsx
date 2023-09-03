import React from "react";
import { useNav } from "../../contexts/navigate";

function RegisterButton() {
  const { registerRoute } = useNav();

  return (
    <button
      className="btn btn-lg btn-pink mb-8"
      onClick={() => {
        registerRoute();
      }}
    >
      {" "}
      create an account now{" "}
    </button>
  );
}

export default RegisterButton;
