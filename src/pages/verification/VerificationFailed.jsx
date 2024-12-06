import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerificationFailed() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Verification Failed</h1>
      <p>We could not verify your email. Please try again.</p>
      <button onClick={() => navigate("/signup")}>Go to Signup</button>
    </div>
  );
}
