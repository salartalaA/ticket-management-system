import { signIn } from "next-auth/react";
import { axiosInstance } from "./axios";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

export const signup = async (signupData: SignupData) => {
  try {
    const response = await axiosInstance.post("/auth/register", signupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

type LoginData = {
  email: string;
  password: string;
};

export const login = async (loginData: LoginData) => {
  try {
    const response = await signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      redirect: false,
    });

    if (!response?.ok) throw new Error("Invalid credentials");

    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.url;
};

export const tickets = async () => {
  try {
    const response = await axiosInstance.get("/tickets");
    return response.data;
  } catch (error) {
    throw error;
  }
};
