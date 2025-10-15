export interface Admin {
  _id: string;
  email: string;
  [key: string]: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthApiResponse {
  success: boolean;
  adminData?: Admin;
  admin?: Admin;
  message: string;
  token?: string;
}
