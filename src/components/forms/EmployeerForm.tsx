import { Dispatch, SetStateAction } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { EMPLOYEER } from "../../models/employeer";
import {
  COUNTRY,
  GENDER,
  STATUS_CIVIL,
  EXENCIÓN_PERSONAL,
  PERIOD_PAYROLL,
} from "../../utils/consts";
import { PatternFormat } from "react-number-format";
import CustomCheckBox from "./CustomCheckBox";

type Props = {
  formData: EMPLOYEER;
  setFormData: Dispatch<SetStateAction<EMPLOYEER>>;
  onChange: (e: React.ChangeEvent<any>) => void;
};

const EmployeerForm = (props: Props) => {
  const handleRegularTime = (e: React.ChangeEvent<any>) => {
    const overtime = e.currentTarget.value * 1.5;
    const mealtime = e.currentTarget.value * 2;
    const value = e.currentTarget.value;

    props.setFormData({
      ...props.formData,
      [e.currentTarget.name]: value,
      ["mealtime"]: Number(mealtime.toFixed(2)),
      ["overtime"]: Number(overtime.toFixed(2)),
    });
  };
  return (
    <>
      <div className="xl:w-1/2 w-full ">
        <CustomInputs
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Apellido paterno"
          name="last_name"
          onChange={props.onChange}
          value={props.formData.last_name}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Apellido materno"
          name="mother_last_name"
          onChange={props.onChange}
          value={props.formData.mother_last_name}
          placeholder="San Juan"
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Nombre"
          name="first_name"
          onChange={props.onChange}
          value={props.formData.first_name}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Inicial de segundo nombre"
          name="middle_name"
          onChange={props.onChange}
          value={props.formData.middle_name}
          placeholder="San Juan"
          type="text"
        />
        <CustomInputs
          class="w-full mx-auto pe-1  inline-block "
          label="Dirección"
          name="address"
          onChange={props.onChange}
          value={props.formData.address}
          placeholder=""
          type="text"
        />
        <CustomSelect
          class="w-1/3 mx-auto pe-1  inline-block "
          label=""
          name="address_country"
          options={COUNTRY}
          onChange={props.onChange}
          value={props.formData.address_country}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label=""
          name="address_state"
          onChange={props.onChange}
          value={props.formData.address_state}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label=""
          name="address_number"
          onChange={props.onChange}
          value={props.formData.address_number}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Numero de teléfono fijo"
          name="phone_number"
          onChange={props.onChange}
          value={props.formData.phone_number}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Numero de teléfono celular"
          name="smartphone_number"
          onChange={props.onChange}
          value={props.formData.smartphone_number}
          placeholder="San Juan"
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Num. de Seguro social"
          name="social_security_number"
          onChange={props.onChange}
          value={props.formData.social_security_number}
          placeholder=""
          type="text"
        />
        <CustomSelect
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Estatus Civil"
          name="marital_status"
          options={STATUS_CIVIL}
          onChange={props.onChange}
          value={props.formData.marital_status}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto   inline-block "
          label="Tipo"
          name="type"
          onChange={props.onChange}
          value={props.formData.type}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Marbete"
          name="marbete"
          onChange={props.onChange}
          value={props.formData.marbete}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Fecha de pago MARB"
          name="date_marb"
          onChange={props.onChange}
          value={props.formData.date_marb}
          placeholder=""
          type="date"
        />
        <CustomInputs
          class="w-1/3 mx-auto   inline-block "
          label="Tablilla"
          name="clipboard"
          onChange={props.onChange}
          value={props.formData.clipboard}
          placeholder=""
          type="text"
        />
        <CustomSelect
          options={EXENCIÓN_PERSONAL}
          inputCss="xl:inline-block xl:w-1/2 mt-0"
          class="xl:w-1/2 w-1/2 mx-auto pe-1  inline-block xl:inline-flex  justify-between items-center"
          label="Exec. personal"
          name="exec_personal"
          onChange={props.onChange}
          value={props.formData.exec_personal}
          placeholder=""
          type="number"
        />
        <CustomSelect
          options={PERIOD_PAYROLL}
          inputCss="xl:inline-block xl:w-1/2 mt-0"
          class="xl:w-1/2 w-1/2 mx-auto ps-1  inline-block xl:inline-flex  justify-between items-center"
          label="Período de norma"
          name="period_norma"
          onChange={props.onChange}
          value={props.formData.period_norma}
          placeholder=""
          type="number"
        />
      </div>
      <div className="xl:w-1/2 w-full">
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Licencia"
          name="licence"
          onChange={props.onChange}
          value={props.formData.licence}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Categoría CFSE"
          name="category_cfse"
          onChange={props.onChange}
          value={props.formData.category_cfse}
          placeholder=""
          type="text"
        />
        <CustomSelect
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Género"
          name="gender"
          options={GENDER}
          onChange={props.onChange}
          value={props.formData.gender}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Fecha de nacimiento"
          name="birthday"
          onChange={props.onChange}
          value={props.formData.birthday}
          placeholder=""
          type="date"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Fecha de ingreso"
          name="date_admission"
          onChange={props.onChange}
          value={props.formData.date_admission}
          placeholder=""
          type="date"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Fecha de egreso"
          name="date_egress"
          onChange={props.onChange}
          value={props.formData.date_egress}
          placeholder=""
          type="date"
        />
        <CustomInputs
          class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
          label="Choferil"
          name="choferil"
          onChange={props.onChange}
          value={props.formData.choferil}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
          label="Hora regular"
          name="regular_time"
          onChange={handleRegularTime}
          value={props.formData.regular_time}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
          label="Sobretiempo"
          name="overtime"
          onChange={props.onChange}
          value={props.formData.overtime}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="xl:w-1/5 w-1/2  mx-auto pe-1  inline-block "
          label="Hora de comida"
          name="mealtime"
          onChange={props.onChange}
          value={props.formData.mealtime}
          placeholder=""
          type="text"
        />
        <label className=" mb-2  font-medium text-gray-700 w-1/2 xl:w-1/5 mx-auto ps-1  inline-block">
          <span>% de pago</span>
          <PatternFormat
            name="payment_percentage"
            onChange={props.onChange}
            value={props.formData.payment_percentage}
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            format="##%"
          />
        </label>

        <CustomInputs
          class="xl:w-1/4 w-1/2 mx-auto pe-1  inline-block   "
          label="El empleado tiene"
          name="vacation_hours"
          onChange={props.onChange}
          disabled={true}
          value={props.formData.vacation_hours}
          placeholder=""
          type="number"
        />
        <CustomInputs
          class="xl:w-9/12 w-1/2 mx-auto ps-2  inline-block  "
          label="Horas de vacaciones acumuladas"
          name="vacation_date"
          disabled={true}
          onChange={props.onChange}
          value={props.formData.vacation_date}
          placeholder=""
          type="date"
        />

        <CustomInputs
          class="xl:w-1/4 w-1/2 mx-auto   inline-block  "
          label="El empleado tiene"
          placeholder=""
          disabled={true}
          type="number"
        />
        <CustomInputs
          disabled={true}
          class="xl:w-9/12 w-1/2 mx-auto   ps-2 inline-block  "
          label="Horas de vacaciones acumuladas por Enfermedad"
          placeholder=""
          type="date"
        />

        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3  mt-0"
          class="xl:w-1/2 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center "
          label="Num de dependientes"
          placeholder=""
          name="number_dependents"
          onChange={props.onChange}
          value={props.formData.number_dependents}
          type="number"
        />
        <CustomCheckBox
          inputCss="xl:inline-block xl:w-1/3 mt-0"
          class="xl:w-1/2 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center"
          label="Custodia compartida"
          name="shared_custody"
          onChange={props.onChange}
          value={props.formData.shared_custody}
          placeholder=""
          type="checkbox"
        />

        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3  mt-0"
          class="xl:w-1/2 w-1/2 mx-auto   inline-block xl:inline-flex   justify-between items-center "
          label="Num de Concesiones"
          name="number_concessions"
          onChange={props.onChange}
          value={props.formData.number_concessions}
          placeholder=""
          type="number"
        />
        <CustomCheckBox
          inputCss="xl:inline-block xl:w-1/3 mt-0"
          class="xl:w-1/2 w-1/2 mx-auto  ps-2 inline-block xl:inline-flex  justify-between items-center"
          label="Veterano"
          name="veteran"
          onChange={props.onChange}
          value={props.formData.veteran}
          placeholder=""
          type="checkbox"
        />
      </div>
    </>
  );
};

export default EmployeerForm;
