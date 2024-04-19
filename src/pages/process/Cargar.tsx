import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import { getCompanyWithEmployer, setTime } from "../../utils/requestOptions";
import { useParams } from "react-router-dom";
import { COMPANY_DATA } from "../../models/company";
import { EMPLOYER_DATA } from "../../models/employeer";
import { TIME_DATA } from "../../models/time";
import {
  convertTimeToHoursWithDecimals,
  filterById,
  showError,
  showSuccess,
} from "../../utils/functions";
import { TAXES, TAXES_DATA } from "../../models/taxes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Talonario from "../../components/files/Talonario";
import TimeInput from "../../components/input/FormTIme";
import ModalAlert from "../../components/dashboard/ModalAlert";

const Cargar = () => {
  const params = useParams();
  const [employerData, setEmployerData] = useState(EMPLOYER_DATA);
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [timesData, setTimesData] = useState([TIME_DATA]);
  const [formData, setFormData] = useState(TIME_DATA);
  const [taxesData, setTaxesData] = useState([TAXES_DATA]);
  const [period, setPeriod] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const regular_pay =
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.vacations_hours) +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.sick_hours) +
      formData.tips +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.regular_time) +
      employerData.overtime *
        convertTimeToHoursWithDecimals(formData.overtime) +
      employerData.mealtime *
        convertTimeToHoursWithDecimals(formData.meal_time);
    let aux = [TAXES_DATA];
    taxesData.map((item) => {
      item.value = setAmountTaxe(item, regular_pay);

      aux.push(item);
    });
    console.log(
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.regular_time)
    );
    setFormData({
      ...formData,

      ["vacation_pay"]: Number(
        employerData.regular_time *
          convertTimeToHoursWithDecimals(formData.vacations_hours)
      ),
      ["sick_pay"]: Number(
        employerData.regular_time *
          convertTimeToHoursWithDecimals(formData.sick_hours)
      ),
      ["overtime_pay"]: Number(
        employerData.overtime *
          convertTimeToHoursWithDecimals(formData.overtime)
      ),
      ["meal_time_pay"]: Number(
        employerData.mealtime *
          convertTimeToHoursWithDecimals(formData.meal_time)
      ),
      ["regular_pay"]: Number(
        employerData.regular_time *
          convertTimeToHoursWithDecimals(formData.regular_time)
      ),
    });
  }, [
    formData.regular_time,
    formData.overtime,
    formData.meal_time,
    formData.vacations_hours,
    formData.sick_hours,
  ]);

  const getTotal = () => {
    var total = 0;
    const regular_pay =
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.vacations_hours) +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.sick_hours) +
      formData.tips +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.regular_time) +
      employerData.overtime *
        convertTimeToHoursWithDecimals(formData.overtime) +
      employerData.mealtime *
        convertTimeToHoursWithDecimals(formData.meal_time);
    total = regular_pay;
    taxesData.map((item) => {
      if (item.is_active || item.requiered == 2) {
        item.value = setAmountTaxe(item, regular_pay);

        total = total + item.value;
      }
    });
    return total;
  };

  const getPreTotal = () => {
    var total = 0;
    const regular_pay =
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.vacations_hours) +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.sick_hours) +
      formData.tips +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(formData.regular_time) +
      employerData.overtime *
        convertTimeToHoursWithDecimals(formData.overtime) +
      employerData.mealtime *
        convertTimeToHoursWithDecimals(formData.meal_time);
    total = regular_pay;

    return total;
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseInt(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
  const handleInputTimeChange = (
    e: React.FormEvent<HTMLInputElement>,
    time: string
  ) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: time,
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
      ["payments"]: taxesData,
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
      ["payments"]: taxesData,
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

    if (timesData.length > 0 && value >= 0)
      setFormData(filterById(timesData, value));
  };

  const handleCreate = () => {
    setTime(formData, Number(params.id_employer))
      .then(() => {
        // Data retrieval and processing
        setFormData(TIME_DATA);
        getData();

        showSuccess("Creado exitosamente.");
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };
  const getData = () => {
    getCompanyWithEmployer(
      Number(params.id_company),
      Number(params.id_employer)
    )
      .then((response) => {
        // Data retrieval and processing
        setEmployerData(response.data.result.employer);
        setCompanyData(response.data.result.company);
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
    getData();
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
        <div className="flex xl:flex-col flex-col gap-4">
          <div className="xl:w-full w-full ">
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label=""
              disabled={true}
              value={companyData.name}
              placeholder=""
              type="text"
            />

            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label=""
              value={employerData.first_name + " " + employerData.last_name}
              disabled={true}
              placeholder=""
              type="text"
            />
            <div className="w-1/6 mx-auto  inline-block  ">
              <TimeInput
                class="time-input mx-auto   inline-block "
                label=" Horas Regulares"
                name="regular_time"
                onBlur={handleInputTimeChange}
                onChange={handleInputChange}
                value={formData.regular_time}
                type="number"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <TimeInput
                class="time-input mx-auto   inline-block "
                label="Horas de Overtime"
                name="overtime"
                onBlur={handleInputTimeChange}
                onChange={handleInputChange}
                value={formData.overtime}
                type="number"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <TimeInput
                class="time-input mx-auto   inline-block "
                label="Horas de Almuerzo"
                name="meal_time"
                onBlur={handleInputTimeChange}
                onChange={handleInputChange}
                value={formData.meal_time}
                type="number"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <TimeInput
                class="time-input mx-auto   inline-block "
                label="Horas de Vacaciones"
                name="vacations_hours"
                onBlur={handleInputTimeChange}
                onChange={handleInputChange}
                value={formData.vacations_hours}
                type="number"
              />
            </div>
            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <TimeInput
                class="time-input mx-auto   inline-block "
                label="Horas de enfermedad"
                name="sick_hours"
                onBlur={handleInputTimeChange}
                onChange={handleInputChange}
                value={formData.sick_hours}
                type="number"
              />
            </div>

            <div className="w-1/6 mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto   inline-block "
                label="Propinas"
                name="tips"
                value={formData.tips}
                onChange={handleInputChange}
                type="number"
              />
            </div>
          </div>

          <div className="xl:w-full w-full ">
            <h2 className=" text-center text-2xl">Montos</h2>
            <hr className="mt-2 mb-6" />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="REG. PAY"
              disabled={true}
              name="regular_pay"
              value={formData.regular_pay.toFixed(2)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="OVER TIME PAY"
              disabled={true}
              name="overtime_pay"
              value={formData.overtime_pay.toFixed(2)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="MEAL TIME PAY"
              disabled={true}
              name="meal_time_pay"
              value={formData.meal_time_pay.toFixed(2)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="VACATION PAY"
              disabled={true}
              name="vacation_pay"
              value={formData.vacation_pay.toFixed(2)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="SICK PAY"
              disabled={true}
              value={formData.sick_pay.toFixed(2)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Total"
              name="sick_hours"
              disabled={true}
              value={getPreTotal().toFixed(2)}
              placeholder=""
              type="number"
            />
            <h2 className="mt-2 text-center text-2xl">Taxes</h2>
            <hr className="mt-2 mb-6" />

            {taxesData.map((item) => (
              <>
                <label
                  className={` block mb-2   font-medium text-gray-700 w-1/3 mx-auto pe-1  inline-block `}
                >
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
                    className={` bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                    tabIndex={0}
                    type="number"
                    onChange={(e) => handleitem(e, item)}
                    name={item.name}
                    value={item.value}
                  />
                </label>
              </>
            ))}
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Total"
              disabled={true}
              value={getTotal().toFixed(2)}
              placeholder=""
              type="number"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleModal}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Cargar tiempo de empleado
          </button>
          {formData.id != 0 && (
            <PDFDownloadLink
              document={
                <Talonario
                  id_employer={Number(params.id_employer)}
                  id_company={Number(params.id_company)}
                  id_period={period}
                />
              }
              fileName={employerData.first_name + " " + employerData.last_name}
            >
              {({ loading }) =>
                loading ? (
                  <button className="w-auto mt-4 mx-auto mr-4 bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center ">
                    Descargando Talonario
                  </button>
                ) : (
                  <button className="w-auto mt-4 mx-auto ms-4 bg-[#EED102] py-4 text-[#333160] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center ">
                    Descargar Talonario
                  </button>
                )
              }
            </PDFDownloadLink>
          )}
        </div>
      </div>
      <ModalAlert
        isOpen={isOpen}
        action={handleCreate}
        setIsOpen={handleModal}
        title={`Editar Usuario`}
        description={`¿Esta seguro que desea cargar esta data por un monto de ${getTotal().toFixed(
          2
        )}?`}
      />
    </>
  );
};

export default Cargar;
