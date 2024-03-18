export const TAXES_DATA = {
  id: 0,
  name: "",
  amount: 0,
  value: 0,
  requiered: 0,
  type_taxe: 0,
  is_active: false,
  type_amount: 0,
};

export interface TAXES {
  id: number;
  name: string;
  amount: number;
  value: number;
  is_active: boolean;
  requiered: number;
  type_taxe: number;

  type_amount: number;
}
