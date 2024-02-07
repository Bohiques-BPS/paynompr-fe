import { Dispatch, SetStateAction } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { EMPLOYEER } from "../../models/employeer";
import {
  COUNTRY,
  GENDER,
  JURISDICTION,
  NO_OPTION,
  PAYER,
  STATUS_CIVIL,
} from "../../utils/consts";
import { PatternFormat } from "react-number-format";

type Props = {
  formData: EMPLOYEER;
  setFormData: Dispatch<SetStateAction<EMPLOYEER>>;
  onChange: (e: React.ChangeEvent<any>) => void;
};

const EmployeerForm = (props: Props) => {
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
          name="name"
          onChange={props.onChange}
          value={props.formData.name}
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
          options={NO_OPTION}
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
          options={NO_OPTION}
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
          onChange={props.onChange}
          value={props.formData.regular_time}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="xl:w-1/5 w-1/3 mx-auto pe-1  inline-block "
          label="Sobretiempo"
          name="about_time"
          onChange={props.onChange}
          value={props.formData.about_time}
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
        <CustomInputs
          class="xl:w-1/5 w-1/2 mx-auto pe-1  inline-block "
          label="% de pago"
          name="payment_percentage"
          onChange={props.onChange}
          value={props.formData.payment_percentage}
          placeholder=""
          type="text"
        />
        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3  "
          class="xl:w-2/5 w-1/2 mx-auto pe-1  inline-block xl:inline-flex justify-between items-center  "
          label="El empleado tiene"
          name="vacation_hours"
          onChange={props.onChange}
          value={props.formData.vacation_hours}
          placeholder=""
          type="number"
        />
        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3 mt-0"
          class="xl:w-3/5 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center "
          label="Horas vacaciones acumuladas"
          name="vacation_date"
          onChange={props.onChange}
          value={props.formData.vacation_date}
          placeholder=""
          type="date"
        />

        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3  mt-0"
          class="xl:w-2/5 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center "
          label="El empleado tiene"
          placeholder=""
          type="number"
        />
        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3 mt-0"
          class="xl:w-3/5 w-1/2 mx-auto   ps-2 inline-block xl:inline-flex  justify-between items-center "
          label="Horas vacaciones acumuladas"
          placeholder=""
          type="date"
        />

        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3  mt-0"
          class="xl:w-1/2 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center "
          label="Numero de dependientes"
          placeholder=""
          name="number_dependents"
          onChange={props.onChange}
          value={props.formData.number_dependents}
          type="number"
        />
        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3 mt-0"
          class="xl:w-1/2 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center"
          label="Custodia compartida"
          name="shared_custody"
          onChange={props.onChange}
          value={props.formData.shared_custody}
          placeholder=""
          type="number"
        />

        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3  mt-0"
          class="xl:w-1/2 w-1/2 mx-auto   inline-block xl:inline-flex   justify-between items-center "
          label="Numero de Concesiones"
          name="number_concessions"
          onChange={props.onChange}
          value={props.formData.number_concessions}
          placeholder=""
          type="number"
        />
        <CustomInputs
          inputCss="xl:inline-block xl:w-1/3 mt-0"
          class="xl:w-1/2 w-1/2 mx-auto  ps-2 inline-block xl:inline-flex  justify-between items-center"
          label="Veterano"
          name="veteran"
          onChange={props.onChange}
          value={props.formData.veteran}
          placeholder=""
          type="number"
        />

        <CustomSelect
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Tipo de nómina"
          name="type_payroll"
          options={NO_OPTION}
          onChange={props.onChange}
          value={props.formData.type_payroll}
          placeholder=""
          type="text"
        />
        <CustomSelect
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Tipo de horario"
          name="schedule_type"
          options={NO_OPTION}
          onChange={props.onChange}
          value={props.formData.schedule_type}
          placeholder="San Juan"
          type="text"
        />
      </div>
    </>
  );
};

export default EmployeerForm;
