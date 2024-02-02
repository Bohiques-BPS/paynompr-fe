import Axios from "axios";
import { fetchToken } from "../services/auth.services";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function setOptions(url: string, method: string, data?: object) {
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

export function setOutForm(url: string, method: string, data?: {}) {
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

export function getEmployers(id_company: number) {
  return Axios.request(setOptions("employers/" + id_company, "GET")); // Using a post request, specifying the user
}

export function setEmployers(data: object, id_company: number) {
  return Axios.request(setOptions("employers/" + id_company, "POST", data)); // Using a post request, specifying the user
}

export function editEmployers(data: object, id_employer: number) {
  return Axios.request(setOptions("employers/" + id_employer, "PUT", data)); // Using a post request, specifying the user
}

export function getEmployer(id_company: number, id_employer: number) {
  return Axios.request(
    setOptions("employers/" + id_company + "/" + id_employer, "GET")
  ); // Using a post request, specifying the user
}

export function getCurrentUser() {
  return Axios.request(setOptions("auth/", "GET")); // Using a post request, specifying the user
}

export function getAccountants() {
  return Axios.request(setOptions("accountant", "GET"));
}
export function getAccountant(id: number) {
  return Axios.request(setOptions("accountant/" + id, "GET"));
}

export function changeStatusAccountant(id: number) {
  return Axios.request(setOptions("accountant/" + id, "DELETE"));
}

export function getCompanies() {
  return Axios.request(setOptions("companies", "GET")); // Using a post request, specifying the user
}
export function getCompanie(id: number) {
  return Axios.request(setOptions("companies/" + id, "GET")); // Using a post request, specifying the user
}

export function setCompanies(data: object) {
  return Axios.request(setOptions("companies", "POST", data)); // Using a post request, specifying the user
}

export function changeStatusCompanie(id: number) {
  return Axios.request(setOptions("companies/" + id, "DELETE"));
}

export function editCompanies(data: object, id: number) {
  return Axios.request(setOptions("companies/" + id, "PUT", data)); // Using a post request, specifying the user
}

export function setAccountants(data: object) {
  return Axios.request(setOptions("accountant", "POST", data)); // Using a post request, specifying the user
}

export function editAccountants(data: object, id: number) {
  return Axios.request(setOptions("accountant/" + id, "PUT", data)); // Using a post request, specifying the user
}
