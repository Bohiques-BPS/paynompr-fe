import Axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

function setOptions(url: string, method: string, data?: object) {
  return {
    url: url,
    method: method,
    data: data,
    baseURL: `${baseURL}/api/`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
}

function setLoginForm(url: string, method: string, data?: object) {
  return {
    url: url,
    method: method,
    data: data,
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
}

export function setLogin(data: object) {
  return Axios.request(setLoginForm("auth/token", "POST", data)); // Using a post request, specifying the user
}

export function setRegister(data: object) {
  return Axios.request(setOptions("users/", "POST", data)); // Using a post request, specifying the user
}

export function setCode(data: object) {
  return Axios.request(setOptions("codes/", "POST", data)); // Using a post request, specifying the user
}

export function getCodes() {
  return Axios.request(setOptions("codes/", "GET")); // Using a post request, specifying the user
}

export function getUsers() {
  return Axios.request(setOptions("users/", "GET")); // Using a post request, specifying the user
}
