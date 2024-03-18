export const PAYMENT_DATA = {
  id: 0,
  name: "",
  amount: 0,
  requiered: 0,
  type_taxe: 0,
  is_active: false,

  type_amount: 0,
};

export interface PAYMENT {
  id: number;
  name: string;
  amount: number;
  requiered: number;
  is_active: boolean;

  type_taxe: number;
  type_amount: number;
}
