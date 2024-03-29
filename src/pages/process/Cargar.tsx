import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import { getCompanyWithEmployer, setTime } from "../../utils/requestOptions";
import { useParams } from "react-router-dom";
import { COMPANY_DATA } from "../../models/company";
import { EMPLOYER_DATA } from "../../models/employeer";
import { TIME_DATA } from "../../models/time";
import { filterById, showError, showSuccess } from "../../utils/functions";
import { TAXES, TAXES_DATA } from "../../models/taxes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Talonario from "../../components/files/Talonario";

const Cargar = () => {
  const params = useParams();
  const [employerData, setEmployerData] = useState(EMPLOYER_DATA);
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [timesData, setTimesData] = useState([TIME_DATA]);
  const [formData, setFormData] = useState(TIME_DATA);
  const [taxesData, setTaxesData] = useState([TAXES_DATA]);
  const [period, setPeriod] = useState(0);

  useEffect(() => {
    const regular_pay =
      employerData.regular_time * formData.vacations_hours +
      employerData.regular_time * formData.sick_hours +
      employerData.regular_time * formData.regular_time +
      employerData.overtime * formData.overtime +
      employerData.mealtime * formData.meal_time;
    let aux = [TAXES_DATA];
    taxesData.map((item) => {
      item.value = setAmountTaxe(item, regular_pay);

      aux.push(item);
    });

    setFormData({
      ...formData,

      ["vacation_pay"]: Number(
        employerData.regular_time * formData.vacations_hours
      ),
      ["sick_pay"]: Number(employerData.regular_time * formData.sick_hours),
      ["overtime_pay"]: Number(employerData.overtime * formData.overtime),
      ["meal_time_pay"]: Number(employerData.mealtime * formData.meal_time),
      ["regular_pay"]: Number(
        employerData.regular_time * formData.regular_time
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
      employerData.regular_time * formData.vacations_hours +
      employerData.regular_time * formData.sick_hours +
      employerData.regular_time * formData.regular_time +
      employerData.overtime * formData.overtime +
      employerData.mealtime * formData.meal_time;
    total = regular_pay;
    taxesData.map((item) => {
      if (item.is_active || item.requiered == 2) {
        item.value = setAmountTaxe(item, regular_pay);

        total = total + item.value;
      }
    });
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

  const handleitem = (e: React.FormEvent<HTMLInputElement>, item: TAXES) => {
    // Crea un nuevo objeto con el cambio

    item.value = parseInt(e.currentTarget.value);

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
      taxe.value = regular_pay * (taxe.amount / 100);
    } else {
      if (!taxe.value) taxe.value = taxe.amount;
    }
    if (taxe.type_taxe == 1 && taxe.type_amount == 1) {
      taxe.value = taxe.value * -1;
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

            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Horas regulares"
              disabled={formData.period < 0}
              onChange={handleInputChange}
              name="regular_time"
              value={formData.regular_time}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1 ps-1  inline-block "
              label="Horas de sobre tiempo (overtime)"
              placeholder=""
              disabled={formData.period < 0}
              name="overtime"
              onChange={handleInputChange}
              value={formData.overtime}
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label="Horas de almuerzo (meal time)"
              placeholder=""
              onChange={handleInputChange}
              name="meal_time"
              disabled={formData.period < 0}
              value={formData.meal_time}
              type="number"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Horas de enfermedad"
              name="sick_hours"
              onChange={handleInputChange}
              disabled={formData.period < 0}
              value={formData.sick_hours}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/2 mx-auto ps-1  inline-block "
              label="Horas de vacaciones"
              disabled={formData.period < 0}
              name="vacations_hours"
              onChange={handleInputChange}
              value={formData.vacations_hours}
              placeholder=""
              type="number"
            />
          </div>

          <div className="xl:w-full w-full ">
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="REG. PAY"
              disabled={true}
              name="regular_pay"
              value={formData.regular_pay}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="OVER TIME PAY"
              disabled={true}
              name="overtime_pay"
              value={formData.overtime_pay}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="MEAL TIME PAY"
              disabled={true}
              name="meal_time_pay"
              value={formData.meal_time_pay}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="VACATION PAY"
              disabled={true}
              name="vacation_pay"
              value={formData.vacation_pay}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="SICK PAY"
              disabled={true}
              value={formData.sick_pay}
              placeholder=""
              type="number"
            />
            {taxesData.map((item) => (
              <>
                <label
                  className={` block mb-2  font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
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
                  <span> {item.name}</span>

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
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Total"
              disabled={true}
              value={getTotal()}
              placeholder=""
              type="number"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleCreate}
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
    </>
  );
};

export default Cargar;
