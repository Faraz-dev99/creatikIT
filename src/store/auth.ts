import { API_ROUTES } from "@/constants/ApiRoute";
import { Admin, LoginCredentials, AuthApiResponse } from "./auth.interface";
import Cookies from "js-cookie";

export const loginAdmin = async (logindata: LoginCredentials): Promise<AuthApiResponse> => {
  try {
    const res = await fetch(API_ROUTES.ADMIN.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify(logindata),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: AuthApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("SERVER ERROR: ", error);
    return { success: false, message: "Login failed" };
  }
};

export const logoutAdmin = async (): Promise<AuthApiResponse> => {
  try {
    const res = await fetch(API_ROUTES.ADMIN.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: AuthApiResponse = await res.json();
   
    return data;
  } catch (error) {
    console.error("SERVER ERROR: ", error);
    return { success: false, message: "Logout failed" };
  }
};

export const checkAuthAdmin = async (): Promise<AuthApiResponse> => {
  try {
    /* const token = Cookies.get("token");
    if (!token) {
      return { success: false, message: "No token found" };
    } */

      

    const res = await fetch(API_ROUTES.ADMIN.CHECK, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
      
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: AuthApiResponse = await res.json();
    // console.log("done checking",data)
    return data;
  } catch (error) {
    console.error("SERVER ERROR: ", error);
    return { success: false, message: "Auth check failed" };
  }
};



