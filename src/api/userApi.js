import axios from "./axios";
import { formatToIso } from "../utils/formatDate";

export const getCurrentUser = async () => {
  const response = await axios.get("/users/me");
  const userData = response.data;
  if (userData.dateOfBirth) {
    userData.dateOfBirth = formatToIso(userData.dateOfBirth);
  }

  return userData;
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
