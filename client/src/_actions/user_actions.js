import axios from "axios";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const AUTH_USER = "AUTH_USER";

export function registerUser(dataToSubmit) {
  const request = axios.post("/api/users/register", dataToSubmit).then(res => {
    console.log(res.data);
    return res.data;
  });

  return { type: REGISTER_USER, payload: request };
}

export function loginUser(dataToSubmit) {
  const request = axios.post("/api/users/login", dataToSubmit).then(res => {
    return res.data;
  });

  return { type: LOGIN_USER, payload: request };
}

export function authUser() {
  const request = axios.get("/api/users/auth").then(res => {
    return res.data;
  });

  return { type: AUTH_USER, payload: request };
}
