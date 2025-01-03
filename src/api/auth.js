import axios from "./axios";
import { client } from "@passwordless-id/webauthn";

export const signupUser = async (userData) => {
  const response = await axios.post("/auth/signup", userData);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (email) => {
  try {
    const { data } = await axios.post("/auth/challenge", {
      email,
    });

    const challenge = data.challenge;

    const registration = await client.register({
      user: email,
      challenge: challenge,
      userVerification: "preferred",
    });

    await axios.post("/auth/register", {
      registration,
      email,
    });
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
  }
};

export const authenticateUser = async (userEmail) => {
  const { email } = userEmail;

  if (!email) {
    throw new Error("Email is required for authentication.");
  }

  try {
    // Get authentication options
    const { data: options } = await axios.post("/auth/auth-options", {
      email,
    });

    // Perform WebAuthn authentication
    const authentication = await client.authenticate({
      challenge: options.challenge,
      allowCredentials: options.allowCredentials,
      timeout: 60000,
    });

    // Send authentication response to the backend for verification
    const { data } = await axios.post("/auth/authenticate", {
      authentication,
      email,
    });

    sessionStorage.setItem("authToken", data.token);
    return { success: true, token: data.token };
  } catch (error) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
    throw new Error("Failed to authenticate. Please try again.");
  }
};
