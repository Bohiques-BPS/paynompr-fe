import { PAYMENT_DATA, PAYMENT } from "../models/payment";
export const TIME_DATA = {
  id: 0,
  period: 0,
  regular_time: 0,
  overtime: 0,
  disability: 0,
  meal_time: 0,
  medicare: 0,
  regular_pay: 0,
  sswitheld: 0,
  payments: [PAYMENT_DATA],
  vacations_hours: 0,
  sick_hours: 0,
};

export interface TIME {
  id: number;
  period: number;
  regular_pay: number;
  medicare: number;
  sswitheld: number;
  disability: number;
  payments: [PAYMENT];
  regular_time: number;
  overtime: number;
  meal_time: number;
  vacations_hours: number;
  sick_hours: number;
}
