export interface RegisterUser{
    username: string
    email: string
    password: string
}

export interface RegisterUserResponse{
    id: string
    username: string
    email: string
}

export interface LoginUser{
    username: string
    password: string
}

export interface UpdateUser {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
}

import type { Analysis } from "./analysis.ts"

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  analyses?: Analysis[];
  createdAt: Date;
}