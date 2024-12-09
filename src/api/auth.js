import axios from "./axios";

export const signupUser = async (userData) => {
  const response = await axios.post("/auth/signup", userData);
  return response.data;
};

export const getRegistrationOptions = async (email) => {
  const response = await axios.get(`/auth/get-registration-options`, {
    params: { email },
  });
  return response.data;
};

export const verifyCredential = async (email, credential) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found. Please log in.");
  const response = await axios.post(
    "/auth/verify-registration",
    { email, credential },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
