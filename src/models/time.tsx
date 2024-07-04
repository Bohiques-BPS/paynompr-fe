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
  payment: [PAYMENT_DATA],
  vacations_hours: "00",
  vacations_min: "00",
  holiday_hours: "00",
  holiday_min: "00",
  inability: 0,
  medicare: 0,
  choferil: 0,
  secure_social: 0,
  social_tips: 0,
  tax_pr: 0,
  regular_amount: 0,
  over_amount: 0,
  meal_amount: 0,
  commissions: 0,
  concessions: 0,
  sick_hours: "00",

  sick_min: "00",
  holyday_pay: 0,
  vacation_pay: 0,
  sick_pay: 0,
  meal_time_pay: 0,
  overtime_pay: 0,
};

export interface TIME {
  id: number;
  period: number;
  tips: number;
  inability: number;
  choferil: number;
  regular_amount: number;
  over_amount: number;
  meal_amount: number;
  medicare: number;
  secure_social: number;
  social_tips: number;
  tax_pr: number;
  regular_pay: number;
  vacation_pay: number;
  meal_time_pay: number;
  holyday_pay: number;
  overtime_pay: number;
  commissions: number;
  concessions: number;
  sick_pay: number;
  created_at: Date;
  payment: [PAYMENT];
  regular_hours: string;
  regular_min: string;
  over_min: string;
  holiday_hours: string;
  holiday_min: string;
  over_hours: string;
  meal_hours: string;
  meal_min: string;
  vacations_min: string;
  sick_min: string;

  vacations_hours: string;
  sick_hours: string;
}
