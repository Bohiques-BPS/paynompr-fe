import { PAYMENT_DATA, PAYMENT } from "../models/payment";
export const TIME_DATA = {
  id: 0,
  period: 0,
  regular_time: 0,
  overtime: 0,

  meal_time: 0,

  regular_pay: 0,
  created_at: new Date(),
  payments: [PAYMENT_DATA],
  vacations_hours: 0,
  sick_hours: 0,
  vacation_pay: 0,
  sick_pay: 0,
  meal_time_pay: 0,
  overtime_pay: 0,
};

export interface TIME {
  id: number;
  period: number;
  regular_pay: number;
  vacation_pay: number;
  meal_time_pay: number;
  overtime_pay: number;
  sick_pay: number;
  created_at: Date;
  payments: [PAYMENT];
  regular_time: number;
  overtime: number;
  meal_time: number;
  vacations_hours: number;
  sick_hours: number;
}
