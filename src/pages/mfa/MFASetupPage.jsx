import React, { useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import "./MFASetupPage.scss";
import { AuthContext } from "../../context/AuthContext";

export default function MFASetupPage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const setupMFA = async () => {
    try {
      if (!email) {
        throw new Error("Email is required to complete MFA setup.");
      }

      await registerUser(email);

      login(token);
      setSuccess("Login Successful! Bringing you to your dashboard...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("MFA setup error:", error);

      setError(
        error.response?.data?.message || error.message || "MFA setup failed"
      );
    }
  };

  return (
    <div className="mfa">
      <div className="mfa__overlay"></div>
      <div className="mfa__modal">
        {!success && (
          <h1 className="mfa__header">Mult-factor Authentication</h1>
        )}

        {!error && !success && (
          <>
            <p className="mfa__text">
              Click below to set up authentication options
            </p>
            <button onClick={setupMFA} className="mfa__btn">
              Start
            </button>
          </>
        )}
        {error && (
          <>
            <p className="mfa__error">{error}</p>
            <button className="mfa__btn" onClick={() => setError(null)}>
              Retry
            </button>
          </>
        )}
      </div>
      {success && <div className="mfa__success">{success}</div>}
    </div>
  );
}
