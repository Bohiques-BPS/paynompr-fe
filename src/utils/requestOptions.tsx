import Axios from "axios";
import { fetchToken } from "../services/auth.services";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function setOptions(url: string, method: string, data?: {}) {
  console.log(fetchToken());
  return {
    url: url,
    method: method,
    data: data,
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${fetchToken()}`,
    },
  };
}

function setOutForm(url: string, method: string, data?: {}) {
  return {
    url: url,
    method: method,
    data: data,
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
}

export function setLogin(data: {}) {
  return Axios.request(setOutForm("auth/login", "POST", data)); // Using a post request, specifying the user
}

export function setRegister(data: {}) {
  return Axios.request(setOptions("users/", "POST", data)); // Using a post request, specifying the user
}

export function setCode(data: {}) {
  return Axios.request(setOptions("codes/", "POST", data)); // Using a post request, specifying the user
}

export function getCodes() {
  return Axios.request(setOptions("codes/", "GET")); // Using a post request, specifying the user
}

export function getUsers() {
  return Axios.request(setOptions("users/", "GET")); // Using a post request, specifying the user
}

export function getCurrentUser() {
  return Axios.request(setOptions("auth/", "GET")); // Using a post request, specifying the user
}
