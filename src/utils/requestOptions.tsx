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

export function setOptionsFile(url: string, method: string) {
  return {
    url: url,
    method: method,

    baseURL: BASE_URL,
    responseType: "blob", // importante

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

export function getFixedTaxes() {
  return Axios.request(setOptions("fixed-taxes/", "GET")); // Using a post request, specifying the user
}

export function getFixedTaxesByID(id_taxes: number) {
  return Axios.request(setOptions("fixed-taxes/" + id_taxes, "GET")); // Using a post request, specifying the user
}

export function getSumFixedTaxesByID(employer_id: number) {
  return Axios.request(
    setOptions("fixed-taxes/sum_taxes_by_id/" + employer_id, "GET")
  ); // Using a post request, specifying the user
}

export function setTaxe(data: object, id_company: number) {
  return Axios.request(setOptions("taxes/" + id_company, "POST", data)); // Using a post request, specifying the user
}

export function setFixedTaxe(data: object) {
  return Axios.request(setOptions("fixed-taxes/", "POST", data)); // Using a post request, specifying the user
}

export function editTaxe(data: object, id_taxes: number) {
  return Axios.request(setOptions("taxes/" + id_taxes, "PUT", data)); // Using a post request, specifying the user
}

export function editFixedTaxe(data: object, id_taxes: number) {
  return Axios.request(setOptions("fixed-taxes/" + id_taxes, "PUT", data)); // Using a post request, specifying the user
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
  id_employer: number,
  _year: string
) {
  return Axios.request(
    setOptions(
      "companies/" + id_company + "/employer/" + id_employer + "/year/" + _year,
      "GET"
    )
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
export function deleteTaxe(id: number) {
  return Axios.request(setOptions("taxes/delete/" + id, "DELETE"));
}
export function deleteAccountant(id: number) {
  return Axios.request(setOptions("accountant/delete/" + id, "DELETE"));
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
  employer_id: number,
  period: any,
  employer: any
) {
  return Axios({
    url:
      BASE_URL + `/reports/counterfoil/${id_company}/${id_time}/${employer_id}`,
    method: "GET",
    responseType: "blob", // importante
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      "Empleado-" +
        employer.first_name +
        "-" +
        employer.last_name +
        "-Periodo-" +
        period.period_number +
        ".pdf"
    );
    document.body.appendChild(link);
    link.click();
  });
}

export function getW2PFoil(
  employer_id: number,
  employer: any,
  companyId: number,
  year: string
) {
  return Axios({
    url: BASE_URL + `/reports/form_w2pr_pdf`,
    method: "POST",
    data: {
      employer_id: employer_id,
      year: year,
      period: null,
      company_id: companyId,
    },
    responseType: "blob", // importante
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    if (employer != null)
      link.setAttribute(
        "download",
        "Empleado-" + employer.first_name + "-" + employer.last_name + ".pdf"
      );
    else link.setAttribute("download", "W2-PR-ALL.pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export function get940Foil(company_id: number, company: any, year: string) {
  return Axios({
    url: BASE_URL + `/reports/form_940_pdf`,
    method: "POST",
    data: { company_id: company_id, year: year, period: null },
    responseType: "blob", // importante
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Company-" + company.name + ".pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export function get941Foil(
  company_id: number,
  company: any,
  trimestre: any,
  year: string
) {
  return Axios({
    url: BASE_URL + `/reports/form_941_pdf`,
    method: "POST",
    data: {
      company_id: company_id,
      year: year,
      trimestre: trimestre,
      period: trimestre,
    },
    responseType: "blob", // importante
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Company-" + company.name + ".pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export function getHaciendaFoil(
  company_id: number,
  company: any,
  trimestre: any,
  year: string
) {
  return Axios({
    url: BASE_URL + `/reports/form_withheld_499_pdf`,
    data: {
      company_id: company_id,
      year: year,
      trimestre: trimestre,
      period: trimestre,
    },
    method: "POST",
    responseType: "blob", // importante
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Company-" + company.name + ".pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export function getCFSEFoil(
  company_id: number,
  company: any,
  trimestre: any,
  year: string
) {
  return Axios({
    url: BASE_URL + `/reports/get_report_cfse_pdf`,
    data: {
      company_id: company_id,
      year: year,
      trimestre: trimestre,
      period: null,
    },
    method: "POST",
    responseType: "blob", // importante
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Company-" + company.name + ".pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export function getUnemploymentFoil(
  company_id: number,
  company: any,
  trimestre: any,
  year: string
) {
  return Axios({
    url: BASE_URL + `/reports/form_unemplo`,
    data: {
      company_id: company_id,
      year: year,
      trimestre: trimestre,
      period: trimestre,
    },
    method: "POST",
    responseType: "blob", // importante
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Company-" + company.name + ".pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export function getChoferilFoil(
  company_id: number,
  company: any,
  trimestre: any,
  year: string
) {
  return Axios({
    url: BASE_URL + `/reports/form_choferil_pdf`,
    data: {
      company_id: company_id,
      year: year,
      trimestre: trimestre,
      period: trimestre,
    },
    method: "POST",
    responseType: "blob", // importante
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Company-" + company.name + ".pdf");
    document.body.appendChild(link);
    link.click();
  });
}
