export const COMPANY_DATA = {
  name: "Empresa S.A.",
  commercial_register: "23",
  jurisdiction: "España",
  accountant_id: 1,
  email: "empresa@empresa.com",
  contact: "Juan Pérez",
  contact_number: "912345678",
  website: "www.empresa.com",
  postal_address: "Calle Falsa, 123",
  zipcode_postal_address: "28001",
  number_patronal: "2323",
  coml: null,
  country_postal_address: "España",
  state_postal_addess: "Madrid",
  physical_address: "Calle Real, 456",
  zipcode_physical_address: "28002",
  country_physical_address: "España",
  state_physical_address: "Madrid",
  phone_number: "",
  fax_number: "",
  industrial_code: "CNAE 6201",
  payer: "Empresa S.A.",
  desem: "0.5",
  disabled_percent: "0",
  vacation_hours: 0,
  vacation_date: 0,
  sicks_hours: 0,
  sicks_date: 0,
  unemployment_percentage: "",
  employed_contribution: "0",
  polize_number: "12345678",
  driver_code: "A1",
  driver_rate: "0.8",
};

export interface COMPANY {
  name: string;
  commercial_register: string;
  jurisdiction: string;
  accountant_id: number;
  email: string;
  vacation_hours: number;
  vacation_date: number;
  sicks_hours: number;
  sicks_date: number;
  number_patronal: string;
  coml: any;
  contact: string;
  contact_number: string;
  website: string;
  postal_address: string;
  zipcode_postal_address: string;
  country_postal_address: string;
  state_postal_addess: string;
  physical_address: string;
  zipcode_physical_address: string;
  country_physical_address: string;
  state_physical_address: string;
  phone_number: string;
  fax_number: string;
  industrial_code: string;
  payer: string;
  desem: string;
  disabled_percent: string;
  unemployment_percentage: string;
  polize_number: string;
  employed_contribution: string;
  driver_code: string;
  driver_rate: string;
}
