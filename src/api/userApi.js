import axios from "./axios";

export const getCurrentUser = async () => {
  const response = await axios.get("/users/me");
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await axios.patch("/users/me", userData);
  return response.data;
};

export const deleteUser = async () => {
  await axios.delete("/users/me");
};

export const getUserById = async (id) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

export const deleteUserById = async (id) => {
  await axios.delete(`/users/${id}`);
};
