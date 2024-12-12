import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { useModal } from "../../context/ModalContext";
import "./MFASetupPage.scss";

export default function MFASetupPage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const { setActiveModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("authToken", token);
    }
    const setupMFA = async () => {
      try {
        if (!email) {
          throw new Error("Email is required to complete MFA setup.");
        }

        const options = await registerUser(email);
        if (options) {
          // If registration is successful
          alert("MFA setup completed successfully!");
          // navigate("/");
          // setActiveModal("login");
        } else {
          // Handle the case where options are null or undefined
          throw new Error("Registration options were not received.");
        }

        // await verifyCredential(email, options);

        alert("MFA setup completed successfully!");
        // navigate("/");
        // setActiveModal("login");
      } catch (error) {
        console.error("MFA setup error:", error);

        setError(
          error.response?.data?.message || error.message || "MFA setup failed"
        );
      } finally {
        setIsLoading(false);
      }
    };

    setupMFA();
  }, [email, token, navigate]);

  if (isLoading) {
    return (
      <div>
        <h1>MFA Setup</h1>
        <p>Setting up your MFA. Please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>MFA Setup</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return null;
}
