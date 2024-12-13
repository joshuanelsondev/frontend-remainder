import axios from "./axios";
import { client } from "@passwordless-id/webauthn";

export const signupUser = async (userData) => {
  const response = await axios.post("/auth/signup", userData);
  return response.data;
};

export const registerUser = async (email) => {
  try {
    // Get registration options
    const { data: challenge } = await axios.post("/auth/challenge", {
      email,
    });

    const registration = await client.register({
      user: email,
      challenge: challenge,
      userVerification: "preferred",
    });

    // Send registration response to the backend for verification
    await axios.post("/auth/register", {
      registration,
      email,
    });
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    alert("Failed to register. Please try again.");
  }
};

export const authenticateUser = async (email) => {
  try {
    // Get authentication options
    const { data: options } = await axios.post("/auth/authenticate-options", {
      email,
    });

    // Perform WebAuthn authentication
    const authentication = await client.authenticate({
      challenge: options.challenge,
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

// export const getRegistrationOptions = async (email) => {
//   const response = await axios.get(`/auth/get-registration-options`, {
//     params: { email },
//   });
//   return response.data;
// };

// export const verifyCredential = async (email, credential) => {
//   const token = sessionStorage.getItem("authToken");
//   if (!token) throw new Error("No auth token found. Please log in.");
//   const response = await axios.post(
//     "/auth/verify-registration",
//     { email, credential },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// };
