import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerificationSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Email Verified!</h1>
      <p>Your email has been successfully verified.</p>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
}
