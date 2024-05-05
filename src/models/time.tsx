import { PAYMENT_DATA, PAYMENT } from "../models/payment";
export const TIME_DATA = {
  id: 0,
  period: 0,
  regular_hours: "00",
  regular_min: "00",
  over_hours: "00",
  over_min: "00",

  meal_hours: "00",
  meal_min: "00",

  tips: 0,
  regular_pay: 0,
  created_at: new Date(),
  payments: [PAYMENT_DATA],
  vacations_hours: "00",
  vacations_min: "00",

  sick_hours: "00",

  sick_min: "00",

  vacation_pay: 0,
  sick_pay: 0,
  meal_time_pay: 0,
  overtime_pay: 0,
};

export interface TIME {
  id: number;
  period: number;
  tips: number;
  regular_pay: number;
  vacation_pay: number;
  meal_time_pay: number;
  overtime_pay: number;
  sick_pay: number;
  created_at: Date;
  payments: [PAYMENT];
  regular_hours: string;
  regular_min: string;
  over_min: string;

  over_hours: string;
  meal_hours: string;
  meal_min: string;
  vacations_min: string;
  sick_min: string;

  vacations_hours: string;
  sick_hours: string;
}
