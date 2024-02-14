export const TIME_DATA = {
  id: 0,
  period: 0,
  regular_time: 0,
  overtime: 0,
  disability: 0,
  meal_time: 0,
  medicare: 0,
  regular_pay: 0,
  vacations_hours: 0,
  sick_hours: 0,
};

export interface TIME {
  id: number;
  period: number;
  regular_pay: number;
  medicare: number;
  disability: number;
  regular_time: number;
  overtime: number;
  meal_time: number;
  vacations_hours: number;
  sick_hours: number;
}
