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

  const [employerData, setEmployerData] = useState(EMPLOYER_DATA);
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [timesData, setTimesData] = useState([TIME_DATA]);
  const [formData, setFormData] = useState(TIME_DATA);
  const [taxesData, setTaxesData] = useState([TAXES_DATA]);
  const [period, setPeriod] = useState(0);
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
    const regular_pay =
      employerData.regular_time *
        convertTimeToHoursWithDecimals(
          formData.vacations_hours + ":" + formData.vacations_min
        ) +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(
          formData.sick_hours + ":" + formData.sick_min
        ) +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(
          formData.holiday_hours + ":" + formData.holiday_min
        ) +
      getNumber(formData.tips) +
      getNumber(formData.commissions) +
      getNumber(formData.concessions) +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(
          formData.regular_hours + ":" + formData.regular_min
        ) +
      employerData.overtime *
        convertTimeToHoursWithDecimals(
          formData.over_hours + ":" + formData.over_min
        ) +
      employerData.mealtime *
        convertTimeToHoursWithDecimals(
          formData.meal_hours + ":" + formData.meal_min
        );
    let aux: any = [];

    let inability = regular_pay * (0.3 / 100);
    let medicare = regular_pay * (1.45 / 100);
    let secure_social = (regular_pay - formData.tips) * (6.2 / 100);
    let tax_pr = regular_pay * (10 / 100);
    let social_tips = formData.tips * (6.2 / 100);

    taxesData.map((item) => {
      item.value = setAmountTaxe(item, regular_pay);

      aux.push(item);
    });

    setFormData({
      ...formData,
      ["payment"]: aux,
      ["inability"]: inability,
      ["medicare"]: medicare,
      ["secure_social"]: secure_social,
      ["tax_pr"]: tax_pr,
      ["social_tips"]: social_tips,
      ["holyday_pay"]: Number(
        employerData.regular_time *
          convertTimeToHoursWithDecimals(
            formData.holiday_hours + ":" + formData.holiday_min
          )
      ),
      ["vacation_pay"]: Number(
        employerData.regular_time *
          convertTimeToHoursWithDecimals(
            formData.vacations_hours + ":" + formData.vacations_min
          )
      ),
      ["sick_pay"]: Number(
        employerData.regular_time *
          convertTimeToHoursWithDecimals(
            formData.sick_hours + ":" + formData.sick_min
          )
      ),
      ["overtime_pay"]: Number(
        employerData.overtime *
          convertTimeToHoursWithDecimals(
            formData.over_hours + ":" + formData.over_min
          )
      ),
      ["meal_time_pay"]: Number(
        employerData.mealtime *
          convertTimeToHoursWithDecimals(
            formData.meal_hours + ":" + formData.meal_min
          )
      ),
      ["regular_pay"]: Number(
        employerData.regular_time *
          convertTimeToHoursWithDecimals(
            formData.regular_hours + ":" + formData.regular_min
          )
      ),
    });
  };

  useEffect(() => {
    if (formData.id == 0) {
      recalculate();
    }
  }, [
    formData.vacations_min,
    formData.over_min,
    formData.meal_min,
    period,
    formData.sick_min,
    formData.tips,
    formData.commissions,
    formData.concessions,
    formData.holiday_hours,
    formData.holiday_min,
    formData.regular_min,
    formData.regular_hours,
    formData.over_hours,
    formData.meal_hours,
    formData.vacations_hours,
    formData.sick_hours,
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

    let inability = regular_pay * (0.3 / 100);
    let medicare = regular_pay * (1.45 / 100);
    let secure_social = regular_pay * (6.2 / 100);
    let tax_pr = regular_pay * (10 / 100);
    let social_tips = formData.tips * (6.2 / 100);

    total = regular_pay;
    total = total - inability - medicare - secure_social - tax_pr - social_tips;
    if (formData.id == 0) {
      taxesData.map((item) => {
        if (item.is_active || item.requiered == 2) {
          item.value = setAmountTaxe(item, regular_pay);

          total = total + item.value;
        }
      });
    } else {
      formData.payment.map((item) => {
        console.log(item);
        if (item.is_active || item.requiered == 2) {
          total = total + item.value;
        }
      });
    }

    return total;
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
  const handleInputTimeChange = (e: React.FormEvent<HTMLInputElement>) => {
    let value = 0;
    value = parseInt(e.currentTarget.value);
    if (parseInt(e.currentTarget.value) >= 60) value = 59;
    setFormData({
      ...formData,
      [e.currentTarget.name]: value + "",
    });
  };

  const handleitem = (e: React.FormEvent<HTMLInputElement>, item: TAXES) => {
    // Crea un nuevo objeto con el cambio

    item.value = parseInt(e.currentTarget.value);
    item.edited = true;
    item.amount = parseInt(e.currentTarget.value);

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

    if (timesData.length > 0 && value >= 0) {
      setFormData(filterById(timesData, value));
      console.log(formData);
    }
  };

  const handleChangeEmployer = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;
    setIdEmployer(Number(value));
    getData(Number(value));
  };

  const handleCreate = () => {
    setLoanding(true);
    if (formData.id == 0) {
      setTime(formData, Number(params.id_employer))
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);
          setFormData(TIME_DATA);
          getData(idEmployer);
          handleModal();
          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    } else {
      editTime(formData, Number(formData.id))
        .then(() => {
          // Data retrieval and processing
          setFormData(TIME_DATA);
          setLoanding(false);
          getData(idEmployer);
          handleModal();
          showSuccess("Editado exitosamente.");
        })
        .catch((error) => {
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
  };

  const handleDelete = () => {
    setLoanding(true);
    deleteTime(formData.id)
      .then(() => {
        // Data retrieval and processing
        setLoanding(false);
        setFormData(TIME_DATA);
        getData(idEmployer);
        handleModal();
        showSuccess("Creado exitosamente.");
      })
      .catch((error) => {
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
        setEmployerData(response.data.result.employer);
        setCompanyData(response.data.result.company);
        setEmployers(response.data.result.employers);
        setTimesData([]);
        setTaxesData(response.data.result.taxes);
        if (response.data.result.time.length == 0) setTimesData([TIME_DATA]);
        else {
          setTimesData([...response.data.result.time, TIME_DATA]);
        }
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  useEffect(() => {
    setIdEmployer(Number(params.id_employer));
    getData(Number(params.id_employer));
  }, []);

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
            value={formData.period}
            className={` bg-gray-50 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-3`}
          >
            <option value={-1}>Seleccione una opción</option>
            {timesData.map((item: any, i: number) => (
              <option key={i} value={item.id}>
                Periodo {i + 1}
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
            className={`w-1/2 bg-gray-50 border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-3`}
          >
            <option value={-1}>Seleccione una opción</option>
            {employers.map((item: any, i: number) => (
              <option key={i} value={item.id}>
                {item.first_name + " " + item.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <div className="xl:w-full w-full ">
            <h2 className="mt-2 text-center text-2xl">Horas</h2>
            <hr className="mt-2 mb-6" />
            <div className="w-1/6 mx-auto  inline-block  ">
              <label className="block" htmlFor="">
                Horas Regulares
              </label>
              <CustomInputs
                class="w-5/12 mx-auto text-center inline-block time-input "
                label=""
                inputCss="text-center"
                name="regular_hours"
                onChange={handleInputChange}
                value={formData.regular_hours}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto   inline-block time-input "
                label=""
                onChange={handleInputTimeChange}
                inputCss="text-center"
                name="regular_min"
                value={formData.regular_min}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Overtime
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input "
                label=""
                inputCss="text-center"
                name="over_hours"
                onChange={handleInputChange}
                value={formData.over_hours}
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
                onChange={handleInputTimeChange}
                value={formData.over_min}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Almuerzo
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input"
                label=""
                inputCss="text-center"
                name="meal_hours"
                onChange={handleInputChange}
                value={formData.meal_hours}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={handleInputTimeChange}
                inputCss="text-center"
                name="meal_min"
                value={formData.meal_min}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Vacaciones
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input"
                label=""
                inputCss="text-center"
                name="vacations_hours"
                onChange={handleInputChange}
                value={formData.vacations_hours}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={handleInputTimeChange}
                inputCss="text-center"
                name="vacations_min"
                value={formData.vacations_min}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Enfermedad
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center   inline-block time-input"
                label=""
                name="sick_hours"
                inputCss="text-center"
                onChange={handleInputChange}
                value={formData.sick_hours}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={handleInputTimeChange}
                inputCss="text-center"
                name="sick_min"
                value={formData.sick_min}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Feriados
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center   inline-block time-input"
                label=""
                name="holiday_hours"
                inputCss="text-center"
                onChange={handleInputChange}
                value={formData.holiday_hours}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={handleInputTimeChange}
                inputCss="text-center"
                name="holiday_min"
                value={formData.holiday_min}
                placeholder=""
                type="text"
              />
            </div>

            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto pe-1  inline-block "
                label="Propinas"
                inputCss="text-center"
                name="tips"
                value={formData.tips}
                onChange={handleInputChange}
                type="number"
              />
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

            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto   inline-block "
                label="Concesiones"
                name="concessions"
                inputCss="text-center"
                value={formData.concessions}
                onChange={handleInputChange}
                type="number"
              />
            </div>
          </div>

          <div className="xl:w-full      w-full ">
            <h2 className="mt-2 text-center text-2xl">Montos</h2>
            <hr className="mt-2 mb-6" />
            <CustomInputs
              class="w-1/6 mx-auto pe-1  inline-block "
              label="REG. PAY"
              inputCss="text-center"
              disabled={true}
              name="regular_pay"
              value={getNumber(formData.regular_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/6 mx-auto pe-1  inline-block "
              label="OVER TIME PAY"
              disabled={true}
              inputCss="text-center"
              name="overtime_pay"
              value={getNumber(formData.overtime_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/6 mx-auto pe-1  inline-block "
              label="MEAL TIME PAY"
              disabled={true}
              inputCss="text-center"
              name="meal_time_pay"
              value={getNumber(formData.meal_time_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/6 mx-auto pe-1  inline-block "
              label="VACATION PAY"
              disabled={true}
              inputCss="text-center"
              name="vacation_pay"
              value={getNumber(formData.vacation_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/6 mx-auto mb-4 pe-1  inline-block "
              label="SICK PAY"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.sick_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/6 mx-auto mb-4 pe-1  inline-block "
              label="HOLYDAY PAY"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.holyday_pay)}
              placeholder=""
              type="number"
            />
          </div>
          <div className="xl:w-full w-full text-end ">
            <CustomInputs
              class="w-1/6 mx-auto pe-1  inline-block text-center "
              label="Total"
              name="sick_hours"
              disabled={true}
              inputCss="text-center border-0"
              value={getNumber(getPreTotal())}
              placeholder=""
              type="number"
            />
          </div>

          <div className="xl:w-full w-full ">
            <>
              <h2 className="mt-2 text-center text-2xl">Taxes</h2>
              <hr className="mt-2 mb-6" />
            </>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/6 mx-auto pe-1  inline-block `}
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
              className={` block mb-2   font-medium text-gray-700 w-1/6 mx-auto pe-1  inline-block `}
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
              className={` block mb-2   font-medium text-gray-700 w-1/6 mx-auto pe-1  inline-block `}
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
              className={` block mb-2   font-medium text-gray-700 w-1/6 mx-auto pe-1  inline-block `}
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
              className={` block mb-2   font-medium text-gray-700 w-1/6 mx-auto pe-1  inline-block `}
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

            {formData.id == 0 && (
              <>
                {taxesData.map((item) => (
                  <div
                    key={item.id}
                    className={` block mb-2   font-medium text-gray-700 w-1/6 mx-auto pe-1  inline-block `}
                  >
                    <label>
                      {item.requiered === 1 && (
                        <>
                          <input
                            key={item.id}
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
                        value={getNumber(item.value)}
                      />
                    </label>
                  </div>
                ))}
              </>
            )}
            {formData.id != 0 && (
              <>
                {formData.payment.map((item: any) => (
                  <div
                    key={item.id}
                    className={` block mb-2   font-medium text-gray-700 w-1/6 mx-auto pe-1  inline-block `}
                  >
                    <label>
                      {item.requiered === 1 && (
                        <>
                          <input
                            key={item.id}
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
                        name={item.name}
                        value={getNumber(item.value)}
                      />
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="xl:w-full w-full text-end ">
          <CustomInputs
            class="w-1/6 mx-auto pe-1  inline-block text-center "
            label="Total"
            inputCss="text-center border-0"
            disabled={true}
            value={getNumber(getTotal())}
            placeholder=""
            type="number"
          />
        </div>
        <div className="w-full text-end">
          {formData.id != 0 && period == timesData[timesData.length - 2].id && (
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
         el periodo: ${period}?`}
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
