export const BONUS = {
  max_employers: 0,
  percent_to_max: 3,
  amount_max: 0,
  min_employers: 0,
  percent_to_min: 6,
  amount_min: 0,
  reg: false,
  over: false,
  vacations: false,
  sick: false,
};

export interface BONUS {
  max_employers: Number;
  percent_to_max: Number;
  amount_max: Number;
  min_employers: 0;
  percent_to_min: Number;
  amount_min: Number;
  reg: Boolean;
  over: Boolean;
  vacations: Boolean;
  sick: Boolean;
}
