import { FLOAT } from "html2canvas/dist/types/css/property-descriptors/float";

export const EMPLOYER_DATA = {
  name: "Andres",
  last_name: "Fernandez",
  mother_last_name: "Ortiz",
  first_name: "Andres",
  middle_name: "Eleazar",
  employee_type: "1",
  social_security_number: "2323",
  marital_status: "1",
  address: "Prueba",
  marbete: "23",
  type: 1,
  salary: 0,

  date_marb: null,
  clipboard: "23",
  exec_personal: 1,
  choferil: "23",
  regular_time: 0,
  period_norma: "1",
  licence: "23",
  category_cfse: "23",
  gender: 1,
  birthday: null,
  date_admission: null,
  date_egress: null,
  overtime: 0,
  mealtime: 0,
  vacation_time: "00:00",
  vacation_hours: 0,
  vacation_hours_monthly:0,
  sicks_hours_monthly:0,
  vacation_date: null,
  sick_time: "00:00",
  sicks_hours: 0,
  sicks_date: null,
  number_dependents: 0,
  shared_custody: false,
  number_concessions: 0,
  veteran: false,
  type_payroll: 1,
  schedule_type: 1,
  payment_percentage: "23",
  address_state: "",
  address_country: "2",
  address_number: "",
  phone_number: "",
  smartphone_number: "",
};

export interface EMPLOYEER {
  name: string;
  last_name: string;
  mother_last_name: string;
  first_name: string;
  middle_name: string;
  employee_type: string;
  social_security_number: string;
  marital_status: string;
  address: string;
  marbete: string;
  type: number;
  date_marb: any;
  clipboard: string;
  salary: number;

  exec_personal: number;
  choferil: string;
  regular_time: number;
  period_norma: string;
  licence: string;
  category_cfse: string;
  gender: number;
  birthday: any;
  date_admission: any;
  date_egress: any;
  overtime: number;
  mealtime: number;
  vacation_time: string;
  vacation_date: string;
  vacation_hours: number;
  sick_time: string;
  sicks_hours: number;
  sicks_date: string;
  vacation_hours_monthly: number;
  sicks_hours_monthly: number,
  number_dependents: number;
  shared_custody: boolean;
  number_concessions: number;
  veteran: boolean;
  type_payroll: number;
  schedule_type: number;
  payment_percentage: string;
  address_state: string;
  address_country: string;
  address_number: string;
  phone_number: string;
  smartphone_number: string;
}
