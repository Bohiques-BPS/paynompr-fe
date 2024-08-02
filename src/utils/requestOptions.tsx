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

export function getOutEmployers(id_company: number) {
  return Axios.request(setOptions("outemployers/" + id_company, "GET")); // Using a post request, specifying the user
}

export function getTaxes(id_company: number) {
  return Axios.request(setOptions("taxes/" + id_company, "GET")); // Using a post request, specifying the user
}
export function getTaxesByID(id_company: number, id_taxes: number) {
  return Axios.request(
    setOptions("taxes/" + id_company + "/" + id_taxes, "GET")
  ); // Using a post request, specifying the user
}

export function setTaxe(data: object, id_company: number) {
  return Axios.request(setOptions("taxes/" + id_company, "POST", data)); // Using a post request, specifying the user
}

export function editTaxe(data: object, id_taxes: number) {
  return Axios.request(setOptions("taxes/" + id_taxes, "PUT", data)); // Using a post request, specifying the user
}

export function disableTaxe(id_taxes: number) {
  return Axios.request(setOptions("taxes/" + id_taxes, "DELETE")); // Using a post request, specifying the user
}

export function getCompanyWithOutEmployer(
  id_company: number,
  id_employer: number
) {
  return Axios.request(
    setOptions("outemployers/" + id_company + "/" + id_employer, "GET")
  ); // Using a post request, specifying the user
}
export function getCompanyWithOutEmployerTime(
  id_company: number,
  id_employer: number
) {
  return Axios.request(
    setOptions("outemployers/time/" + id_company + "/" + id_employer, "GET")
  ); // Using a post request, specifying the user
}
export function getCompanyWithEmployer(
  id_company: number,
  id_employer: number
) {
  return Axios.request(
    setOptions("companies/" + id_company + "/employer/" + id_employer, "GET")
  ); // Using a post request, specifying the user
}
export function getTalonario(
  id_company: number,
  id_employer: number,
  id_talonario: number
) {
  return Axios.request(
    setOptions(
      "companies/" + id_company + "/" + id_employer + "/" + id_talonario,
      "GET"
    )
  ); // Using a post request, specifying the user
}

export function getAllEmployers() {
  return Axios.request(setOptions("employers/", "GET")); // Using a post request, specifying the user
}

export function setEmployers(data: object, id_company: number) {
  return Axios.request(setOptions("employers/" + id_company, "POST", data)); // Using a post request, specifying the user
}

export function setOutEmployers(data: object, id_company: number) {
  return Axios.request(setOptions("outemployers/" + id_company, "POST", data)); // Using a post request, specifying the user
}

export function editEmployers(data: object, id_employer: number) {
  return Axios.request(setOptions("employers/" + id_employer, "PUT", data)); // Using a post request, specifying the user
}

export function editOutEmployers(data: object, id_employer: number) {
  return Axios.request(setOptions("outemployers/" + id_employer, "PUT", data)); // Using a post request, specifying the user
}

export function changeStatusEmployer(id: number) {
  return Axios.request(setOptions("employers/" + id, "DELETE"));
}

export function changeStatusOutEmployer(id: number) {
  return Axios.request(setOptions("outemployers/" + id, "DELETE"));
}
export function deleteOutEmployer(id: number) {
  return Axios.request(setOptions("outemployers/delete/" + id, "DELETE"));
}

export function deleteEmployer(id: number) {
  return Axios.request(setOptions("employers/delete/" + id, "DELETE"));
}

export function getEmployer(id_company: number, id_employer: number) {
  return Axios.request(
    setOptions("employers/" + id_company + "/" + id_employer, "GET")
  ); // Using a post request, specifying the user
}

export function getOutEmployer(id_company: number, id_employer: number) {
  return Axios.request(
    setOptions("outemployers/" + id_company + "/" + id_employer, "GET")
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

export function deleteCompanie(id: number) {
  return Axios.request(setOptions("companies/delete/" + id, "DELETE"));
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

export function getTime(id_employer: number) {
  return Axios.request(setOptions("time/" + id_employer, "GET")); // Using a post request, specifying the user
}

export function deleteTime(id_time: number) {
  return Axios.request(setOptions("time/" + id_time, "DELETE")); // Using a post request, specifying the user
}

export function setTime(data: object, id_employer: number) {
  return Axios.request(setOptions("time/" + id_employer, "POST", data)); // Using a post request, specifying the user
}

export function editTime(data: object, id_time: number) {
  return Axios.request(setOptions("time/" + id_time, "PUT", data)); // Using a post request, specifying the user
}
export function setOutTime(data: object, id_employer: number) {
  return Axios.request(setOptions("outtime/" + id_employer, "POST", data)); // Using a post request, specifying the user
}

export function editOutTime(data: object, id_time: number) {
  return Axios.request(setOptions("outtime/" + id_time, "PUT", data)); // Using a post request, specifying the user
}
export function getCounterFoil(
  id_company: number,
  id_time: number,
  employer_id: number
) {
  return Axios.request({
    url: `reports/counterfoil/${id_company}/${id_time}/${employer_id}`,
    method: "GET",
    responseType: "blob", // Importante para manejar el archivo binario
  })
    .then((response) => {
      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Talonario_de_Pagos.pdf"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove(); // Eliminar el enlace después de la descarga
    })
    .catch((error) => {
      console.error("Error al descargar el PDF:", error);
    });
}
