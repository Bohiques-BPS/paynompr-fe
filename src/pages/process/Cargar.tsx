import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import {
  deleteTime,
  editTime,
  getCompanyWithEmployer,
  getCounterFoil,
  setTime,
} from "../../utils/requestOptions";
import { useParams } from "react-router-dom";
import { COMPANY_DATA } from "../../models/company";
import { EMPLOYER_DATA } from "../../models/employeer";
import { TIME_DATA } from "../../models/time";
import {
  convertTimeToHoursWithDecimals,
  filterById,
  getNumber,
  showError,
  showSuccess,
} from "../../utils/functions";
import { TAXES, TAXES_DATA } from "../../models/taxes";

import ModalAlert from "../../components/dashboard/ModalAlert";

const Cargar = () => {
  const params = useParams();
  const [loanding, setLoanding] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [employerData, setEmployerData] = useState(EMPLOYER_DATA);
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [timesData, setTimesData] = useState([TIME_DATA]);
  const [formData, setFormData] = useState(TIME_DATA);

  const [taxesData, setTaxesData] = useState([TAXES_DATA]);
  const [period, setPeriod] = useState(0);
  const [flag, setFlag] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [idEmployer, setIdEmployer] = useState(0);
  const [employers, setEmployers] = useState([]);

  const [isOpen2, setIsOpen2] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const recalculate = () => {
    let regular_amount = 0;
    let over_amount = 0;
    let salary = 0;
    let meal_amount = 0;
    if (formData.id == 0) {
      salary = employerData.salary;

      regular_amount = employerData.regular_time;
      over_amount = employerData.overtime;
      meal_amount = employerData.mealtime;
    } else {
      salary = formData.salary;

      regular_amount = formData.regular_amount;
      over_amount = formData.over_amount;
      meal_amount = formData.meal_amount;
    }

    const regular_pay =
      regular_amount * convertTimeToHoursWithDecimals(formData.vacation_time) +
      regular_amount * convertTimeToHoursWithDecimals(formData.sick_time) +
      regular_amount * convertTimeToHoursWithDecimals(formData.holiday_time) +
      getNumber(formData.tips) +
      getNumber(formData.salary) +
      getNumber(formData.bonus) +
      getNumber(formData.others) +
      getNumber(formData.commissions) +
      getNumber(formData.concessions) +
      regular_amount * convertTimeToHoursWithDecimals(formData.regular_time) +
      over_amount * convertTimeToHoursWithDecimals(formData.over_time) +
      meal_amount * convertTimeToHoursWithDecimals(formData.meal_time);
    let aux: any = [];

    let inability = 0;
    if (employerData.choferil != "SI") inability = regular_pay * (0.3 / 100);

    let medicare = regular_pay * (1.45 / 100);
    let secure_social = (regular_pay - formData.tips) * (6.2 / 100);

    const withholdingValue = employerData.payment_percentage.replace("%", "");
    let tax_pr = regular_pay * (Number(withholdingValue) / 100);
    let social_tips = formData.tips * (6.2 / 100);

    let choferil = 0;
    if (employerData.choferil === "SI") choferil = 0.5;
    if (formData.id == 0)
      taxesData.map((item) => {
        item.value = setAmountTaxe(item, regular_pay);

        aux.push(item);
      });
    else aux = formData.payment;

    setFormData({
      ...formData,
      ["payment"]: aux,
      ["salary"]: salary,

      ["inability"]: getNumber(inability),
      ["choferil"]: getNumber(choferil),
      ["medicare"]: getNumber(medicare),
      ["secure_social"]: getNumber(secure_social),
      ["tax_pr"]: getNumber(tax_pr),
      ["social_tips"]: getNumber(social_tips),
      ["holyday_pay"]: Number(
        regular_amount * convertTimeToHoursWithDecimals(formData.holiday_time)
      ),
      ["vacation_pay"]: Number(
        regular_amount * convertTimeToHoursWithDecimals(formData.vacation_time)
      ),
      ["sick_pay"]: Number(
        regular_amount * convertTimeToHoursWithDecimals(formData.sick_time)
      ),
      ["overtime_pay"]: Number(
        over_amount * convertTimeToHoursWithDecimals(formData.over_time)
      ),
      ["meal_time_pay"]: Number(
        meal_amount * convertTimeToHoursWithDecimals(formData.meal_time)
      ),
      ["regular_pay"]: Number(
        regular_amount * convertTimeToHoursWithDecimals(formData.regular_time) +
          formData.bonus +
          formData.others +
          salary
      ),
    });
  };

  useEffect(() => {
    if (formData.id == 0) recalculate();
  }, [
    formData.vacation_time,
    formData.over_time,
    formData.meal_time,
    selectedPeriod,
    formData.salary,
    formData.bonus,
    formData.others,

    formData.sick_time,
    formData.tips,
    formData.commissions,
    formData.concessions,
    formData.holiday_time,
    formData.regular_time,
  ]);

  const getTotal = () => {
    var total = 0;

    const regular_pay =
      formData.vacation_pay +
      formData.sick_pay +
      formData.holyday_pay +
      getNumber(formData.tips) +
      getNumber(formData.commissions) +
      getNumber(formData.concessions) +
      formData.regular_pay +
      formData.overtime_pay +
      formData.meal_time_pay;
    let inability = 0;
    let medicare = 0;
    let secure_social = 0;

    let tax_pr = 0;
    let social_tips = 0;
    let choferil = 0;

    if (formData.id == 0) {
      inability = getNumber(formData.inability);
      medicare = getNumber(formData.medicare);
      secure_social = getNumber(formData.secure_social);

      tax_pr = getNumber(formData.tax_pr);
      social_tips = getNumber(formData.social_tips);
      choferil = getNumber(formData.choferil);
    } else {
      inability = formData.inability;
      medicare = formData.medicare;
      secure_social = formData.secure_social;

      tax_pr = formData.tax_pr;
      social_tips = formData.social_tips;
      choferil = formData.choferil;
    }
    total = regular_pay;
    total =
      total -
      getNumber(inability) -
      getNumber(medicare) -
      getNumber(secure_social) -
      getNumber(tax_pr) -
      getNumber(social_tips) -
      getNumber(choferil);

    console.log(regular_pay);
    if (formData.id == 0) {
      taxesData.map((item) => {
        if (item.is_active || item.required == 2) {
          item.value = setAmountTaxe(item, regular_pay);

          total = total + item.value;
        }
      });
    } else {
      formData.payment.map((item) => {
        let value = 0;
        if (item.type_amount == 1) {
          value = ((getPreTotal() * item.amount) / 100) * -1;
        } else {
          value = item.amount;
        }
        if (item.type_taxe == 1) {
          value = value * -1;
        }

        if (item.is_active || item.required == 2) total = total + value;
      });
    }
    if (total > 0) return total;
    else return 0;
  };

  const getPreTotal = () => {
    var total = 0;
    const regular_pay =
      formData.vacation_pay +
      formData.sick_pay +
      formData.holyday_pay +
      getNumber(formData.tips) +
      getNumber(formData.commissions) +
      getNumber(formData.concessions) +
      formData.regular_pay +
      formData.overtime_pay +
      formData.meal_time_pay;
    total = regular_pay;

    return total;
  };

  const generateFile = () => {
    setLoanding(true);

    getCounterFoil(
      Number(params.id_company),
      Number(params.id_employer),
      formData.id
    )
      .then(() => {
        // Data retrieval and processing
        setLoanding(false);

        showSuccess("Creado exitosamente.");
      })
      .catch((error) => {
        setLoanding(false);
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseFloat(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
  const handleInputTimeChange = (
    e: React.FormEvent<HTMLInputElement>,
    time: any,
    target: any
  ) => {
    let value = "";

    if (e.currentTarget.name.includes("hours")) {
      if (e.currentTarget.value == "") value = "00";
      else value = e.currentTarget.value;
      value = value + ":" + time.split(":")[1];
    }
    if (e.currentTarget.name.includes("min")) {
      if (e.currentTarget.value == "") value = "00";
      else value = e.currentTarget.value;
      if (parseInt(e.currentTarget.value) >= 60) value = "59";
      value = time.split(":")[0] + ":" + value;
    }

    setFormData({
      ...formData,
      [target]: value + "",
    });
  };

  const handleitem = (e: React.FormEvent<HTMLInputElement>, item: TAXES) => {
    // Crea un nuevo objeto con el cambio

    item.value = parseFloat(e.currentTarget.value);
    item.edited = true;
    item.amount = parseFloat(e.currentTarget.value);

    const updatedItem = { ...item };

    // Crea un nuevo array con el item actualizado
    const updatedTaxesData = taxesData.map((el) =>
      el === item ? updatedItem : el
    );

    // Actualiza el estado con el nuevo array
    setTaxesData(updatedTaxesData);

    setFormData({
      ...formData,
      ["payment"]: taxesData,
    });
  };

  const handleCheck = (e: React.FormEvent<HTMLInputElement>, item: TAXES) => {
    // Crea un nuevo objeto con el cambio

    const isActive = e.currentTarget.checked;

    item.is_active = isActive;

    const updatedItem = { ...item, is_active: isActive };

    // Crea un nuevo array con el item actualizado
    if (formData.id == 0) {
      const updatedTaxesData = taxesData.map((el) =>
        el === item ? updatedItem : el
      );

      // Actualiza el estado con el nuevo array
      setTaxesData(updatedTaxesData);

      setFormData({
        ...formData,
        ["payment"]: taxesData,
      });
    } else {
      // Crea un nuevo array con el item actualizado
      const updatedPayment = formData.payment.map((el) =>
        el === item ? updatedItem : el
      );
      setFormData({
        ...formData,
        ["payment"]: updatedPayment,
      });
    }
  };

  const setAmountTaxe = (taxe: TAXES, regular_pay: number) => {
    if (taxe.type_amount == 1) {
      if (!taxe.edited) taxe.value = regular_pay * (taxe.amount / 100);
    } else {
      if (!taxe.edited) taxe.value = taxe.amount;
    }
    if (taxe.type_taxe == 1) {
      if (taxe.value > 0) taxe.value = taxe.value * -1;
    }

    return taxe.value;
  };

  const handlePeriodChange = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;
    setPeriod(value);
    let times = [];
    times = filterById(timesData, value).times;
    setSelectedPeriod(filterById(timesData, value).id);
    if (times.length > 0 && value > 0) {
      setFormData({ ...times[0], period_id: filterById(timesData, value).id });
    } else {
      setFormData({ ...TIME_DATA, period_id: filterById(timesData, value).id });
    }
  };

  const setPeriodChange = () => {
    const value = period;

    setPeriod(value);
    let times = [];
    if (timesData) times = filterById(timesData, value).times;

    setSelectedPeriod(filterById(timesData, value).id);
    if (times.length > 0 && value > 0) {
      setFormData({ ...times[0], period_id: filterById(timesData, value).id });
    } else {
      setFormData({ ...TIME_DATA, period_id: filterById(timesData, value).id });
    }
  };

  const handleChangeEmployer = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;
    setIdEmployer(Number(value));
    getData(Number(value));
  };

  const handleCreate = () => {
    if (formData.id == 0) {
      setLoanding(true);
      setTime(formData, Number(params.id_employer))
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);

          resetData(idEmployer);
          handleModal();
          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    } else {
      setLoanding(true);
      editTime(formData, Number(formData.id))
        .then(() => {
          // Data retrieval and processing

          setLoanding(false);
          resetData(idEmployer);
          handleModal();
          showSuccess("Editado exitosamente.");
        })
        .catch((error) => {
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
  };

  const getAmountTaxe = (taxe: TAXES) => {
    if (taxe.type_amount == 1) return (getPreTotal() * taxe.amount) / 100;
    else return taxe.value;
  };

  const getAmountTaxe2 = (taxe: TAXES) => {
    if (taxe.type_amount == 1) return (getPreTotal() * taxe.amount) / 100;
    else return taxe.value;
  };

  const handleDelete = () => {
    setLoanding(true);
    deleteTime(formData.id)
      .then(() => {
        // Data retrieval and processing
        setLoanding(false);
        handleModal2();
        getData(idEmployer);

        showSuccess("Eliminado exitosamente.");
      })
      .catch((error) => {
        setLoanding(false);
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };
  const getData = (id_employer: any) => {
    setLoanding(true);
    getCompanyWithEmployer(Number(params.id_company), id_employer)
      .then((response) => {
        // Data retrieval and processing
        setLoanding(false);
        if (formData.id == 0) {
          setEmployerData(response.data.result.employer);
          setCompanyData(response.data.result.company);
          setEmployers(response.data.result.employers);
          setTaxesData(response.data.result.taxes);
        } else {
          setFlag(flag + 1);
        }
        setTimesData([]);

        setTimesData([...response.data.result.periods]);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  const resetData = (id_employer: any) => {
    setLoanding(true);
    getCompanyWithEmployer(Number(params.id_company), id_employer)
      .then((response) => {
        // Data retrieval and processing
        setLoanding(false);
        setFlag(flag + 1);
        setTimesData([]);

        setTimesData([...response.data.result.periods]);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  useEffect(() => {
    setIdEmployer(Number(params.id_employer));
    getData(Number(params.id_employer));
  }, []);

  useEffect(() => {
    recalculate();
  }, [period]);
  useEffect(() => {
    if (flag > 0) {
      setPeriodChange();
    }
  }, [flag]);
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Cargar Tiempo</h3>

        <p className="text-white mt-4">Seleccionar período de trabajo</p>
        <label
          className={` block mb-2 text-sm font-medium text-gray-700 w-2/6 mx-auto mt-4 inline-block`}
        >
          <select
            name="period"
            onChange={handlePeriodChange}
            value={selectedPeriod}
            className={` bg-gray-50 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-3`}
          >
            <option value={-1}>Seleccione una opción</option>
            {timesData.map((item: any, i: number) => (
              <option key={item.id} value={item.id}>
                Periodo {i + 1} - {item.period_start} - {item.period_end}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="xl:w-full w-full ">
          <CustomInputs
            class="w-1/2 mx-auto pe-1  inline-block "
            label=""
            disabled={true}
            value={companyData.name}
            placeholder=""
            type="text"
          />

          <select
            name="employers"
            onChange={handleChangeEmployer}
            value={idEmployer}
            className={`w-1/2 bg-gray-50 border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em]`}
          >
            <option value={-1}>Seleccione una opción</option>
            {employers.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.first_name + " " + item.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col xl:flex-row gap-4 mt-4">
          <div className="xl:w-1/3 w-full border rounded-lg border-gray-500 p-2 ">
            <h2 className="mt-2 text-center text-2xl">Horas</h2>
            <hr className="mt-2 mb-4" />
            <div className="w-1/2  mx-auto  inline-block  ">
              <label className="block" htmlFor="">
                Horas Regulares
              </label>
              <CustomInputs
                class="w-5/12 mx-auto text-center inline-block time-input "
                label=""
                inputCss="text-center"
                name="regular_hours"
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.regular_time,
                    "regular_time"
                  )
                }
                value={formData.regular_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto   inline-block time-input "
                label=""
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.regular_time,
                    "regular_time"
                  )
                }
                inputCss="text-center"
                name="regular_min"
                value={formData.regular_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Overtime
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input "
                label=""
                inputCss="text-center"
                name="over_hours"
                onChange={(e) =>
                  handleInputTimeChange(e, formData.over_time, "over_time")
                }
                value={formData.over_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                inputCss="text-center"
                name="over_min"
                onChange={(e) =>
                  handleInputTimeChange(e, formData.over_time, "over_time")
                }
                value={formData.over_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Almuerzo
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input"
                label=""
                inputCss="text-center"
                name="meal_hours"
                onChange={(e) =>
                  handleInputTimeChange(e, formData.meal_time, "meal_time")
                }
                value={formData.meal_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={(e) =>
                  handleInputTimeChange(e, formData.meal_time, "meal_time")
                }
                inputCss="text-center"
                name="meal_min"
                value={formData.meal_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Vacaciones
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input"
                label=""
                inputCss="text-center"
                name="vacations_hours"
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.vacation_time,
                    "vacation_time"
                  )
                }
                value={formData.vacation_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.vacation_time,
                    "vacation_time"
                  )
                }
                inputCss="text-center"
                name="vacations_min"
                value={formData.vacation_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Enfermedad
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center   inline-block time-input"
                label=""
                name="sick_hours"
                inputCss="text-center"
                onChange={(e) =>
                  handleInputTimeChange(e, formData.sick_time, "sick_time")
                }
                value={formData.sick_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={(e) =>
                  handleInputTimeChange(e, formData.sick_time, "sick_time")
                }
                inputCss="text-center"
                name="sick_min"
                value={formData.sick_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Feriados
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center   inline-block time-input"
                label=""
                name="holiday_hours"
                inputCss="text-center"
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.holiday_time,
                    "holiday_time"
                  )
                }
                value={formData.holiday_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.holiday_time,
                    "holiday_time"
                  )
                }
                inputCss="text-center"
                name="holiday_min"
                value={formData.holiday_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>

            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto pe-1  inline-block "
                label="Propinas"
                inputCss="text-center"
                name="tips"
                value={formData.tips}
                onChange={handleInputChange}
                type="number"
              />
              <div className="w-1/6 inline-block text-center time-separator"></div>
              <CustomInputs
                class="time-input mx-auto ps-1   inline-block "
                label="Comisiones"
                name="commissions"
                inputCss="text-center"
                value={formData.commissions}
                onChange={handleInputChange}
                type="number"
              />
            </div>

            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto   inline-block "
                label="Concesiones"
                name="concessions"
                inputCss="text-center"
                value={formData.concessions}
                onChange={handleInputChange}
                type="number"
              />
              <div className="w-1/6 inline-block text-center time-separator"></div>
              <CustomInputs
                class="time-input mx-auto ps-1   inline-block "
                label="Salario"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                inputCss="text-center"
                type="number"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto   inline-block "
                label="Bono"
                name="bonus"
                value={formData.bonus}
                inputCss="text-center"
                onChange={handleInputChange}
                type="number"
              />
              <div className="w-1/6 inline-block text-center time-separator"></div>
              <CustomInputs
                class="time-input mx-auto ps-1  inline-block "
                label="Others"
                onChange={handleInputChange}
                value={formData.others}
                name="others"
                inputCss="text-center"
                type="number"
              />
            </div>
            <div className="w-full mx-auto ps-1 inline-block  ">
              <CustomInputs
                class=" w-full mx-auto   inline-block "
                label="Memo"
                name="memo"
                value={formData.memo}
                onChange={handleInputChange}
                type="textarea"
              />
            </div>
          </div>

          <div className="xl:w-1/3 w-full border rounded-lg border-gray-500 p-2 ">
            <h2 className="mt-2 text-center text-2xl">Montos</h2>
            <hr className="mt-2 mb-4" />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="REG. PAY"
              inputCss="text-center"
              disabled={true}
              name="regular_pay"
              value={getNumber(formData.regular_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="OVER TIME"
              disabled={true}
              inputCss="text-center"
              name="overtime_pay"
              value={getNumber(formData.overtime_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="MEAL TIME"
              disabled={true}
              inputCss="text-center"
              name="meal_time_pay"
              value={getNumber(formData.meal_time_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="VACATION"
              disabled={true}
              inputCss="text-center"
              name="vacation_pay"
              value={getNumber(formData.vacation_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="SICK PAY"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.sick_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="HOLYDAY PAY"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.holyday_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="Propinas"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.tips)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="Comisiones"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.commissions)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="Concesiones"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.concessions)}
              placeholder=""
              type="number"
            />
            <div className="xl:w-full w-full text-end ">
              <CustomInputs
                class="w-1/3 mx-auto pe-1  inline-block text-center "
                label="Total"
                disabled={true}
                inputCss="text-center border-0"
                value={getNumber(getPreTotal())}
                placeholder=""
                type="number"
              />
            </div>
          </div>

          <div className="xl:w-1/3 w-full border rounded-lg border-gray-500 p-2 ">
            <>
              <h2 className="mt-2 text-center text-2xl">Taxes</h2>
              <hr className="mt-2 mb-4" />
            </>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Incapacidad
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="inability"
                  value={getNumber(formData.inability)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  MEDICARE
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="medicare"
                  value={getNumber(formData.medicare)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Seguro Social
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="secure_social"
                  value={getNumber(formData.secure_social)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Seg Social Propinas
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="social_tips"
                  value={getNumber(formData.social_tips)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Tax Retenido PR
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="tax_pr"
                  value={getNumber(formData.tax_pr)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Choferil
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  type="number"
                  name="choferil"
                  value={getNumber(formData.choferil)}
                />
              </label>
            </div>

            {formData.id == 0 && (
              <>
                {taxesData.map((item, index: number) => (
                  <div
                    key={index}
                    className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
                  >
                    <label>
                      {item.required === 1 && (
                        <>
                          <input
                            type="checkbox"
                            checked={item.is_active}
                            onChange={(e) => handleCheck(e, item)}
                          />
                        </>
                      )}
                      <span>
                        {" "}
                        {item.name}{" "}
                        {item.type_taxe != 1 ? (
                          <span>( + )</span>
                        ) : (
                          <span>( - )</span>
                        )}
                      </span>

                      <input
                        className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                        tabIndex={0}
                        type="number"
                        onChange={(e) => handleitem(e, item)}
                        name={item.name}
                        value={getAmountTaxe2(item)}
                      />
                    </label>
                  </div>
                ))}
              </>
            )}
            {formData.id != 0 && (
              <>
                {formData.payment.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
                  >
                    <label>
                      {item.required === 1 && (
                        <>
                          <input
                            type="checkbox"
                            onChange={(e) => handleCheck(e, item)}
                            checked={item.is_active}
                          />
                        </>
                      )}
                      <span>
                        {" "}
                        {item.name}{" "}
                        {item.type_taxe != 1 ? (
                          <span>( + )</span>
                        ) : (
                          <span>( - )</span>
                        )}
                      </span>

                      <input
                        className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                        tabIndex={0}
                        type="number"
                        onChange={(e) => handleitem(e, item)}
                        name={item.name}
                        value={getAmountTaxe(item)}
                      />
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="xl:w-full w-full text-end mt-4 ">
          <CustomInputs
            class="w-1/2 xl:w-1/6 mx-auto pe-1  inline-block text-center "
            label="Total"
            inputCss="text-center border-0"
            disabled={true}
            value={getNumber(getTotal())}
            placeholder=""
            type="number"
          />
        </div>
        <div className="w-full text-end">
          {formData.id != 0 && (
            <button
              onClick={handleModal2}
              className="w-auto mt-4  me-4 mx-auto bg-[#333160] py-4 text-black bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
            >
              Eliminar
            </button>
          )}
          {formData.id != 0 && (
            <button
              onClick={recalculate}
              className="w-auto mt-4  mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
            >
              Recalcular
            </button>
          )}

          {formData.id != 0 && (
            <button
              type="button"
              onClick={generateFile}
              className="w-auto mt-4 mx-auto ml-4 bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
            >
              Descargando Talonario
            </button>
          )}
          <button
            onClick={handleModal}
            className="w-auto mt-4 ms-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Cargar tiempo de empleado
          </button>
        </div>
      </div>
      <ModalAlert
        isOpen={isOpen2}
        action={handleDelete}
        show={loanding}
        setIsOpen={handleModal2}
        title={`Eliminar`}
        description={`¿Esta seguro que desea ELIMINAR
         el periodo seleccionado?`}
      />
      <ModalAlert
        isOpen={isOpen}
        show={loanding}
        action={handleCreate}
        setIsOpen={handleModal}
        title={`Cargar Hora`}
        description={`¿Esta seguro que desea cargar esta data por un monto de ${getTotal().toFixed(
          2
        )}?`}
      />
    </>
  );
};

export default Cargar;
